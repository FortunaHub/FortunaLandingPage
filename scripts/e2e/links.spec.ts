import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// All known internal routes
const KNOWN_ROUTES = [
  '/',
  '/features',
  '/about',
  '/privacy',
  '/terms',
  '/docs/overview',
  '/docs/components',
  '/docs/getting-started',
  '/docs/user-guide',
  '/docs/use-cases',
  '/docs/architecture',
  '/docs/deployment',
  '/docs/api',
  '/docs/security',
  '/docs/troubleshooting',
  '/register',
];

test.describe('Links & Navigation', () => {
  test('All internal links return 200 OK', async ({ baseURL, page }) => {
    const errors: string[] = [];

    for (const route of KNOWN_ROUTES) {
      const response = await page.goto(`${baseURL}${route}`);
      const status = response?.status();
      
      if (status !== 200) {
        errors.push(`${route}: HTTP ${status}`);
      }
    }

    if (errors.length > 0) {
      console.error('❌ Dead links found:');
      errors.forEach(e => console.error(`  ${e}`));
    }

    expect(errors).toHaveLength(0);
  });

  test('Can click navigation links on homepage', async ({ baseURL, page }) => {
    await page.goto(`${baseURL}/`);

    // Click links to features, about, etc.
    const links = await page.locator('a[href^="/"]').all();
    
    const clickedRoutes: string[] = [];
    
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href && KNOWN_ROUTES.includes(href)) {
        try {
          // Click and verify page loads
          const response = await page.goto(`${baseURL}${href}`);
          if (response?.status() === 200) {
            clickedRoutes.push(href);
          }
        } catch (e) {
          console.error(`Failed to navigate to ${href}`);
        }
      }
    }

    expect(clickedRoutes.length).toBeGreaterThan(0);
  });

  test('Sitemap URLs are all accessible', async ({ baseURL, page }) => {
    // Read sitemap
    const sitemapPath = path.resolve(process.cwd(), 'public/sitemap.xml');
    expect(fs.existsSync(sitemapPath)).toBeTruthy();

    const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
    const urlMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];
    
    const errors: string[] = [];
    
    for (const match of urlMatches) {
      const url = match.replace(/<\/?loc>/g, '');
      // Extract path from absolute URL
      const urlObj = new URL(url);
      const pathname = urlObj.pathname.replace(/^\/FortunaLandingPage/, '');
      
      const response = await page.goto(new URL(pathname, baseURL).toString());
      const status = response?.status();
      
      if (status !== 200) {
        errors.push(`${pathname}: HTTP ${status}`);
      }
    }

    if (errors.length > 0) {
      console.error('❌ Sitemap URLs not accessible:');
      errors.forEach(e => console.error(`  ${e}`));
    }

    expect(errors).toHaveLength(0);
  });

  test('Privacy page loads with metadata', async ({ baseURL, page }) => {
    const response = await page.goto(`${baseURL}/privacy`);
    
    expect(response?.status()).toBe(200);
    
    // Check for page title
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    
    // Check for meta description
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description?.length).toBeGreaterThan(0);
    
    // Check for content
    const content = await page.locator('main, article, [role="main"]').textContent();
    expect(content).toContain('privacy');
  });

  test('Terms page loads with metadata', async ({ baseURL, page }) => {
    const response = await page.goto(`${baseURL}/terms`);
    
    expect(response?.status()).toBe(200);
    
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description?.length).toBeGreaterThan(0);
  });

  test('Broken links detected and reported', async ({ baseURL, page }) => {
    await page.goto(`${baseURL}/`);

    const links = await page.locator('a[href]').all();
    const brokenLinks: string[] = [];

    for (const link of links) {
      const href = await link.getAttribute('href');
      
      // Skip external links and anchors
      if (href?.startsWith('http') || href?.startsWith('#') || href?.startsWith('mailto:')) {
        continue;
      }

      if (href && !href.startsWith('javascript:') && !href.startsWith('data:')) {
        const response = await page.goto(new URL(href, baseURL).toString()).catch(() => null);
        if (!response || response.status() !== 200) {
          brokenLinks.push(href);
        }
      }
    }

    if (brokenLinks.length > 0) {
      console.warn(`⚠️ Potentially broken links: ${brokenLinks.join(', ')}`);
    }

    // Should have no broken links
    expect(brokenLinks).toHaveLength(0);
  });
});
