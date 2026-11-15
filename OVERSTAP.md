# Loop overzetten: Netlify + Firebase → GitHub Pages + Supabase

Netlify en Firebase blijven draaien tot de laatste stap. Tot dan kun je altijd terug.

## Vooraf (eenmalig)

1. **GitHub Pages aan**: repo → Settings → Pages → Source "Deploy from a branch", branch `main`, map `/ (root)` → Save.
2. **Eigen adres (aanbevolen)**: bij de domeinbeheerder van roboshift.nl een CNAME-record `loop` → `joriszijlstra.github.io` toevoegen. Daarna in Settings → Pages bij "Custom domain" `loop.roboshift.nl` invullen en "Enforce HTTPS" aanvinken (kan tot een uur duren voordat het certificaat er is).
3. **Supabase-tabel**: `supabase/001_loop_docs.sql` uitvoeren in de SQL-editor van het Supabase-project `bijvulscherm` (Claude kan dit via Chrome doen na akkoord). Voegt alleen tabel `loop_docs` en een paar `loop_`-functies toe; Fill en Pass merken er niets van. Al getest op `roboshift-staging` (15 nov: 215 documenten gekopieerd, alles gelijk, live-updates werken).

## Overstap (als de keuken dicht is)

4. Branch `supabase` mergen naar `main` (pull request). GitHub Pages zet de nieuwe versie binnen ~1 minuut live. Netlify draait nog gewoon op Firebase.
5. Open `https://loop.roboshift.nl/migreer.html` (of `https://joriszijlstra.github.io/roboshift-loop/migreer.html`):
   - klik **1. Tel** om te zien wat er in Firebase staat;
   - klik **2. Kopieer en controleer**. Alle regels moeten een groen ✓ krijgen.
6. Open Loop op het nieuwe adres. Rechtsboven moet **🟢 Live** staan, en de lijst van vandaag moet er hetzelfde uitzien als op Netlify.
7. Op elk keukentoestel: nieuw adres openen, opnieuw naam (en code) kiezen, toestel goedkeuren als daarom gevraagd wordt, en het oude Loop-icoon vervangen door het nieuwe ("Zet op beginscherm").

## Daarna

8. Een paar dagen naast elkaar laten staan. Gaat er toch iets mis: gewoon weer het Netlify-adres gebruiken (Firebase is niet aangeraakt).
9. Pas als Joris zegt dat het definitief is: Netlify-site `kwikkel-mep-lijst` uitzetten. Firebase-project later opruimen.

## Wat verandert er voor de gebruikers

- Nieuw adres; naam kiezen en toestel goedkeuren moet per toestel één keer opnieuw (dat wordt per adres op het toestel bewaard).
- Verder werkt alles hetzelfde: lijsten, planning, dashboard, Telegram/WhatsApp-meldingen.
