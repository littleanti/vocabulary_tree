// Service Worker — PWA cache-first strategy with network fallback
// Precache core assets at install; skipWaiting + clients.claim for immediate activation

const CACHE_NAME = 'vt-cache-v1';

const PRECACHE_URLS = [
  './',
  './index.html',
  './favicon.svg',
  './manifest.webmanifest',
  // CSS
  './src/css/tokens.css',
  './src/css/base.css',
  './src/css/components.css',
  './src/css/screens.css',
  './src/css/tree.css',
  './src/css/blocks.css',
  './src/css/modal.css',
  './src/css/overview.css',
  './src/css/boss.css',
  './src/css/dashboard.css',
  // JS — main
  './src/js/main.js',
  './src/js/config.js',
  './src/js/state.js',
  './src/js/utils.js',
  './src/js/db.js',
  './src/js/notify.js',
  './src/js/tts.js',
  './src/js/curriculum.js',
  './src/js/srl.js',
  // JS — tree
  './src/js/tree/camera.js',
  './src/js/tree/grow.js',
  './src/js/tree/leaves.js',
  './src/js/tree/minimap.js',
  './src/js/tree/overview.js',
  './src/js/tree/render.js',
  // JS — blocks
  './src/js/blocks/drag.js',
  './src/js/blocks/match.js',
  './src/js/blocks/spawn.js',
  // JS — ui
  './src/js/ui/lock.js',
  './src/js/ui/modal.js',
  './src/js/ui/dashboard.js',
  // JS — boss
  './src/js/boss/decompose.js',
  // Data
  './src/data/hanja.js',
  './src/data/words.js',
  './src/data/academic.js',
  // Icons
  './icons/icon-192.svg',
  './icons/icon-512.svg',
];

// Install: precache all assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS).then(() => {
        self.skipWaiting();
      });
    })
  );
});

// Activate: clean up old caches, claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => {
      self.clients.claim();
    })
  );
});

// Fetch: cache-first for same-origin, stale-while-revalidate for fonts
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Network-only for non-GET
  if (request.method !== 'GET') {
    event.respondWith(fetch(request));
    return;
  }

  // Same-origin: cache-first
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).catch(() => {
          // Network failed; try generic fallback
          return caches.match('./index.html');
        });
      })
    );
    return;
  }

  // Google Fonts: stale-while-revalidate
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const fetchPromise = fetch(request).then((response) => {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, response.clone());
          });
          return response;
        });
        return cached || fetchPromise;
      })
    );
    return;
  }

  // Others: network-first with cache fallback
  event.respondWith(
    fetch(request)
      .then((response) => response)
      .catch(() => caches.match(request))
  );
});

// Message handler for skipWaiting
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
