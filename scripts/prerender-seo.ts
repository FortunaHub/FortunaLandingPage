/** Emit route metadata into the Vite template, preserving every built asset. */
import fs from 'node:fs';
import path from 'node:path';
import { SEO_ROUTES, SCHEMA_ORG } from '../src/config/seo';

const dist = path.resolve('dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const base = (process.env.VITE_BASE_PATH || '/').replace(/\/$/, '');
const site = `https://fortunahub.dev${base}`;
const escape = (value: string) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);

for (const route of Object.values(SEO_ROUTES)) {
  const canonical = `${site}${route.path}`;
  const image = `${site}/${route.ogImage ? `images/${route.ogImage}` : 'logo.png'}`;
  const title = escape(route.title);
  const description = escape(route.description);
  const metadata = `<title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="FortunaHub" />
    <meta property="og:title" content="${escape(route.ogTitle || route.title)}" />
    <meta property="og:description" content="${escape(route.ogDescription || route.description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
    <script type="application/ld+json">${JSON.stringify(SCHEMA_ORG.organization)}</script>
    <script type="application/ld+json">${JSON.stringify(SCHEMA_ORG.website)}</script>`;
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\b[^>]*(?:name|property)=["'](?:description|og:[^"']*|twitter:[^"']*)["'][^>]*>/gi, '')
    .replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi, '')
    .replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '')
    .replace('</head>', `${metadata}\n</head>`)
    .replace(/^[ \t]+$/gm, '');
  const target = path.join(dist, route.path, 'index.html');
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html);
}
// /docs is a real entry point; React redirects it to overview.
fs.copyFileSync(path.join(dist, 'docs/overview/index.html'), path.join(dist, 'docs/index.html'));
fs.copyFileSync(path.join(dist, 'index.html'), path.join(dist, '404.html'));
fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.values(SEO_ROUTES).map(({ path }) => `<url><loc>${site}${path}</loc></url>`).join('')}</urlset>\n`);
console.log(`Generated ${Object.keys(SEO_ROUTES).length} route pages, docs entry, fallback, and sitemap.`);
