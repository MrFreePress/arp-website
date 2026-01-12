import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { Buffer } from 'buffer'

export default defineConfig({
  plugins: [react()],
  define: {
    // Polyfill Buffer for browser (required by gray-matter)
    'global': 'globalThis',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Polyfill buffer for browser
      buffer: 'buffer',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Define global for browser
      define: {
        global: 'globalThis',
      },
    },
  },
  // Explicitly set public directory (ensures admin files are copied)
  publicDir: 'public',
  build: {
    // Ensure public folder contents are copied to dist
    copyPublicDir: true,
  },
})
