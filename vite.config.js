import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Production build is served from GitHub Pages under /progress-bar/.
  // Local dev/preview stays at the root.
  base: command === 'build' ? '/progress-bar/' : '/',
  // Auto-open the browser when starting, so launching feels like opening an app.
  server: { port: 5173, open: true, host: true },
  preview: { port: 4173, open: true },
}))
