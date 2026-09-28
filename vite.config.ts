import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { spawn } from 'child_process';
import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'prerender-seo-pages',
      closeBundle() {
        const dist = path.resolve(__dirname, 'dist');

        // Run pre-rendering script after build
        console.log('\n[SEO] Running pre-rendering script...');
        
        const child = spawn('npx', ['tsx', 'scripts/prerender-seo.ts'], {
          stdio: 'inherit',
          cwd: __dirname,
        });

        child.on('close', (code) => {
          if (code !== 0) {
            console.error('[SEO] Pre-rendering failed with code', code);
            process.exit(code);
          }
          
          // Copy 404.html after pre-rendering
          const indexPath = path.join(dist, 'index.html');
          const destPath = path.join(dist, '404.html');
          if (fs.existsSync(indexPath)) {
            fs.copyFileSync(indexPath, destPath);
            console.log('[SEO] Copied index.html → 404.html for SPA fallback');
          }
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
