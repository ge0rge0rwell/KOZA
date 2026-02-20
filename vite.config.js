import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'node:path'

const mastodonRoot = path.resolve(__dirname, 'mastodon/app/javascript');

function MastodonEmojiCompressed() {
  const virtualModuleId = 'virtual:mastodon-emoji-compressed';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'mastodon-emoji-compressed',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
      return undefined;
    },
    async load(id) {
      if (id === resolvedVirtualModuleId) {
        // We use the .mjs file directly from Mastodon source
        const emojiData = await import('./mastodon/app/javascript/mastodon/features/emoji/emoji_compressed.mjs');
        return `export default ${JSON.stringify(emojiData.default)};`;
      }
      return undefined;
    },
  };
}

export default defineConfig({
  resolve: {
    alias: {
      'mastodon/': `${mastodonRoot}/mastodon/`,
      '@/': `${mastodonRoot}/`,
      '~/': `${mastodonRoot}/`,
    },
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.scss']
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [
          path.resolve(__dirname, 'mastodon/app/javascript'),
          path.resolve(__dirname, 'mastodon/app/javascript/styles')
        ],
      },
    },
  },
  plugins: [
    tsconfigPaths({ projects: [path.resolve(__dirname, 'mastodon/tsconfig.json')] }),
    react(),
    svgr(),
    MastodonEmojiCompressed(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'pwa-192x192.png', 'pwa-512x512.png'],
      manifest: {
        name: 'KOZA',
        short_name: 'KOZA',
        description: 'Zorluklarını hikaye ve oyunlara dönüştürerek kanatlan. Kişisel gelişim ve metamorfoz rehberin.',
        theme_color: '#9333ea',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        categories: ['education', 'lifestyle', 'health'],
        screenshots: []
      }
    })
  ],
  server: {
    proxy: {
      '/mastodon': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mastodon/, '')
      },
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/oauth': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/auth': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/system': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
