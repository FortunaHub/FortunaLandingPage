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
          
          // Extract script tag from Vite-built index.html
          const indexPath = path.join(dist, 'index.html');
          const indexContent = fs.readFileSync(indexPath, 'utf-8');
          const scriptMatch = indexContent.match(/<script type="module"[^>]*><\/script>/);
          const scriptTag = scriptMatch ? scriptMatch[0] : '';

          if (!scriptTag) {
            console.warn('[SEO] Warning: Could not find script tag in index.html');
          } else {
            // Inject script tag into pre-rendered nested route files
            const nestedRoutes = ['features', 'about', 'privacy', 'terms', 'docs'];
            nestedRoutes.forEach((route) => {
              let nestedPath: string;
              if (route === 'docs') {
                nestedPath = path.join(dist, route, 'overview', 'index.html');
              } else {
                nestedPath = path.join(dist, route, 'index.html');
              }

              if (fs.existsSync(nestedPath)) {
                const content = fs.readFileSync(nestedPath, 'utf-8');
                // Inject script before closing body tag
                const updated = content.replace(
                  '</body>',
                  `    ${scriptTag}\n  </body>`
                );
                fs.writeFileSync(nestedPath, updated, 'utf-8');
                console.log(`[SEO] Injected JS bundle into /${route}`);
              }
            });
          }
          
          // Copy 404.html after pre-rendering
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
