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
      
      strategies: 'injectManifest',
      
      srcDir: 'public',
      
      filename: 'sw.js',
      
      injectManifest: {
        
        swSrc: 'public/sw.js',
        
        swDest: 'dist/sw.js',
        
        injectionPoint: 'self.__WB_MANIFEST',
        
        additionalManifestEntries: [],
        globPatterns: [
          '***.{webmanifest,html,js,css,png,jpg,jpeg,svg,ttf,gltf,glb,bin}',
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
