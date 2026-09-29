import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { SEO_ROUTES } from '../src/config/seo';
import { DOC_SLUGS } from '../src/config/docs';

const routes = Object.values(SEO_ROUTES);
for (const slug of DOC_SLUGS) assert(routes.some(route => route.path === `/docs/${slug}`), `Missing metadata: ${slug}`);
const base = (process.env.VITE_BASE_PATH || '/').replace(/\/$/, '');
for (const route of [...routes.map(route => route.path), '/docs', '/404.html']) {
  const file = route === '/404.html' ? 'dist/404.html' : path.join('dist', route, 'index.html');
  const html = fs.readFileSync(file, 'utf8');
  assert.equal((html.match(/<script\b[^>]*type="module"/g) || []).length, 1, `${route}: one JS entry`);
  assert.match(html, /<link[^>]*rel="stylesheet"/, `${route}: CSS required`);
  assert.equal((html.match(/<title>/g) || []).length, 1, `${route}: one title`);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, `${route}: one canonical`);
  assert.match(html, /property="og:image" content="https:\/\/fortunahub.dev\//, `${route}: absolute image`);
  for (const match of html.matchAll(/(?:src|href)="([^" ]*\/assets\/[^" ]+)"/g)) {
    assert(fs.existsSync(path.join('dist', match[1].replace(base, ''))), `${route}: missing ${match[1]}`);
  }
}
console.log(`Verified assets and metadata on ${routes.length + 2} built entry points.`);
