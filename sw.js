// HAMR Runner service worker: precache the whole site so it opens and runs with no signal.
// Bump VERSION on every deploy so clients pick up the new files.
const VERSION = 'hamr-v2';
const FILES = ['./', './index.html', './levels.json', './manifest.webmanifest', './icon-192.png', './icon-512.png'].concat(['level', 'go', 'set', 'rest', 'stoppedat', 'done', 'reset', 'tenseconds', 'threesec', 'seconds', 't30', 't40', 't50', 't60', 't70', 't80', 't90', 'n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7', 'n8', 'n9', 'n10', 'n11', 'n12', 'n13', 'n14', 'n15', 'n16', 'n17', 'n18', 'n19', 'n20', 'n21'].map(k => './voice/' + k + '.mp3'));
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
