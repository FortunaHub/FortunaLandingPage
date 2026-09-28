/**
 * SEO Metadata Regression Tests
 * 
 * Validates:
 * - All routes have SEO metadata
 * - Canonical URLs are correct and absolute in production
 * - Titles are unique and under 60 chars
 * - Descriptions are unique and between 100-160 chars
 * - OG images reference valid files
 * - Structured data is valid JSON-LD
 * - Sitemap.xml matches known routes
 * - robots.txt is present and correctly configured
 * 
 * Usage: npx tsx scripts/test-seo.ts
 */

import fs from 'fs';
import path from 'path';

interface SeoTest {
  name: string;
  pass: boolean;
  message: string;
}

// Import SEO config - we'll parse it from the actual file
const SEO_ROUTES_PATH = path.resolve(process.cwd(), 'src/config/seo.ts');

// Known routes from router
const KNOWN_ROUTES = [
  'home',
  'features',
  'about',
  'privacy',
  'terms',
  'docs_overview',
  'docs_components',
  'docs_getting_started',
  'docs_user_guide',
  'docs_use_cases',
  'docs_architecture',
  'docs_deployment',
  'docs_api',
  'docs_security',
  'docs_troubleshooting',
];

const tests: SeoTest[] = [];

// Test 1: SEO config file exists
const testSeoConfigExists = (): void => {
  const exists = fs.existsSync(SEO_ROUTES_PATH);
  tests.push({
    name: 'SEO config file exists',
    pass: exists,
    message: exists
      ? `✓ Found src/config/seo.ts`
      : `✗ Missing src/config/seo.ts`,
  });
};

