import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // Uma página por rota: / (home), /ingles e /frances. Ver `src/variant.ts`.
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ingles: resolve(__dirname, 'ingles/index.html'),
        frances: resolve(__dirname, 'frances/index.html'),
      },
    },
  },
});
