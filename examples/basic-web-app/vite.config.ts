import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: __dirname,
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      '@fancy-react/core': resolve(__dirname, '../../packages/core/src'),
      '@fancy-react/reconciler': resolve(__dirname, '../../packages/reconciler/src'),
      '@fancy-react/shared': resolve(__dirname, '../../packages/shared/src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
});