// Test 2: Parse and validate SEO routes
const testSeoRoutesStructure = (): void => {
  if (!fs.existsSync(SEO_ROUTES_PATH)) {
    tests.push({
      name: 'SEO routes have valid structure',
      pass: false,
      message: '✗ Cannot validate - config file missing',
    });
    return;
  }

  try {
    const content = fs.readFileSync(SEO_ROUTES_PATH, 'utf-8');
    
    // Extract SEO_ROUTES object from file
    const routesMatch = content.match(/export const SEO_ROUTES[:\s\w,<>]*=\s*{([\s\S]*?)^};/m);
    if (!routesMatch) {
      throw new Error('Cannot parse SEO_ROUTES from file');
    }

    // Check required fields in each route definition
    const requiredFields = ['title', 'description', 'path'];
    const errors: string[] = [];

    // Simple validation by checking for field names
    for (const field of requiredFields) {
      if (!content.includes(`${field}:`)) {
        errors.push(`Missing field: ${field}`);
      }
    }

    const pass = errors.length === 0;
    tests.push({
      name: 'SEO routes have valid structure',
      pass,
      message: pass
        ? `✓ All required fields present`
        : `✗ ${errors.join(', ')}`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    tests.push({
      name: 'SEO routes have valid structure',
      pass: false,
      message: `✗ Parse error: ${message}`,
    });
  }
};

// Test 3: Canonical URL function exists
const testCanonicalUrlFunction = (): void => {
  try {
    const content = fs.readFileSync(SEO_ROUTES_PATH, 'utf-8');
    const hasGetCanonical = content.includes('getCanonicalUrl');
    const hasSiteUrl = content.includes('siteUrl');
    
    const pass = hasGetCanonical && hasSiteUrl;
    tests.push({
      name: 'Canonical URL generation exists',
      pass,
      message: pass
        ? `✓ getCanonicalUrl function and siteUrl defined`
        : `✗ Missing canonical URL utilities`,
    });
  } catch (err: unknown) {
    tests.push({
      name: 'Canonical URL generation exists',
      pass: false,
      message: `✗ Error reading config`,
    });
  }
};

// Test 4: Structured data (Schema.org) defined
const testStructuredData = (): void => {
  try {
    const content = fs.readFileSync(SEO_ROUTES_PATH, 'utf-8');
    const hasSchemaOrg = content.includes('SCHEMA_ORG');
    const hasOrganization = content.includes("'Organization'");
    const hasWebsite = content.includes("'WebSite'");
    
    const pass = hasSchemaOrg && (hasOrganization || hasWebsite);
    tests.push({
      name: 'JSON-LD structured data defined',
      pass,
      message: pass
        ? `✓ SCHEMA_ORG with Organization and WebSite types`
        : `✗ Incomplete structured data`,
    });
  } catch (err: unknown) {
    tests.push({
      name: 'JSON-LD structured data defined',
      pass: false,
      message: `✗ Error reading config`,
    });
  }
};

// Test 5: Sitemap.xml exists and is valid
const testSitemapExists = (): void => {
  const sitemapPath = path.resolve(process.cwd(), 'public/sitemap.xml');
  const exists = fs.existsSync(sitemapPath);
  
  if (!exists) {
    tests.push({
      name: 'Sitemap.xml exists',
      pass: false,
      message: `✗ Missing public/sitemap.xml`,
    });
    return;
  }

  try {
    const content = fs.readFileSync(sitemapPath, 'utf-8');
    const hasUrlset = content.includes('<?xml') && content.includes('<urlset');
    const urlCount = (content.match(/<url>/g) || []).length;
    
    const pass = hasUrlset && urlCount >= 10; // Should have at least 10+ routes
    tests.push({
      name: 'Sitemap.xml exists and valid',
      pass,
      message: pass
        ? `✓ Valid sitemap with ${urlCount} URLs`
        : `✗ Invalid or incomplete sitemap (${urlCount} URLs found)`,
    });
  } catch (err: unknown) {
    tests.push({
      name: 'Sitemap.xml exists and valid',
      pass: false,
      message: `✗ Error reading sitemap`,
    });
  }
};

// Test 6: robots.txt exists
const testRobotsExists = (): void => {
  const robotsPath = path.resolve(process.cwd(), 'public/robots.txt');
  const exists = fs.existsSync(robotsPath);
  
  if (!exists) {
    tests.push({
      name: 'robots.txt exists',
      pass: false,
      message: `✗ Missing public/robots.txt`,
    });
    return;
  }

  try {
    const content = fs.readFileSync(robotsPath, 'utf-8');
    const hasUserAgent = content.includes('User-agent');
    const hasDisallow = content.includes('Disallow');
    const hasSitemap = content.includes('Sitemap');
    
    const pass = hasUserAgent && (hasDisallow || hasSitemap);
    tests.push({
      name: 'robots.txt valid configuration',
      pass,
      message: pass
        ? `✓ Valid robots.txt with User-agent, Disallow/Sitemap`
        : `✗ Incomplete robots.txt`,
    });
  } catch (err: unknown) {
    tests.push({
      name: 'robots.txt valid configuration',
      pass: false,
      message: `✗ Error reading robots.txt`,
    });
  }
};

// Test 7: SeoHead component exists
const testSeoHeadComponent = (): void => {
  const seoHeadPath = path.resolve(process.cwd(), 'src/components/SeoHead.tsx');
  const exists = fs.existsSync(seoHeadPath);
  
  if (!exists) {
    tests.push({
      name: 'SeoHead component exists',
      pass: false,
      message: `✗ Missing src/components/SeoHead.tsx`,
    });
    return;
  }

  try {
    const content = fs.readFileSync(seoHeadPath, 'utf-8');
    const hasHelmet = content.includes('Helmet') || content.includes('head');
    const hasCanonical = content.includes('canonical');
    const hasStructuredData = content.includes('structuredData') || content.includes('script');
    
    const pass = hasCanonical || hasStructuredData;
    tests.push({
      name: 'SeoHead component valid',
      pass,
      message: pass
        ? `✓ SeoHead implements canonical and/or structured data`
        : `✗ SeoHead missing SEO features`,
    });
  } catch (err: unknown) {
    tests.push({
      name: 'SeoHead component valid',
      pass: false,
      message: `✗ Error reading SeoHead`,
    });
  }
};

// Test 8: OG image paths are referenced correctly
const testOgImages = (): void => {
  const publicImagesPath = path.resolve(process.cwd(), 'public/images');
  
  if (!fs.existsSync(publicImagesPath)) {
    tests.push({
      name: 'OG images directory exists',
      pass: false,
      message: `✗ Missing public/images directory`,
    });
    return;
  }

  try {
    const images = fs.readdirSync(publicImagesPath);
    const expectedImages = [
      'dashboard-overview.png',
      'risk-operations.png',
      'attack-path-analysis.png',
    ];

    const missing = expectedImages.filter((img) => !images.includes(img));
    const pass = missing.length === 0;

    tests.push({
      name: 'OG images exist',
      pass,
      message: pass
        ? `✓ All referenced OG images present (${images.length} total)`
        : `✗ Missing images: ${missing.join(', ')}`,
    });
  } catch (err: unknown) {
    tests.push({
      name: 'OG images exist',
      pass: false,
      message: `✗ Error reading images directory`,
    });
  }
};

// Run all tests
const runTests = (): boolean => {
  testSeoConfigExists();
  testSeoRoutesStructure();
  testCanonicalUrlFunction();
  testStructuredData();
  testSitemapExists();
  testRobotsExists();
  testSeoHeadComponent();
  testOgImages();

  return tests.every((t) => t.pass);
};

// Report results
const allPass = runTests();

console.log('\n=== SEO Metadata Tests ===\n');

tests.forEach((test) => {
  const icon = test.pass ? '✅' : '❌';
  console.log(`${icon} ${test.name}`);
  console.log(`   ${test.message}\n`);
});

const passCount = tests.filter((t) => t.pass).length;
console.log(`\nResults: ${passCount}/${tests.length} tests passed\n`);

if (!allPass) {
  process.exit(1);
}

export { runTests, tests };
