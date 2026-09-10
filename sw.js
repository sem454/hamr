// HAMR Runner service worker: precache the whole site so it opens and runs with no signal.
// Bump VERSION on every deploy so clients pick up the new files.
const VERSION = 'hamr-v1';
const FILES = ['./', './index.html', './levels.json', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// Cache first, refresh in the background. Offline never blocks; an update lands on the next open.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, {ignoreSearch: true}).then(cached => {
    const net = fetch(e.request).then(r => { if (r && r.ok) caches.open(VERSION).then(c => c.put(e.request, r.clone())); return r; }).catch(() => cached);
    return cached || net;
  }));
});
