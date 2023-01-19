import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '../mobile-app/www',
    minify: false // <= dev
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "/src")
    }
  },
  plugins: [vue()],
})
