-- Loop alleen nog voor ingelogde teamleden (zelfde accounts en teamlijst als Fill).
-- Pas uitvoeren nadat alle Loop-toestellen één keer zijn ingelogd met de
-- nieuwe versie; toestellen die nog niet ingelogd zijn zien anders een lege lijst
-- tot ze opnieuw opstarten en inloggen.
drop policy if exists "loop leest" on public.loop_docs;
drop policy if exists "loop schrijft" on public.loop_docs;
drop policy if exists "loop wijzigt" on public.loop_docs;
drop policy if exists "loop verwijdert" on public.loop_docs;
drop policy if exists "loop team leest" on public.loop_docs;
drop policy if exists "loop team schrijft" on public.loop_docs;
drop policy if exists "loop team wijzigt" on public.loop_docs;
drop policy if exists "loop team verwijdert" on public.loop_docs;
create policy "loop team leest" on public.loop_docs for select to authenticated using (public.is_team());
create policy "loop team schrijft" on public.loop_docs for insert to authenticated with check (public.is_team());
create policy "loop team wijzigt" on public.loop_docs for update to authenticated using (public.is_team()) with check (public.is_team());
create policy "loop team verwijdert" on public.loop_docs for delete to authenticated using (public.is_team());
revoke execute on function public.loop_patch(text, text, jsonb) from anon;
