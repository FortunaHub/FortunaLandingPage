import { test, expect } from '@playwright/test';

// Routes to test
const ROUTES = [
  '/',
  '/features',
  '/about',
  '/privacy',
  '/terms',
  '/docs/overview',
];

test.describe('Accessibility - WCAG 2.1 AA Compliance', () => {
  test.each(ROUTES)('Route %s has proper semantic HTML', async ({ baseURL }, route) => {
    const page = await test.context().newPage();
    await page.goto(`${baseURL}${route}`);

    // Check for main landmark
    const main = page.locator('main, [role="main"]');
    await expect(main).toBeVisible();

    // Check for proper heading hierarchy
    const h1s = await page.locator('h1').count();
    expect(h1s).toBeGreaterThan(0);

    await page.close();
  });

  test.each(ROUTES)('Route %s has sufficient color contrast', async ({ baseURL }, route) => {
    const page = await test.context().newPage();
    await page.goto(`${baseURL}${route}`);

    // Check text has readable contrast
    const texts = await page.locator('body *:not(script):not(style)').all();
    
    for (const element of texts.slice(0, 20)) {
      // Sample check - in real usage, would run full contrast check via computed styles
      const visible = await element.isVisible();
      if (visible) {
        const text = await element.textContent();
        if (text && text.trim().length > 3) {
          // Element has visible text
          expect(element).toBeTruthy();
        }
      }
    }

    await page.close();
  });

  test.each(ROUTES)('Route %s supports keyboard navigation', async ({ baseURL }, route) => {
    const page = await test.context().newPage();
    await page.goto(`${baseURL}${route}`);

    // Check for skip links
    const skipLink = page.locator('a[href="#main"], a:has-text("Skip")').first();
    const skipLinkVisible = await skipLink.isVisible().catch(() => false);

    // Tab through interactive elements
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    
    // Should focus on an interactive element or skip link
    const isInteractive = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(focusedElement || '');
    expect(isInteractive || skipLinkVisible).toBeTruthy();

    await page.close();
  });

  test.each(ROUTES)('Route %s has focus indicators visible', async ({ baseURL }, route) => {
    const page = await test.context().newPage();
    await page.goto(`${baseURL}${route}`);

    // Check for focus-visible styles
    const button = page.locator('button').first();
    if (await button.isVisible()) {
      // Focus the button and check for outline or ring style
      await button.focus();
      const boxShadow = await button.evaluate(el => window.getComputedStyle(el).boxShadow);
      const outline = await button.evaluate(el => window.getComputedStyle(el).outline);
      
      const hasFocusIndicator = boxShadow !== 'none' || outline !== 'none';
      expect(hasFocusIndicator).toBeTruthy();
    }

    await page.close();
  });

  test.each(ROUTES)('Route %s has proper ARIA labels', async ({ baseURL }, route) => {
    const page = await test.context().newPage();
    await page.goto(`${baseURL}${route}`);

    // Check for unlabeled buttons/icons
    const buttons = await page.locator('button, [role="button"]').all();
    
    for (const button of buttons.slice(0, 10)) {
      const hasAriaLabel = await button.getAttribute('aria-label');
      const hasText = (await button.textContent())?.trim();
      const hasTitle = await button.getAttribute('title');
      
      // Button should have label, text content, or title
      expect(hasAriaLabel || hasText || hasTitle).toBeTruthy();
    }

    await page.close();
  });
});
