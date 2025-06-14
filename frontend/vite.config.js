import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['qrcode.react']
  },
  plugins: [react()],
  define: {
    'process.env.VITE_GOOGLE_MAPS_API_KEY': JSON.stringify(process.env.VITE_GOOGLE_MAPS_API_KEY), // Inject environment variables
  },
  resolve: {
    alias: {
      process: 'process/browser', // Polyfill process for the browser
    },
  },
})
