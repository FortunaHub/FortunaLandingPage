# FortunaHub SEO Implementation - Static HTML Pre-rendering

## Overview

This document describes the real SEO implementation for FortunaHub Landing Page. We replaced JavaScript-dependent metadata with **static HTML pre-rendering**, ensuring search engines, social media crawlers, and link previews can access SEO metadata directly from the HTML source (not DOM).

## Key Implementation Details

### 1. Static Pre-rendering Strategy

**Approach**: Post-build static HTML generation using a custom Vite plugin.

**How it works**:
1. After Vite builds the React app, a pre-rendering script generates static HTML files
2. Each public route gets its own directory with an `index.html` file
3. Meta tags are **embedded directly in HTML source** (not added via JavaScript)
4. Vite plugin orchestrates the workflow via `closeBundle()` hook

**File structure**:
```
dist/
├── index.html                    # Home page (/)
├── features/
│   └── index.html               # /features route (HTTP 200)
├── about/
│   └── index.html               # /about route (HTTP 200)
├── privacy/
│   └── index.html               # /privacy route (HTTP 200)
├── terms/
│   └── index.html               # /terms route (HTTP 200)
└── docs/
    └── overview/
        └── index.html           # /docs/overview route (HTTP 200)
```

### 2. Metadata in HTML Source

All routes contain static meta tags in the `<head>` section. Example from `/privacy`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Privacy Policy - FortunaHub</title>
    <meta name="description" content="FortunaHub privacy policy: how we handle your data..." />
    
    <!-- Canonical URL (absolute) -->
    <link rel="canonical" href="https://fortunahub.io/privacy" />
    
    <!-- Open Graph (absolute URLs) -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Privacy Policy - FortunaHub" />
    <meta property="og:description" content="..." />
    <meta property="og:image" content="https://fortunahub.io/logo.png" />
    <meta property="og:url" content="https://fortunahub.io/privacy" />
    <meta property="og:site_name" content="FortunaHub" />
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Privacy Policy - FortunaHub" />
    <meta name="twitter:image" content="https://fortunahub.io/logo.png" />
    
    <!-- JSON-LD Schema -->
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"Organization",...}
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### 3. Absolute Open Graph URLs

All OG tags use **absolute HTTPS URLs** as required by social crawlers:

- ✅ `https://fortunahub.io/images/dashboard-overview.png` (absolute)
- ✅ `https://fortunahub.io/privacy` (absolute canonical)
- ❌ `/images/logo.png` (relative - NOT used)

Configuration in `scripts/prerender-seo.ts`:
```typescript
const SITE_URL = 'https://fortunahub.io';

function getOgImageUrl(imagePath?: string): string {
  if (!imagePath) return `${SITE_URL}/logo.png`;
  return `${SITE_URL}/images/${imagePath}`;
}
```

### 4. JSON-LD Schema (Fixed)

**Validated schema types** included in each pre-rendered page:

1. **Organization Schema** (once per page):
   ```json
   {
     "@context": "https://schema.org",
     "@type": "Organization",
     "name": "FortunaHub",
     "url": "https://fortunahub.io",
     "logo": "https://fortunahub.io/logo.png",
     "sameAs": ["https://github.com/FortunaHub/fortuna"]
   }
   ```

2. **WebSite Schema** (once per page):
   ```json
   {
     "@context": "https://schema.org",
     "@type": "WebSite",
     "name": "FortunaHub",
     "url": "https://fortunahub.io"
   }
   ```

**Improvements**:
- ✅ Removed fake `SearchAction` (no search functionality)
- ✅ Removed fake `Twitter` sameAs (not verified)
- ✅ Only Organization and WebSite schemas (validated types)
- ✅ No duplicate schema scripts (one Organization, one WebSite per page)

### 5. HTTP 200 on All Routes

All public routes return **HTTP 200** (not 404):

```bash
✓ /               → dist/index.html
✓ /features       → dist/features/index.html
✓ /about          → dist/about/index.html
✓ /privacy        → dist/privacy/index.html
✓ /terms          → dist/terms/index.html
✓ /docs/overview  → dist/docs/overview/index.html
```

The Vite config's `copy-404` plugin ensures SPA fallback to index.html for React routing on client-side navigation.

## Build Pipeline

### Build Process Flow

```
npm run build
  ↓
vite build (compiles React + CSS)
  ↓
npm run track-versions
  ↓
Vite closeBundle hook triggers:
  ↓
npx tsx scripts/prerender-seo.ts
  ↓
- Read SEO_ROUTES from seo.ts config
- Generate HTML with embedded meta tags for each route
- Create directory structure: /route/index.html
- Validate HTML contains all required tags
  ↓
Copy dist/index.html → dist/404.html (SPA fallback)
  ↓
Build complete ✓
```

### Scripts

**Available npm scripts**:

- `npm run build` - Full build + pre-rendering (automatically runs pre-render)
- `npm run prerender` - Manual pre-rendering only
- `npm run validate-seo` - Validate all routes and meta tags
- `npm run ci` - Full CI pipeline (typecheck → build → validate → links → a11y)

## Verification & Testing

### Validate SEO (Automated)

Run validation to check all routes:

```bash
npm run validate-seo
```

