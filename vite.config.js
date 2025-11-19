import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Explicitly set public directory (ensures admin files are copied)
  publicDir: 'public',
  build: {
    // Ensure public folder contents are copied to dist
    copyPublicDir: true,
  },
})
