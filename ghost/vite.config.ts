import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { attachBookCallApi } from './server/bookCallApi.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  process.env.RESEND_API_KEY = env.RESEND_API_KEY || process.env.RESEND_API_KEY

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'book-call-api',
        configureServer(server) {
          attachBookCallApi(server)
        },
        configurePreviewServer(server) {
          attachBookCallApi(server)
        },
      },
    ],
  }
})
