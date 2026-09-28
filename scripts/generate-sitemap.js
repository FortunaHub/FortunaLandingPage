#!/usr/bin/env node
/**
 * Generate sitemap.xml for FortunaHub landing page
 * Run during build to create static sitemap
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://fortunahub.dev';

// All public routes that should appear in sitemap
const routes = [
  { loc: '/', changefreq: 'weekly', priority: 1.0 },
  { loc: '/features', changefreq: 'monthly', priority: 0.9 },
  { loc: '/about', changefreq: 'monthly', priority: 0.8 },
  { loc: '/docs', changefreq: 'weekly', priority: 0.9 },
  { loc: '/docs/overview', changefreq: 'monthly', priority: 0.8 },
  { loc: '/docs/components', changefreq: 'monthly', priority: 0.8 },
  { loc: '/docs/getting-started', changefreq: 'monthly', priority: 0.9 },
  { loc: '/docs/user-guide', changefreq: 'monthly', priority: 0.8 },
  { loc: '/docs/use-cases', changefreq: 'monthly', priority: 0.8 },
  { loc: '/docs/architecture', changefreq: 'quarterly', priority: 0.7 },
  { loc: '/docs/deployment', changefreq: 'quarterly', priority: 0.7 },
  { loc: '/docs/api', changefreq: 'quarterly', priority: 0.7 },
  { loc: '/docs/security', changefreq: 'quarterly', priority: 0.7 },
  { loc: '/docs/troubleshooting', changefreq: 'monthly', priority: 0.7 },
];

// Generate sitemap XML
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `
  <url>
    <loc>${SITE_URL}${route.loc}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join('')}
</urlset>
`;

// Write to public directory
const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.mkdirSync(path.dirname(sitemapPath), { recursive: true });
fs.writeFileSync(sitemapPath, sitemapContent.trim());

console.log(`✓ Generated sitemap.xml with ${routes.length} routes at ${sitemapPath}`);
