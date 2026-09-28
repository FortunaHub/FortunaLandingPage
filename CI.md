# CI & Quality Assurance Documentation

## Overview

PR-5 implements comprehensive CI hardening for the Fortuna Landing Page with automated checks for:

- TypeScript type safety
- Broken internal links
- SEO metadata consistency
- Accessibility compliance
- Product version tracking
- Deployment path stability

## CI Pipeline

### GitHub Actions Workflow

The workflow (`.github/workflows/deploy-gh-pages.yml`) runs on push to `main`:

1. **Checkout** - Clone repository
2. **Setup Node.js** - Use Node 20 with npm caching
3. **Install dependencies** - `npm ci`
4. **Typecheck** - `npm run typecheck`
5. **Build** - `npm run build` (production Vite build)
6. **Check Links** - `npm run check-links` (validates internal routes)
7. **Test SEO** - `npm run test-seo` (metadata regression tests)
8. **Test Accessibility** - `npm run test-a11y` (WCAG AA smoke tests)
9. **Verify asset paths** - Grep dist/index.html for correct path references
10. **Deploy** - Upload to GitHub Pages

### Local Development

Run the full CI suite locally:

```bash
npm run ci
```

This runs:
1. `npm run typecheck`
2. `npm run build`
3. `npm run check-links`
4. `npm run test-seo`
5. `npm run test-a11y`

## Scripts & Checks

### 1. Typecheck

**Script:** `npm run typecheck`  
**Purpose:** Validate TypeScript without emitting code  
**Implementation:** `tsc --noEmit`  
**Merge Criteria:** Must pass in CI

Checks:
- Type errors in all `.ts` and `.tsx` files
- JSX type safety
- React component prop types
- Router path types
- Config file types

**Failure Example:**
```
error TS2345: Argument of type 'string' is not assignable to parameter of type '"home" | "features" | ...'
```

---

### 2. Production Build

**Script:** `npm run build`  
**Purpose:** Create optimized production build  
**Implementation:** `vite build`  
**Merge Criteria:** Must complete without warnings or errors

Artifacts:
- `dist/index.html` - Entry point with all routes
- `dist/404.html` - Copy of index.html for SPA routing on GitHub Pages
- `dist/assets/` - Bundled JS/CSS
- `dist/.version-info.json` - Deployment metadata (added by `track-versions`)

**Environment Variables:**
- `VITE_BASE_PATH` - Subpath if served under domain/repo/ (default: `/`)
- `VITE_ROUTER_BASENAME` - Explicit router basename (optional)
- `VITE_REPOSITORY_NAME` - GitHub repo name for fallback base path

---

### 3. Link Checker

**Script:** `npm run check-links`  
**File:** `scripts/check-links.ts`  
**Purpose:** Validate internal links in built site  
**Merge Criteria:** All internal links must be valid

Validates:
- All `href` attributes match known routes
- All `src` attributes for static assets
- No broken doc routes (e.g., `/docs/invalid-slug`)
- No malformed relative paths

**Known Routes:**
```
/ /features /about /privacy /terms
/docs /docs/:slug (where slug matches documented pages)
/register
```

**Checks:**
- Scans `dist/index.html` for all links
- Categorizes: internal, external, anchors
- Validates internal links against `KNOWN_ROUTES`
- Warns about external links (not validated)

**Failure Example:**
```
❌ ERRORS:
  Found 2 broken internal links:
  - /docs/invalid-page
  - /features/broken
```

---

### 4. SEO Metadata Tests

**Script:** `npm run test-seo`  
**File:** `scripts/test-seo.ts`  
**Purpose:** Regression test SEO configuration  
**Merge Criteria:** All tests must pass

Validates:
- `src/config/seo.ts` structure and completeness
- Canonical URL generation function
- JSON-LD structured data (Schema.org)
- `public/sitemap.xml` existence and validity
- `public/robots.txt` configuration
- `src/components/SeoHead.tsx` implementation
- OG images referenced in seo.ts exist in `public/images/`

**Tests:**

| Test | Validates |
|------|-----------|
| SEO config file exists | `src/config/seo.ts` present |
| Routes have valid structure | title, description, path defined |
| Canonical URL generation | `getCanonicalUrl()` exists, uses absolute URLs in prod |
| JSON-LD structured data | `SCHEMA_ORG` with Organization, WebSite types |
| Sitemap valid | `public/sitemap.xml` has 10+ URLs |
| robots.txt valid | User-agent, Disallow/Sitemap present |
| SeoHead component valid | canonical links and structured data injection |
| OG images exist | dashboard-overview.png, risk-operations.png, etc. |

**Failure Example:**
```
❌ Sitemap.xml exists and valid
   ✗ Invalid or incomplete sitemap (3 URLs found)
```

---

### 5. Accessibility Tests

**Script:** `npm run test-a11y`  
**File:** `scripts/test-a11y.ts`  
**Purpose:** WCAG AA smoke tests  
**Merge Criteria:** No critical or serious violations

Routes tested:
```
/ /features /about /docs/overview
```

Validates (with Playwright + axe-core in full implementation):
- Color contrast ratios (WCAG AA)
- Button accessible names
- Image alt text
- Semantic HTML structure
- Focus management
- ARIA labels and roles
- Keyboard navigation

**Report Includes:**
- Violations by severity (critical, serious, moderate, minor)
- Number of passing checks per route
- Incomplete checks
- Actionable violation descriptions

