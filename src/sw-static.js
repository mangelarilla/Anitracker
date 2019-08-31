const CACHE_NAME = 'static-cache-v2';
const urlsToCache = [
  '/',
  '/assets/styles.css',
  '/app/anilist-queries.js',
  '/app/main.js',
  '/app/oauth.js',
  '/app/ui.js',
  '/app/ui.listeners.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName === CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});