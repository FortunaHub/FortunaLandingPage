/** Run with node --import tsx scripts/test-seo.ts. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { SEO_ROUTES } from '../src/config/seo';
import { DOC_META, DOC_ALIASES } from '../src/config/docs';

const routes = Object.values(SEO_ROUTES);
assert.equal(new Set(routes.map(route => route.path)).size, routes.length, 'Unique canonical paths');
assert.equal(new Set(routes.map(route => route.title)).size, routes.length, 'Unique page titles');
for (const doc of DOC_META) {
  const meta = SEO_ROUTES[`docs_${doc.slug.replace(/-/g, '_')}`];
  assert.equal(meta.path, `/docs/${doc.slug}`);
  assert.equal(meta.description, doc.description);
}
const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8');
for (const route of routes) {
  assert(route.title.trim() && route.description.trim(), `${route.path}: metadata required`);
  assert(sitemap.includes(`https://fortunahub.dev${route.path}</loc>`), `${route.path}: sitemap entry`);
  if (route.ogImage) assert(fs.existsSync(`public/images/${route.ogImage}`), `Missing image: ${route.ogImage}`);
}
for (const alias of Object.keys(DOC_ALIASES)) assert(!sitemap.includes(`/docs/${alias}</loc>`), `${alias}: redirects excluded from sitemap`);
console.log(`SEO checks passed for ${routes.length} canonical routes.`);
