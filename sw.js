// Simpele service worker: houdt de app-schil (HTML/CSS/JS/iconen) offline
// beschikbaar. Data zelf loopt via Firestore (die heeft eigen offline-cache).
// "Network-first met cache-fallback" zodat je nooit een verouderde versie
// vastzit als er wél internet is.

const CACHE_NAME = "mep-lijst-v9";
const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./data.js",
  "./supabase.js",
  "./supabase-config.js",
  "./firebase-config.js",
  "./loop-fx.js",
  "./handleiding.js",
  "./handleiding-inhoud.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/app-icon-192.png",
  "./icons/app-icon-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png",
  "./brand/robojobs-logo.png",
  "./brand/robojobs-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL.map((u) => new Request(u, { cache: "reload" })))).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  // Alleen eigen, GET-requests cachen. Firestore/Google-API's e.d. altijd
  // gewoon rechtstreeks over het netwerk laten lopen.
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;

  event.respondWith(
    // "no-cache": altijd bij de server checken of er een nieuwe versie is,
    // zodat een update meteen aankomt i.p.v. pas na de browsercache.
    fetch(req, { cache: "no-cache" })
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req))
  );
});
