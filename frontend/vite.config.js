import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import tailwindcss from "tailwindcss";
import NodeGlobalsPolyfillPlugin from "@esbuild-plugins/node-globals-polyfill";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  // base: "CodeHive",
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