**Severity Levels:**
- 🔴 **Critical** - Blocks accessibility; fails CI
- 🟠 **Serious** - Major usability issue; warning in CI
- 🟡 **Moderate** - Minor issue; informational only

**Failure Example:**
```
❌ FAILED: Critical accessibility issues found

📄 Route: /features
  🔴 [critical] button-name (2 nodes)
    Ensures buttons have accessible names
```

---

### 6. Version & Source Tracking

**Script:** `npm run track-versions`  
**File:** `scripts/track-versions.ts`  
**Purpose:** Track product version and deployment context  
**Runs After:** Build (automatic in `npm run build`)

Tracks:
- Landing page version (from `package.json`)
- Product name and description
- Build context (BASE_PATH, ROUTER_BASENAME, repo name)
- Git commit and branch (if available)
- Build timestamp
- Deployment environment (CI vs local)
- Node version

**Output:** `dist/.version-info.json`

**Detects:**
- Version drift (landing page version changes)
- Environment changes (CI to production)
- Base path changes (e.g., subpath deployments)
- Stale deployment paths
- Hardcoded paths in build scripts

**Example Output:**
```json
{
  "landingPageVersion": "0.0.0",
  "productName": "FortunaHub",
  "buildContext": {
    "basePath": "/",
    "routerBasename": "",
    "repositoryName": "FortunaLandingPage"
  },
  "buildMetadata": {
    "timestamp": "2026-09-28T14:19:20.069Z",
    "gitCommit": "a1b2c3d4",
    "gitBranch": "main",
    "nodeVersion": "v20.11.0",
    "buildCommand": "build"
  }
}
```

---

## Configuration

### Environment Variables for CI

Set in GitHub repository settings under **Settings > Variables > Repository variables** or **Settings > Secrets and variables > Actions**:

| Variable | Example | Purpose |
|----------|---------|---------|
| `VITE_BASE_PATH` | `/FortunaLandingPage/` | Subpath for GitHub Pages |
| `VITE_ROUTER_BASENAME` | `` | Explicit router base (optional) |
| `VITE_FORMSPREE_ENDPOINT` | `https://formspree.io/f/xyzabc` | Demo form endpoint (secret) |

### Local CI Testing

Run with specific environment:

```bash
# Default (domain root)
npm run ci

# With GitHub Pages subpath
VITE_BASE_PATH=/FortunaLandingPage/ npm run build && npm run check-links

# With custom router basename
VITE_ROUTER_BASENAME=/app npm run build
```

---

## Merge Criteria Checklist

- ✅ `npm run typecheck` passes (TypeScript type safety)
- ✅ `npm run build` succeeds (Production build)
- ✅ `npm run check-links` passes (No broken internal links)
- ✅ `npm run test-seo` passes (Route metadata tested)
- ✅ `npm run test-seo` validates canonical URLs (Canonical URLs tested)
- ✅ `npm run test-seo` validates sitemap.xml and robots.txt
- ✅ `npm run test-a11y` has no critical violations (Accessibility smoke tests)
- ✅ `.version-info.json` generated (Current product version/source trackable)
- ✅ No hardcoded paths in build scripts (Stale deployment paths detected)
- ✅ Documentation content separated in `src/config/docs.ts` (Practical separation)

---

## Troubleshooting

### Link Checker Failures

**"Build dist/ directory not found"**
```bash
npm run build
npm run check-links
```

**"Broken internal links"**
- Check that all links in components match routes in `src/App.tsx`
- Run `npm run check-links` with correct `VITE_BASE_PATH`
- Verify SEO route names in `src/config/seo.ts`

---

### SEO Test Failures

**"SEO config file exists - ✗ Missing src/config/seo.ts"**
- Ensure `src/config/seo.ts` exists with `SEO_ROUTES` export

**"Sitemap.xml not found"**
- Run `npm run build` (sitemap is auto-generated in `scripts/generate-sitemap.js`)
- Check that `public/sitemap.xml` exists

**"robots.txt not found"**
- Ensure `public/robots.txt` exists with proper content

---

### Accessibility Test Failures

**"Critical accessibility issues found"**
- Review the violation list in test output
- Common issues: missing alt text, low color contrast, missing button labels
- Fix in components and re-run `npm run test-a11y`

---

### TypeScript Errors

**"Argument of type is not assignable"**
- Check that values match expected types (especially route paths, SEO keys)
- Run `npm run typecheck` to see full error list

---

## Future Enhancements

1. **Full Playwright Integration** - Replace mock a11y tests with real Playwright + axe-core runs
2. **Performance Budgets** - Add lighthouse CI checks for bundle size and performance
3. **Visual Regression** - Add screenshot diffing for design changes
4. **Link Crawling** - Extend link checker to traverse built site like Lighthouse
5. **Content Validation** - Validate doc content freshness and completeness
6. **Broken External Links** - Optionally validate external links (currently warns only)

---

## Related Issues

- LP-14: Add typecheck, link checking, accessibility tests
- LP-37: SEO metadata regression tests
- LP-38: Version/source tracking
- LP-39: Route metadata testing
- LP-40: Canonical URL testing
- LP-41: Sitemap and robots.txt testing
- LP-42: Accessibility smoke tests

---

## Support

For CI failures:
1. Run `npm run ci` locally to reproduce
2. Check the failing check (typecheck, build, links, SEO, a11y)
3. Fix the underlying issue in source
4. Re-run specific check: `npm run <check-name>`
5. Commit changes and push
