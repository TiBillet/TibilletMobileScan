import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "../mobile-app/www",
    minify: false, // <= dev
  },
  plugins: [vue()],
  server: {
    port: 3000,
    proxy: {
      "/wv": {
        target: "https://demo.cashless.tibillet.localhost",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "/src"),
      "~@": resolve(__dirname, "/src"),
    },
  },
});
