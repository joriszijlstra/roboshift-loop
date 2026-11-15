# RoboShift Loop

Digitale mise-en-place-lijst van RoboShift, voor het eerst in gebruik bij Eetcafé de Kwikkel (Medemblik).

Statische site (HTML/CSS/JS), data via Firebase Firestore (project `kwikkel-mep-lijst`, anonieme login). Geen build-stap.

- Hosting: GitHub Pages, vanaf branch `main`, map `/` (root).
- Oude hosting: https://kwikkel-mep-lijst.netlify.app (blijft actief tot de overstap).

## Supabase (branch `supabase`)

- `supabase-config.js` aanwezig → Loop gebruikt Supabase (tabel `loop_docs`, zie `supabase/001_loop_docs.sql`), anders Firebase.
- `migreer.html`: kopieert Firebase → Supabase en controleert het resultaat.
- Overstapstappen: zie `OVERSTAP.md`.
