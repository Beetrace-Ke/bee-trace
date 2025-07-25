import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: path.resolve(__dirname, 'src/frontend/postcss.config.js'), 
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/frontend/src'),  
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),  
  },
  server: {
    open: true,  
  },
});