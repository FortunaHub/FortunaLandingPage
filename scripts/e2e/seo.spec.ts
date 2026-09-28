import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('SEO & Domain Validation', () => {
  test('All pages have unique titles under 60 chars', async ({ baseURL, page }) => {
    const routes = [
      '/',
      '/features',
      '/about',
      '/privacy',
      '/terms',
      '/docs/overview',
    ];

    const titles = new Set<string>();
    const errors: string[] = [];

    for (const route of routes) {
      await page.goto(`${baseURL}${route}`);
      const title = await page.title();
      
      if (title.length > 60) {
        errors.push(`${route}: Title too long (${title.length} chars): "${title}"`);
      }
      
      if (titles.has(title)) {
        errors.push(`${route}: Duplicate title: "${title}"`);
      }
      
      titles.add(title);
    }

    if (errors.length > 0) {
      console.error('❌ Title validation failed:');
      errors.forEach(e => console.error(`  ${e}`));
    }

    expect(errors).toHaveLength(0);
  });

  test('All pages have meta descriptions 100-160 chars', async ({ baseURL, page }) => {
    const routes = [
      '/',
      '/features',
      '/about',
      '/privacy',
      '/terms',
      '/docs/overview',
    ];

    const errors: string[] = [];

    for (const route of routes) {
      await page.goto(`${baseURL}${route}`);
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      
      if (!description) {
        errors.push(`${route}: Missing meta description`);
        continue;
      }

      const len = description.length;
      if (len < 100 || len > 160) {
        errors.push(`${route}: Description ${len} chars (should be 100-160): "${description}"`);
      }
    }

    if (errors.length > 0) {
      console.error('❌ Description validation failed:');
      errors.forEach(e => console.error(`  ${e}`));
    }

    expect(errors).toHaveLength(0);
  });

  test('Canonical URLs are consistent and correct', async ({ baseURL, page }) => {
    await page.goto(`${baseURL}/`);

    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    
    // Should have canonical
    expect(canonical).toBeTruthy();

    // Should be absolute URL or relative
    if (canonical && canonical.startsWith('http')) {
      // Production: should be fortunahub.io
      if (canonical.includes('.io') || canonical.includes('.dev')) {
        expect(canonical).toMatch(/https?:\/\/(?:www\.)?fortunahub\.(io|dev)/);
      }
    }
  });

  test('Sitemap.xml references correct domain', async ({ baseURL, page }) => {
    const sitemapPath = path.resolve(process.cwd(), 'public/sitemap.xml');
    expect(fs.existsSync(sitemapPath)).toBeTruthy();

    const content = fs.readFileSync(sitemapPath, 'utf-8');
    
    // Should reference one consistent domain
    const ioMatches = (content.match(/fortunahub\.io/g) || []).length;
    const devMatches = (content.match(/fortunahub\.dev/g) || []).length;
    const ioHttpMatches = (content.match(/https?:\/\/[^/]*\.io/g) || []).length;
    const devHttpMatches = (content.match(/https?:\/\/[^/]*\.dev/g) || []).length;
    
    // Should use one domain consistently
    const totalMatches = ioMatches + devMatches + ioHttpMatches + devHttpMatches;
    expect(totalMatches).toBeGreaterThan(0);

    // No mixed domains
    if (ioMatches > 0 && devMatches > 0) {
      throw new Error('Sitemap has mixed domains: both .io and .dev found');
    }

    const hasMixedHttpDomains = ioHttpMatches > 0 && devHttpMatches > 0;
    expect(hasMixedHttpDomains).toBe(false);
  });

  test('robots.txt references correct domain in Sitemap', async () => {
    const robotsPath = path.resolve(process.cwd(), 'public/robots.txt');
    const content = fs.readFileSync(robotsPath, 'utf-8');
    
    expect(content).toContain('Sitemap:');
    
    // Should point to one domain
    const sitemapLine = content.split('\n').find(l => l.includes('Sitemap:'));
    expect(sitemapLine).toBeTruthy();
    
    if (sitemapLine) {
      const url = sitemapLine.replace('Sitemap:', '').trim();
      expect(url.startsWith('http')).toBeTruthy();
      expect(url.includes('fortunahub')).toBeTruthy();
    }
  });

  test('OG meta tags present on homepage', async ({ baseURL, page }) => {
    await page.goto(`${baseURL}/`);

    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');

    expect(ogTitle).toBeTruthy();
    expect(ogDescription).toBeTruthy();
    expect(ogImage).toBeTruthy();
  });

  test('Structured data (JSON-LD) is valid', async ({ baseURL, page }) => {
    await page.goto(`${baseURL}/`);

    const scriptContent = await page.locator('script[type="application/ld+json"]').textContent();
    
    if (scriptContent) {
      try {
        const jsonLd = JSON.parse(scriptContent);
        expect(jsonLd['@context']).toBe('https://schema.org');
        expect(jsonLd['@type']).toBeTruthy();
      } catch (e) {
        throw new Error(`Invalid JSON-LD: ${e}`);
      }
    }
  });

  test('No console errors on page load', async ({ baseURL, page }) => {
    const errors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto(`${baseURL}/`);
    await page.waitForLoadState('networkidle');

    if (errors.length > 0) {
      console.warn(`⚠️ Console errors detected: ${errors.join(', ')}`);
    }

    expect(errors).toHaveLength(0);
  });
});
