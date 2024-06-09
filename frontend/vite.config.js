import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import tailwindcss from "tailwindcss";
import NodeGlobalsPolyfillPlugin from "@esbuild-plugins/node-globals-polyfill";
import { terser } from "rollup-plugin-terser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  // base: "CodeHive",
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      onwarn(warning, defaultHandler) {
        if (warning.code === "SOURCEMAP_ERROR") {
          return;
        }

        defaultHandler(warning);
      },
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
        // This will effectively remove references to 'Buffer'
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          include: ["url", "zlib"],
          buffer: true,
        }),
      ],
    },
  },
  plugins: [
    react(),
    terser({
      compress: {
        drop_console: true, // Remove console logs
      },
    }),
  ],
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
