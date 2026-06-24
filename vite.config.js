import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Auto-open the browser when starting, so launching feels like opening an app.
  server: { port: 5173, open: true, host: true },
  preview: { port: 4173, open: true },
})
