import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import {
  CacheFirst,
  NetworkFirst,
  StaleWhileRevalidate,
} from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
const days = 1; 
const version = 'v0373'; 
/**
 * sw.js 파일에서 precacheAndRoute 메서드에 직접 globPatterns와 maximumFileSizeToCacheInBytes 옵션을 설정한 경우, injectManifest 옵션에서 globDirectory와 globPatterns를 설정하거나 workbox 옵션에서 maximumFileSizeToCacheInBytes를 설정할 필요가 없습니다.
injectManifest 모드에서는 swSrc에 지정된 서비스 워커 소스 파일을 기반으로 빌드 프로세스가 진행되므로, 해당 파일에서 직접 설정한 옵션이 우선적으로 적용됩니다.
 */
const assetsToCache = self.__WB_MANIFEST.map(entry => ({
  url: entry.url,
  revision: entry.hash,
}));
precacheAndRoute(assetsToCache, {
  globDirectory: 'dist',
  globPatterns: ['/index.html', '/manifest.webmanifest'],
  maximumFileSizeToCacheInBytes: 9 * 1024 * 1024, 
});
registerRoute(
  /\.(?:html)$/i,
  new CacheFirst({
    cacheName: `cache1-${version}`,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: days * 24 * 60 * 60,
      }),
      new CacheableResponsePlugin({
        statuses: [200, 201, 202, 203, 204, 205, 206, 207, 208, 226],
      }),
    ],
  })
);
registerRoute(
  /\.(?:css)$/i,
  new CacheFirst({
    cacheName: `cache2-${version}`,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: days * 24 * 60 * 60,
      }),
      new CacheableResponsePlugin({
        statuses: [200, 201, 202, 203, 204, 205, 206, 207, 208, 226],
      }),
    ],
  })
);
registerRoute(
  /\.(?:js)$/i,
  new CacheFirst({
    cacheName: `cache3-${version}`,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: days * 24 * 60 * 60,
      }),
      new CacheableResponsePlugin({
        statuses: [200, 201, 202, 203, 204, 205, 206, 207, 208, 226],
      }),
    ],
  })
);
registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif|ico)$/i,
  new CacheFirst({
    cacheName: `images-${version}`,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 150,
        maxAgeSeconds: days * 24 * 60 * 60,
      }),
      new CacheableResponsePlugin({
        statuses: [200, 201, 202, 203, 204, 205, 206, 207, 208, 226],
      }),
    ],
  })
);
registerRoute(
  /\.(?:ttf|gltf|bin)$/i,
  new CacheFirst({
    cacheName: `assets-${version}`,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: days * 24 * 60 * 60,
      }),
      new CacheableResponsePlugin({
        statuses: [200, 201, 202, 203, 204, 205, 206, 207, 208, 226],
      }),
    ],
  })
);
const preCacheName = `workbox-precache-v2-https:
const CACHE_NAMES = [
  preCacheName,
  `cache1-${version}`,
  `cache2-${version}`,
  `cache3-${version}`,
  `images-${version}`,
  `assets-${version}`,
];
const PRECACHE_FILES = [
  '**/index.html',
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
    urlPattern: /\.(?:ttf|gltf|bin)$/,
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
      .then(() => self.skipWaiting())
  );
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all([
        ...cacheNames.map(cacheName => {
          if (!CACHE_NAMES.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        }),
        caches.open(preCacheName).then(cache => {
          return cache.addAll(PRECACHE_FILES);
        })
      ]);
    }).then(() => {
      console.log('New service worker activated and precache updated');
      return self.clients.claim();
    })
  );
});
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
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
