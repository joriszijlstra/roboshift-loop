-- RoboShift Loop: opslag in Supabase.
-- Eén tabel die het Firestore-model van Loop 1-op-1 spiegelt:
-- (collectie, document-id) -> JSON-data. Zo blijft de app-logica gelijk en
-- is de migratie vanuit Firebase een simpele kopie zonder omzetten.
-- Alles heeft het voorvoegsel loop_ zodat het naast Fill/Pass in hetzelfde
-- project kan staan zonder iets van die producten te raken.

create table if not exists public.loop_docs (
  collection text not null,
  id         text not null,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (collection, id)
);

alter table public.loop_docs enable row level security;

-- Zelfde toegang als nu in Firebase (anonieme login): iedereen met de app mag
-- lezen/schrijven. Binnen de app regelen naam + toegangscode + toestel-
-- goedkeuring wie wat mag. Raakt alleen loop_docs, niet de Fill/Pass-tabellen.
drop policy if exists "loop leest" on public.loop_docs;
create policy "loop leest" on public.loop_docs for select to anon, authenticated using (true);
drop policy if exists "loop schrijft" on public.loop_docs;
create policy "loop schrijft" on public.loop_docs for insert to anon, authenticated with check (true);
drop policy if exists "loop wijzigt" on public.loop_docs;
create policy "loop wijzigt" on public.loop_docs for update to anon, authenticated using (true) with check (true);
drop policy if exists "loop verwijdert" on public.loop_docs;
create policy "loop verwijdert" on public.loop_docs for delete to anon, authenticated using (true);

create or replace function public.loop_touch() returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end $$;
drop trigger if exists loop_docs_touch on public.loop_docs;
create trigger loop_docs_touch before update on public.loop_docs
  for each row execute function public.loop_touch();

-- Zet een waarde op een genest pad en maakt tussenliggende objecten aan
-- (jsonb_set doet dat zelf alleen voor het laatste niveau).
create or replace function public.loop_jsonb_set_deep(target jsonb, path text[], val jsonb)
returns jsonb language plpgsql immutable as $$
declare
  head text;
  child jsonb;
begin
  if array_length(path, 1) is null then return val; end if;
  head := path[1];
  if target is null or jsonb_typeof(target) <> 'object' then target := '{}'::jsonb; end if;
  child := target -> head;
  return jsonb_set(target, array[head],
    public.loop_jsonb_set_deep(child, path[2:array_length(path,1)], val), true);
end $$;

-- Equivalent van Firestore updateDoc({"a.b.c": waarde, ...}): wijzigt alleen
-- de genoemde velden, atomair, zodat twee toestellen die tegelijk verschillende
-- items afvinken elkaar niet overschrijven. Geeft false als het document niet
-- bestaat (de app maakt het dan aan, net als bij Firestore).
create or replace function public.loop_patch(p_collection text, p_id text, p_set jsonb)
returns boolean language plpgsql security invoker as $$
declare
  cur jsonb;
  k text;
  v jsonb;
begin
  select data into cur from public.loop_docs
   where collection = p_collection and id = p_id for update;
  if not found then return false; end if;
  for k, v in select * from jsonb_each(p_set) loop
    cur := public.loop_jsonb_set_deep(cur, string_to_array(k, '.'), v);
  end loop;
  update public.loop_docs set data = cur where collection = p_collection and id = p_id;
  return true;
end $$;

grant execute on function public.loop_patch(text, text, jsonb) to anon, authenticated;

-- Live updates tussen toestellen (zoals Firestore onSnapshot).
do $$ begin
  if not exists (select 1 from pg_publication_tables
                 where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'loop_docs') then
    alter publication supabase_realtime add table public.loop_docs;
  end if;
end $$;
alter table public.loop_docs replica identity full;
