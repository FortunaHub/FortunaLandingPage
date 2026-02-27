import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  // GitHub Pages: base = /<repo-name>/ (set BASE_PATH in CI)
  const base = process.env.BASE_PATH || '/';
  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
      // Copy index.html → 404.html for SPA routing on GitHub Pages
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
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
