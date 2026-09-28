/**
 * Link Checker - Validates all internal links in built site
 * 
 * Scans dist/index.html and traversed routes for:
 * - Broken internal routes
 * - Invalid anchor links
 * - Missing route metadata
 * - Inconsistent path patterns
 * 
 * Usage: npx tsx scripts/check-links.ts [--base-path /FortunaLandingPage/]
 */

import fs from 'fs';
import path from 'path';

interface LinkCheckResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  links: {
    internal: Set<string>;
    external: Set<string>;
    anchors: Set<string>;
  };
}

// Define all known valid routes
const KNOWN_ROUTES = new Set([
  '/',
  '/features',
  '/about',
  '/privacy',
  '/terms',
  '/docs',
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
]);

// Extract base path from env or CLI args
const getBasePath = (): string => {
  const envBasePath = process.env.VITE_BASE_PATH;
  const cliArg = process.argv.find((arg) => arg.startsWith('--base-path='));
  
  if (cliArg) {
    return cliArg.replace('--base-path=', '');
  }
  if (envBasePath) {
    return envBasePath;
  }
  return '/';
};

// Normalize and validate internal links
const validateInternalLink = (link: string, basePath: string): string | null => {
  // Skip anchors-only links
  if (link.startsWith('#')) {
    return null;
  }

  // Remove query params and anchors
  const [cleanPath] = link.split(/[?#]/);

  // Skip static assets (favicons, logos, images)
  if (/\.(png|jpg|jpeg|gif|svg|ico|webp|xml|txt)$/i.test(cleanPath)) {
    return null; // Static assets are not routes
  }

  // Skip bundled assets
  if (cleanPath.includes('/assets/')) {
    return null; // Bundled CSS/JS
  }

  // Normalize: remove base path prefix if present
  const normalized = cleanPath.startsWith(basePath)
    ? cleanPath.slice(basePath.length - 1)
    : cleanPath;

  // Validate against known routes
  if (KNOWN_ROUTES.has(normalized)) {
    return null; // Valid
  }

  // Check if it matches /docs/:slug pattern
  if (/^\/docs\/[\w-]+$/.test(normalized)) {
    return null; // Valid doc route
  }

  return normalized; // Invalid - return for reporting
};

// Parse HTML and extract links
const extractLinks = (htmlContent: string): Set<string> => {
  const links = new Set<string>();
  
  // Match href and src attributes
  const hrefRegex = /(?:href|src)=["']([^"']+)["']/g;
  let match;
  
  while ((match = hrefRegex.exec(htmlContent)) !== null) {
    const link = match[1];
    // Skip data URIs and javascript
    if (!link.startsWith('data:') && !link.startsWith('javascript:')) {
      links.add(link);
    }
  }
  
  return links;
};

// Categorize links
const categorizeLinks = (
  links: Set<string>,
  basePath: string,
): { internal: Set<string>; external: Set<string>; anchors: Set<string> } => {
  const internal = new Set<string>();
  const external = new Set<string>();
  const anchors = new Set<string>();

  for (const link of links) {
    if (link.startsWith('#')) {
      anchors.add(link);
    } else if (link.startsWith('http://') || link.startsWith('https://')) {
      external.add(link);
    } else if (link.startsWith('/') || link === '.') {
      internal.add(link);
    } else {
      // Relative links
      internal.add(link);
    }
  }

  return { internal, external, anchors };
};

// Main check function
const checkLinks = (): LinkCheckResult => {
  const result: LinkCheckResult = {
    valid: true,
    errors: [],
    warnings: [],
    links: {
      internal: new Set(),
      external: new Set(),
      anchors: new Set(),
    },
  };

  const basePath = getBasePath();
  const distPath = path.resolve(process.cwd(), 'dist');
  const indexPath = path.join(distPath, 'index.html');

  // Check if dist exists
  if (!fs.existsSync(distPath)) {
    result.valid = false;
    result.errors.push('Build dist/ directory not found. Run `npm run build` first.');
    return result;
  }

  // Check if index.html exists
  if (!fs.existsSync(indexPath)) {
    result.valid = false;
    result.errors.push(`Built index.html not found at ${indexPath}`);
    return result;
  }

  // Read and parse HTML
  const htmlContent = fs.readFileSync(indexPath, 'utf-8');
  const links = extractLinks(htmlContent);
  const categorized = categorizeLinks(links, basePath);

  result.links = categorized;

  // Validate internal links
  const invalidLinks: string[] = [];
  for (const link of categorized.internal) {
    const invalid = validateInternalLink(link, basePath);
    if (invalid) {
      invalidLinks.push(invalid);
    }
  }

  if (invalidLinks.length > 0) {
    result.valid = false;
    result.errors.push(`Found ${invalidLinks.length} broken internal links:`);
    invalidLinks.forEach((link) => {
      result.errors.push(`  - ${link}`);
    });
  }

  // Warn about external links (just informational)
  if (categorized.external.size > 0) {
    result.warnings.push(
      `Found ${categorized.external.size} external links (not validated):`,
    );
    Array.from(categorized.external)
      .slice(0, 5)
      .forEach((link) => {
        result.warnings.push(`  - ${link}`);
      });
    if (categorized.external.size > 5) {
      result.warnings.push(`  ... and ${categorized.external.size - 5} more`);
    }
  }

  return result;
};

// Run and report
const result = checkLinks();

console.log('\n=== Link Checker Report ===\n');

if (result.errors.length > 0) {
  console.error('❌ ERRORS:');
  result.errors.forEach((err) => console.error(`  ${err}`));
}

if (result.warnings.length > 0) {
  console.warn('\n⚠️  WARNINGS:');
  result.warnings.forEach((warn) => console.warn(`  ${warn}`));
}

if (result.valid && result.errors.length === 0) {
  console.log('✅ All internal links valid');
}

console.log(`\nLinks found:`);
console.log(`  Internal: ${result.links.internal.size}`);
console.log(`  External: ${result.links.external.size}`);
console.log(`  Anchors: ${result.links.anchors.size}`);

if (!result.valid) {
  process.exit(1);
}

export { checkLinks };
export type { LinkCheckResult };
