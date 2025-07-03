import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // ✅ this is correct now
      '@assets': path.resolve(__dirname, '../attached_assets'), // if needed
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});