**Checks performed**:
- HTTP 200 on all routes (files exist)
- All required meta tags present in HTML source
- JSON-LD schema is valid JSON
- OG URLs are absolute (https://)
- No duplicate schema types

**Output**:
```
=== SEO Validation Report ===

📄 home
   File: ./dist/index.html
   ✅ HTTP 200: HTTP 200 (file exists)
   ✅ Meta Tags: All required tags present
   ✅ JSON-LD Schema: Valid (2 schemas: Organization, WebSite)
   ✅ OG URLs (Absolute): 2 absolute OG URLs found

... (all routes checked)

✓ Overall: 24/24 checks passed
```

### Manual Verification

#### 1. Check HTML Source (Not DOM)

Verify meta tags in the **HTML source** before any JavaScript runs:

```bash
# View raw HTML (not DevTools DOM)
curl -s https://fortunahub.io/privacy | head -60

# Should show:
# <title>Privacy Policy - FortunaHub</title>
# <meta name="description" content="..." />
# <link rel="canonical" href="https://fortunahub.io/privacy" />
# <meta property="og:url" content="https://fortunahub.io/privacy" />
```

#### 2. Test OG URLs with Social Crawlers

**Facebook Debugger**: https://developers.facebook.com/tools/debug/sharing/
- Paste: https://fortunahub.io/features
- Verify og:title, og:image, og:url are crawled

**Twitter Card Validator**: https://cards-dev.twitter.com/validator
- Paste: https://fortunahub.io/about
- Should show preview with twitter:image

#### 3. Validate JSON-LD Schema

Use the official schema.org validator:
https://schema.org/

Or use the Google Rich Results Test:
https://search.google.com/test/rich-results?url=https://fortunahub.io

**Expected**:
- Organization schema recognized ✓
- WebSite schema recognized ✓
- No validation errors

### Local Preview

```bash
# Build and preview locally
npm run build
npm run preview

# Open http://localhost:4173
# View page source (Ctrl+U / Cmd+U)
# Verify meta tags in source before JavaScript loads
```

## Configuration Files

### scripts/prerender-seo.ts

Post-build script that:
- Reads SEO config from `src/config/seo.ts`
- Generates static HTML for each route
- Embeds all meta tags in HTML source
- Validates generated HTML
- Reports results

### scripts/validate-seo.ts

Validation script that:
- Checks HTTP 200 on all routes
- Verifies all required meta tags present
- Validates JSON-LD schema syntax
- Checks OG URLs are absolute
- Detects duplicate schemas

### src/config/seo.ts

Centralized SEO metadata configuration:
- SEO_ROUTES: Route-specific titles, descriptions, images
- SCHEMA_ORG: Organization and WebSite schemas
- getCanonicalUrl(): Absolute URL generation
- getOgImageUrl(): Absolute image URL generation

### vite.config.ts

Build configuration with pre-rendering plugin:
- `prerender-seo-pages` plugin runs after build
- Spawns `prerender-seo.ts` script
- Copies index.html → 404.html for SPA fallback

## Migration from Client-Side to Static SEO

### What Changed

**Before** (Client-side only):
```javascript
// In React component
export function SeoHead() {
  useEffect(() => {
    document.title = 'My Page';  // Modified after render
    // Meta tags added via DOM
  }, []);
}
// Problem: Search bots see empty <div id="root"></div>
```

**After** (Static pre-rendering):
```html
<!-- In HTML source -->
<title>My Page</title>
<meta name="description" content="..." />
<!-- Available immediately to crawlers -->
```

### What Stayed the Same

- React router still handles client-side navigation
- SeoHead component can still update DOM if needed
- build process unchanged (added post-build hook only)
- No breaking changes to existing code

## SEO Best Practices Implemented

✅ **Unique titles** - Each page has unique, descriptive title under 60 chars
✅ **Unique descriptions** - 120-160 character descriptions per route
✅ **Canonical URLs** - Absolute URLs prevent duplicate content issues
✅ **Open Graph** - All OG tags use absolute URLs for social sharing
✅ **JSON-LD** - Valid schema.org markup for rich results
✅ **HTTP 200** - All public routes return success status
✅ **Sitemap** - XML sitemap available at /sitemap.xml
✅ **Robots.txt** - Crawling guidance at /robots.txt
✅ **Mobile ready** - Viewport meta tag included
✅ **No duplicate schemas** - One Organization + WebSite per page

## Common Issues & Solutions

### Issue: Meta tags not visible in DOM

**Solution**: Meta tags are in HTML source, not added to DOM. Use `curl` or "View Page Source" to verify, not DevTools Inspector.

### Issue: OG image not appearing on social media

**Solution**: Ensure og:image uses absolute HTTPS URL starting with `https://fortunahub.io/`.

### Issue: JSON-LD validation errors

**Solution**: Run `npm run validate-seo` to catch errors before deployment. Check for:
- Unescaped quotes in strings
- Duplicate @type values
- Missing @context
- Invalid JSON syntax

### Issue: Pages return 404

**Solution**: Verify HTML files exist at correct paths in dist/:
- `/` → `dist/index.html`
- `/privacy` → `dist/privacy/index.html`
- `/features` → `dist/features/index.html`

## Deployment Notes

### GitHub Pages

Pre-rendered HTML works seamlessly on GitHub Pages:
- Each route maps to a directory with index.html
- HTTPS required for og:image validation
- 404.html fallback handles unknown routes

### Static Hosting (Netlify, Vercel, AWS S3)

- Ensure `public/sitemap.xml` is deployed
- Ensure `public/robots.txt` is deployed
- Set cache headers appropriately (use fingerprinting for assets)

### CDN Considerations

- HTML files have shorter cache TTL (allow re-crawling)
- Static assets (js, css, images) can have long cache

## Future Enhancements

- [ ] Add BreadcrumbList schema for docs pages
- [ ] Add Article schema for blog posts (if added)
- [ ] Add structured data for people/team members
- [ ] Add support for dynamic OG images (pre-generated at build time)
- [ ] Add JSON feed for document feeds
- [ ] Monitor Core Web Vitals and adjust pre-rendering if needed

## References

- [schema.org Organization Type](https://schema.org/Organization)
- [schema.org WebSite Type](https://schema.org/WebSite)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Google Search Central - Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
