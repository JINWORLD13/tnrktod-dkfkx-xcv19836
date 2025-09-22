import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import {
  CacheFirst,
  NetworkFirst,
  StaleWhileRevalidate,
} from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
const days = 2; 
const version = 'v0543'; 
const assetsToCache = self.__WB_MANIFEST
  .filter(entry => !entry.url.endsWith('sw.js'))
  .map(entry => ({ url: entry.url, revision: entry.hash }));
const additionalAssets = [
  '/index.html',
].map(url => ({ url, revision: version }));
precacheAndRoute([...assetsToCache, ...additionalAssets], {
  globDirectory: 'dist',
  globPatterns: [
    '**index.html',
  '**/manifest.webmanifest',
];
const CACHE_FILES = [
  {
    urlPattern: /\.(?:html)$/,
    handler: 'CacheFirst',
    options: { cacheName: `cache1-${version}` },
  },
  {
    urlPattern: /\.(?:css)$/,
    handler: 'CacheFirst',
    options: { cacheName: `cache2-${version}` },
  },
  {
    urlPattern: /\.(?:js)$/,
    handler: 'CacheFirst',
    options: { cacheName: `cache3-${version}` },
  },
  {
    urlPattern: /\.(?:png|jpg|jpeg|svg|gif|ico)$/,
    handler: 'CacheFirst',
    options: { cacheName: `images-${version}` },
  },
  {
    urlPattern: /\.(?:ttf|gltf|glb|bin)$/,
    handler: 'CacheFirst',
    options: { cacheName: `assets-${version}` },
  },
];
self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(preCacheName)
      .then(cache => {
        const precacheFiles = assetsToCache.map(({ url, revision }) =>
          typeof url === 'string' ? url : url.toString()
        );
        const additionalFiles = PRECACHE_FILES;
        const uniqueUrls = [...new Set([...precacheFiles, ...additionalFiles])];
        return Promise.all(
          uniqueUrls.map(url =>
            cache.add(url).catch(error => {
              console.warn(`Failed to cache ${url}: ${error}`);
            })
          )
        );
      })
      .then(() => {
        self.skipWaiting();
      })
  );
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all([
          ...cacheNames.map(cacheName => {
            if (!CACHE_NAMES.includes(cacheName)) {
              return caches.delete(cacheName);
            }
          }),
          caches.open(preCacheName).then(cache => {
            return cache.addAll(PRECACHE_FILES);
          }),
          cleanupOutdatedCaches(),
        ]);
      })
      .then(() => {
        console.log('New service worker activated and precache updated');
        return self.clients.claim();
      })
  );
});
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
  if (requestUrl.pathname.endsWith('/sw.js')) {
    event.respondWith(fetch(event.request)); 
    return;
  }
  if (requestUrl.pathname.includes('oauth')) {
    event.respondWith(fetch(event.request));
    return;
  }
  const cacheConfig = CACHE_FILES.find(config =>
    config.urlPattern.test(requestUrl.pathname)
  );
  if (cacheConfig) {
    const cacheName = cacheConfig.options.cacheName;
    const cacheStrategy = getCacheStrategy(cacheConfig.handler);
    event.respondWith(
      cacheStrategy
        .handle({ event, request: event.request, cacheName })
        .then(response => {
          if (response) {
            return response;
          }
          return fetch(event.request).then(response => {
            if (response && response.status === 200) {
              const responseToCache = response.clone();
              return caches.open(cacheName).then(cache => {
                return cache
                  .put(event.request, responseToCache)
                  .then(() => response);
              });
            }
            return response;
          });
        })
        .catch(error => {
          console.error('Fetching failed:', error);
        })
    );
  } else {
    event.respondWith(fetch(event.request));
  }
});
function getCacheStrategy(handlerName) {
  switch (handlerName) {
    case 'CacheFirst':
      return new CacheFirst();
    case 'NetworkFirst':
      return new NetworkFirst();
    case 'StaleWhileRevalidate':
      return new StaleWhileRevalidate();
    default:
      throw new Error(`Unknown handler: ${handlerName}`);
  }
}
