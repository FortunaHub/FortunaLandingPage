import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'copy-404',
      closeBundle() {
        const dist = path.resolve(__dirname, 'dist');
        const indexPath = path.join(dist, 'index.html');
        const destPath = path.join(dist, '404.html');
        if (fs.existsSync(indexPath)) {
          fs.copyFileSync(indexPath, destPath);
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
