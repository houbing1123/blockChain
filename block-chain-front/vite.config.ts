import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base:"/web3/",
  plugins: [react()],
  server: {
    proxy: {
      // 代理 /web3/api/xxx -> /api/xxx
      '/api': {
        target: 'http://127.0.0.1:5170/',  // 后端 API 地址
        changeOrigin: true,
        rewrite: (path: string) => path.replace('/api', '')
      },
      // 代理 /web3/ai/xxx -> /ai/xxx
      '/ai': {
        target: 'http://127.0.0.1:11434/',  // 本地 AI 服务地址
        changeOrigin: true,
        rewrite: (path: string) => path.replace('/ai', '')
      }
    }
  }
})
