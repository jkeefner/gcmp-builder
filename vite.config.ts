import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico'],
      manifest: {
        name: 'GCMP Builder',
        short_name: 'GCMP Builder',
        description: 'Ground Control Management Plan Builder for open pit mining operations',
        theme_color: '#1a2e4a',
        background_color: '#f0f4f8',
        display: 'standalone',
        start_url: '/gcmp-builder/',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
    }),
  ],
  base: '/gcmp-builder/',
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
})
