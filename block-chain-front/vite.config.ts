import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5170',
        changeOrigin: true,
        rewrite: (path:string) => path.replace(/^\/api/, '')
      }
    }
  }
})
