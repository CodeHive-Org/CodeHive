import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import tailwindcss from "tailwindcss";
import NodeGlobalsPolyfillPlugin from "@esbuild-plugins/node-globals-polyfill";
import babel from '@rollup/plugin-babel';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  // base: "CodeHive",
  build: {
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
    babel({
      babelrc: false,
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: ['transform-remove-console']
    })
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
