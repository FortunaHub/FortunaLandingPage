/** Emit route metadata into the Vite template, preserving every built asset. */
import fs from 'node:fs';
import path from 'node:path';
import { SEO_ROUTES, INDEXABLE_ROUTES, NOT_FOUND_META, getStructuredData, type SeoMeta } from '../src/config/seo';
import { DOC_ALIASES } from '../src/config/docs';

const dist = path.resolve('dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const base = (process.env.VITE_BASE_PATH || '/').replace(/\/$/, '');
const site = `https://fortunahub.dev${base}`;
const escape = (value: string) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);

const render = (key: string, route: SeoMeta) => {
  const canonical = `${site}${route.path}`;
  const image = `${site}/${route.ogImage ? `images/${route.ogImage}` : 'logo.png'}`;
  const title = escape(route.title);
  const description = escape(route.description);
  const structured = getStructuredData(key, route, canonical)
    .map((data) => `<script type="application/ld+json">${JSON.stringify(data)}</script>`)
    .join('\n    ');
  const metadata = `<title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="robots" content="${route.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />
    ${route.noindex ? '' : `<link rel="canonical" href="${canonical}" />`}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="FortunaHub" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:title" content="${escape(route.ogTitle || route.title)}" />
    <meta property="og:description" content="${escape(route.ogDescription || route.description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
    ${structured}`;
  return template
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\b[^>]*(?:name|property)=["'](?:description|robots|og:[^"']*|twitter:[^"']*)["'][^>]*>/gi, '')
    .replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi, '')
    .replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '')
    .replace('</head>', `${metadata}\n</head>`)
    .replace(/^[ \t]+$/gm, '');
};

for (const [key, route] of Object.entries(SEO_ROUTES)) {
  const target = path.join(dist, route.path, 'index.html');
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, render(key, route));
}
// Preserve old bookmarks with the destination's canonical metadata and a static redirect.
for (const [alias, target] of Object.entries(DOC_ALIASES)) {
  const destination = `${base}/docs/${target}`;
  const html = fs.readFileSync(path.join(dist, 'docs', target, 'index.html'), 'utf8')
    .replace('</head>', `<meta http-equiv="refresh" content="0;url=${destination}" />\n</head>`);
  fs.mkdirSync(path.join(dist, 'docs', alias), { recursive: true });
  fs.writeFileSync(path.join(dist, 'docs', alias, 'index.html'), html);
}
// /docs is a real entry point; React redirects it to overview.
fs.copyFileSync(path.join(dist, 'docs/overview/index.html'), path.join(dist, 'docs/index.html'));
// GitHub Pages serves 404.html for unknown paths: keep it out of the index.
fs.writeFileSync(path.join(dist, '404.html'), render('notFound', NOT_FOUND_META));
const lastmod = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${INDEXABLE_ROUTES.map(({ path }) => `  <url><loc>${site}${path}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n')}\n</urlset>\n`);
console.log(`Generated ${Object.keys(SEO_ROUTES).length} route pages, docs entry, fallback, and sitemap.`);
