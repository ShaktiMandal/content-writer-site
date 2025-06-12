

// https://vite.dev/config/
import { defineConfig, } from 'vite'
import vue from '@vitejs/plugin-vue'
// Import Tailwind CSS plugin
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [vue(),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:1337',
        changeOrigin: true,
      }
    }
  }
  
})
