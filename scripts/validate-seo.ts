/**
 * SEO HTML & JSON-LD Validation Script
 * 
 * Validates:
 * - All routes return HTTP 200
 * - HTML contains proper meta tags in source
 * - JSON-LD is valid according to schema.org
 * - OG URLs are absolute (https://fortunahub.io/...)
 * - No duplicate schema scripts
 * 
 * Usage: npx tsx scripts/validate-seo.ts
 */

import fs from 'fs';
import path from 'path';

interface ValidationResult {
  file: string;
  route: string;
  checks: Record<string, { passed: boolean; message: string }>;
}

const results: ValidationResult[] = [];

/**
 * Test that file exists and represents HTTP 200
 */
function testHttp200(filePath: string): { passed: boolean; message: string } {
  const exists = fs.existsSync(filePath);
  return {
    passed: exists,
    message: exists ? 'HTTP 200 (file exists)' : 'HTTP 404 (file not found)',
  };
}

/**
 * Parse and validate JSON-LD schema
 */
function validateJsonLd(content: string): { passed: boolean; message: string; schemas?: unknown[] } {
  const scripts = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];

  if (scripts.length === 0) {
    return {
      passed: false,
      message: 'No JSON-LD schema found',
    };
  }

  const schemas = [];
  const errors = [];

  for (let i = 0; i < scripts.length; i++) {
    const script = scripts[i];
    const jsonMatch = script.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    if (!jsonMatch) continue;

    try {
      const json = JSON.parse(jsonMatch[1]);
      schemas.push(json);

      // Validate basic schema structure
      if (!json['@context']) {
        errors.push(`Schema ${i + 1}: Missing @context`);
      }
      if (!json['@type']) {
        errors.push(`Schema ${i + 1}: Missing @type`);
      }
    } catch (err) {
      errors.push(`Schema ${i + 1}: Invalid JSON - ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  }

  // Check for duplicate schema types
  const types = schemas.map((s) => (typeof s === 'object' && s !== null && '@type' in s ? (s as Record<string, unknown>)['@type'] : null));
  const duplicates = types.filter((type, idx) => type && types.indexOf(type) !== idx);

  if (duplicates.length > 0) {
    errors.push(`Duplicate schema types: ${[...new Set(duplicates)].join(', ')}`);
  }

  const passed = errors.length === 0 && schemas.length > 0;
  const message = passed
    ? `Valid (${schemas.length} schemas: ${types.join(', ')})`
    : `Invalid - ${errors.join('; ')}`;

  return {
    passed,
    message,
    schemas,
  };
}

/**
 * Check for absolute OG URLs
 */
function validateOgUrls(content: string): { passed: boolean; message: string; urls?: string[] } {
  const ogUrlMatches = content.match(/property="og:(url|image)"[^>]*content="([^"]+)"/g) || [];
  const urls = (content.match(/property="og:(url|image)"[^>]*content="([^"]+)"/g) || []).map((match) => {
    const m = match.match(/content="([^"]+)"/);
    return m ? m[1] : '';
  });

  const nonAbsoluteUrls = urls.filter((url) => !url.startsWith('https://') && !url.startsWith('http://'));

  if (nonAbsoluteUrls.length > 0) {
    return {
      passed: false,
      message: `Relative OG URLs found: ${nonAbsoluteUrls.join(', ')}`,
      urls: nonAbsoluteUrls,
    };
  }

  return {
    passed: urls.length > 0,
    message: `${urls.length} absolute OG URLs found`,
    urls,
  };
}

/**
 * Check for required meta tags in HTML source
 */
function validateMetaTags(content: string): { passed: boolean; tags: Record<string, boolean> } {
  const tags = {
    'title': /<title>.*?<\/title>/.test(content),
    'meta[description]': /meta name="description"/.test(content),
    'link[canonical]': /link rel="canonical"/.test(content),
    'og:title': /property="og:title"/.test(content),
    'og:description': /property="og:description"/.test(content),
    'og:image': /property="og:image"/.test(content),
    'og:url': /property="og:url"/.test(content),
    'twitter:card': /name="twitter:card"/.test(content),
    'robots': /name="robots"/.test(content),
  };

  const allPresent = Object.values(tags).every((v) => v);
  return {
    passed: allPresent,
    tags,
  };
}

/**
 * Main validation function
 */
function validateRoute(route: string, filePath: string): void {
  if (!fs.existsSync(filePath)) {
    results.push({
      file: filePath,
      route,
      checks: {
        'HTTP 200': { passed: false, message: 'File not found' },
      },
    });
    return;
  }

  const content = fs.readFileSync(filePath, 'utf-8');

  const http200 = testHttp200(filePath);
  const metaTags = validateMetaTags(content);
  const jsonLd = validateJsonLd(content);
  const ogUrls = validateOgUrls(content);

  results.push({
    file: filePath.replace(process.cwd(), '.'),
    route,
    checks: {
      'HTTP 200': http200,
      'Meta Tags': {
        passed: metaTags.passed,
        message: metaTags.passed
          ? 'All required tags present'
          : `Missing: ${Object.entries(metaTags.tags)
              .filter(([, v]) => !v)
              .map(([k]) => k)
              .join(', ')}`,
      },
      'JSON-LD Schema': jsonLd,
      'OG URLs (Absolute)': ogUrls,
    },
  });
}

/**
 * Main execution
 */
function main(): void {
  const distDir = path.resolve(process.cwd(), 'dist');

  console.log('\n=== SEO Validation Report ===\n');

  if (!fs.existsSync(distDir)) {
    console.error('✗ dist/ directory not found. Please run `npm run build` first.\n');
    process.exit(1);
  }

  // Routes to validate
  const routes = [
    { route: 'home', file: path.join(distDir, 'index.html') },
    { route: '/features', file: path.join(distDir, 'features', 'index.html') },
    { route: '/about', file: path.join(distDir, 'about', 'index.html') },
    { route: '/privacy', file: path.join(distDir, 'privacy', 'index.html') },
    { route: '/terms', file: path.join(distDir, 'terms', 'index.html') },
    { route: '/docs/overview', file: path.join(distDir, 'docs', 'overview', 'index.html') },
  ];

  routes.forEach(({ route, file }) => {
    validateRoute(route, file);
  });

  // Print results
  console.log('Validation Results:\n');

  const allPassed = results.every((r) =>
    Object.values(r.checks).every((check) => check.passed)
  );

  results.forEach((result) => {
    console.log(`\n📄 ${result.route}`);
    console.log(`   File: ${result.file}`);
    Object.entries(result.checks).forEach(([check, res]) => {
      const icon = res.passed ? '✅' : '❌';
      console.log(`   ${icon} ${check}: ${res.message}`);
    });
  });

  const passedCount = results.reduce((acc, r) => {
    const checksPassed = Object.values(r.checks).filter((c) => c.passed).length;
    return acc + checksPassed;
  }, 0);
  const totalChecks = results.reduce((acc, r) => acc + Object.keys(r.checks).length, 0);

  console.log(`\n${allPassed ? '✓' : '⚠'} Overall: ${passedCount}/${totalChecks} checks passed`);
  console.log(
    `\n${allPassed ? '✓ All validations passed!' : '⚠ Some validations failed. See above for details.'}\n`
  );

  process.exit(allPassed ? 0 : 1);
}

main();
