/* eslint-disable import/no-unused-modules */
import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // Make sure this matches the Chromium version built into NW.js
    target: 'chrome119',
    outDir: 'dist-vue'
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
