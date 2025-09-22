import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import viteImagemin from 'vite-plugin-imagemin';
export default defineConfig(({ mode }) => ({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern', 
      },
    },
  },
  plugins: [
    react(),          
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: false,
        type: 'module', 
      },
      manifest: {
        name: 'Cosmos Tarot',
        short_name: 'Cosmos Tarot',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        lang: 'en',
        scope: '/',
        description:
          'Read the hearts of the person you would like to know about',
        theme_color: '#000000',
        icons: [
          {
            src: 'assets/cosmos_tarot_favicon/android-icon-36x36.png',
            sizes: '36x36',
            type: 'image/png',
            density: '0.75',
            purpose: 'any',
          },
          {
            src: 'assets/cosmos_tarot_favicon/android-icon-48x48.png',
            sizes: '48x48',
            type: 'image/png',
            density: '1.0',
            purpose: 'any',
          },
          {
            src: 'assets/cosmos_tarot_favicon/android-icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
            density: '1.5',
            purpose: 'any',
          },
          {
            src: 'assets/cosmos_tarot_favicon/android-icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
            density: '2.0',
            purpose: 'any',
          },
          {
            src: 'assets/cosmos_tarot_favicon/android-icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
            density: '3.0',
            purpose: 'any',
          },
          {
            src: 'assets/cosmos_tarot_favicon/android-icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            density: '4.0',
            purpose: 'any',
          },
          {
            src: 'assets/cosmos_tarot_favicon/cosmos_tarot-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'assets/cosmos_tarot_favicon/cosmos_tarot-512x512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        id: 'com.cosmostarot.cosmostarot',
      },
      /**
       * injectManifest'로 설정하면 사용자가 직접 작성한 Service Worker 파일을 사용
       * injectManifest 전략을 사용하면 개발자가 직접 작성한 서비스 워커 파일을 기반으로 Workbox가 필요한 매니페스트(캐싱할 파일 목록)를 주입합니다.
       * Workbox는 swSrc에 지정된 파일을 읽고, 내부에 self.__WB_MANIFEST 자리 표시자를 찾아 실제 캐싱할 파일 목록으로 대체한 후, swDest에 지정된 경로에 새로운 서비스 워커 파일을 생성합니다.
       */
      strategies: 'injectManifest',
      srcDir: 'public',
      filename: 'sw.js',
      injectManifest: {
        swSrc: 'public/sw.js',
        swDest: 'dist/sw.js',
        injectionPoint: 'self.__WB_MANIFEST',
        additionalManifestEntries: [],
        globPatterns: [
          '**/*.{webmanifest,html,js,css,png,jpg,jpeg,svg,ttf,gltf,glb,bin}',
        ],
        maximumFileSizeToCacheInBytes: 9 * 1024 * 1024,
      },
      workbox: {
        importScripts: [],
        globPatterns: [
          '**/*.{webmanifest,html,js,css,png,jpg,jpeg,svg,ttf,gltf,glb,bin}',
        ],
        runtimeCaching: [
          {
            urlPattern: /\/draco\/versioned\/decoders\/.*\.js/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'draco-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 30 * 24 * 60 * 60, 
              },
            },
          },
        ],
        maximumFileSizeToCacheInBytes: 9 * 1024 * 1024,
      },
      /**
       * injectManifest 전략을 사용하면 개발자가 서비스 워커 파일을 직접 제어할 수 있으므로 더 세밀한 제어가 가능하지만, 서비스 워커 코드를 직접 작성해야 합니다. 반면 다른 전략(예: GenerateSW)을 사용하면 Workbox가 서비스 워커 파일을 자동으로 생성해주므로 간편하게 사용할 수 있습니다.
       */
      /**
       * Workbox는 Google에서 개발한 JavaScript 라이브러리로, 서비스 워커 생성, 캐싱 전략 구현, 백그라운드 동기화 등 PWA 개발에 필요한 기능을 제공합니다.
       * Workbox를 사용하면 서비스 워커 코드를 쉽게 작성하고 관리할 수 있으며, 효율적인 캐싱 전략을 적용할 수 있습니다.
       * Workbox는 다양한 캐싱 전략(예: StaleWhileRevalidate, NetworkFirst 등)을 제공하여 네트워크 요청을 최적화하고 오프라인 경험을 향상시킵니다. workbox 옵션은 Workbox 관련 설정을 지정하는 데 사용됩니다.
       */
      /**
       * skipWaiting: true를 추가하여 새로운 서비스 워커가 즉시 활성화되도록 설정합니다. 이렇게 하면 이전 캐시 스토리지가 제거되고 새로운 캐시 스토리지로 대체됩니다.
       * clientsClaim: true를 추가하여 새로운 서비스 워커가 기존 클라이언트를 제어하도록 설정합니다. 이렇게 하면 새로운 서비스 워커가 기존 클라이언트에 적용되어 일관된 캐시 관리가 가능해집니다.
       * cleanupOutdatedCaches과 skipWaiting 두 옵션 모두 이전 캐시를 제거하고 새로운 캐시를 구축하는 효과가 있지만, cleanupOutdatedCaches는 배포 버전이 변경될 때 작동하며, skipWaiting은 새로운 서비스 워커가 활성화될 때 작동합니다.
       */
      maximumFileSizeToCacheInBytes: 9 * 1024 * 1024, 
      skipWaiting: true, 
      clientsClaim: true, 
      cleanupOutdatedCaches: true, 
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 60,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
  ],
  build: {
    minify: 'esbuild', 
    rollupOptions: {
      output: {
        entryFileNames: 'assets/index-[hash].js', 
        chunkFileNames: 'assets/chunk-[hash].js', 
        assetFileNames: assetInfo => {
          if (
            assetInfo?.names?.[0] === 'PottaOne-Regular.ttf' ||
            assetInfo?.name === 'PottaOne-Regular.ttf'
          ) {
            return 'assets/font/Potta_One/[name].[ext]';
          }
          if (
            assetInfo?.names?.[0] === 'KosugiMaru-Regular.ttf' ||
            assetInfo?.name === 'KosugiMaru-Regular.ttf'
          ) {
            return 'assets/font/Kosugi_Maru/[name].[ext]';
          }
          if (
            assetInfo?.names?.[0] === 'Dongle-Regular.ttf' ||
            assetInfo?.name === 'Dongle-Regular.ttf'
          ) {
            return 'assets/font/Dongle/[name].[ext]';
          }
          const fileNameArr =
            assetInfo?.names?.[0]?.split('.') || assetInfo?.name.split('.');
          const extenstion =
            assetInfo?.names?.[0]?.split('.')?.[fileNameArr?.length - 1] ||
            assetInfo?.name?.split('.')[fileNameArr?.length - 1];
          const prefix =
            assetInfo?.names?.[0]?.split('_')[0] ||
            assetInfo?.name.split('_')[0];
          const num_prefix = Number(prefix);
          if (fileNameArr?.[0] === 'tarot_card_back') {
            return 'assets/images/[name].[ext]';
          }
          if (
            typeof num_prefix === 'number' &&
            extenstion === 'jpg' &&
            (assetInfo?.names?.[0] !== 'universe.jpg' ||
              assetInfo?.name !== 'universe.jpg')
          ) {
            return 'assets/images/deck/[name].[ext]';
          }
          if (fileNameArr?.[0]?.slice(0, 8) === 'durumagi') {
            return 'assets/images/[name].[ext]';
          }
          if (fileNameArr?.[0] === 'universe') {
            return 'assets/images/[name].[ext]';
          }
          return 'assets/[name]-[hash].[ext]'; 
        },
      },
    },
  },
}));
