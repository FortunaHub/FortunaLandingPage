/**
 * Static SEO Pre-rendering Script
 * 
 * Generates static HTML files for all public routes with:
 * - Real meta tags in HTML source (not DOM)
 * - Absolute Open Graph URLs
 * - JSON-LD structured data
 * - HTTP 200 on all routes
 * 
 * Usage: npx tsx scripts/prerender-seo.ts
 */

import fs from 'fs';
import path from 'path';

// SEO configuration (mirrors src/config/seo.ts)
const SITE_URL = 'https://fortunahub.dev';

interface SeoMeta {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}

const SEO_ROUTES: Record<string, SeoMeta> = {
  home: {
    title: 'FortunaHub - Kubernetes Risk Operations Platform',
    description:
      'Prioritize Kubernetes security findings with unified risk scores. SBOM/CVE evidence, attack paths, identity context, observed network traffic, and optional runtime signals.',
    path: '/',
    ogImage: 'dashboard-overview.png',
  },
  features: {
    title: 'Capabilities - FortunaHub Kubernetes Security',
    description:
      'Explore FortunaHub features: SBOM/CVE matching, attack path analysis, RBAC context, observed network activity, policy rules, runtime health, and unified risk scoring.',
    path: '/features',
    ogImage: 'risk-operations.png',
  },
  about: {
    title: 'About FortunaHub - Kubernetes Risk Management',
    description:
      'Learn about FortunaHub, the open-source Kubernetes risk operations platform built for security teams operating real workloads across multiple clusters.',
    path: '/about',
    ogImage: 'attack-path-analysis.png',
  },
  privacy: {
    title: 'Privacy Policy - FortunaHub',
    description:
      'FortunaHub privacy policy: how we handle your data, what information we collect, your rights, and our commitment to transparency.',
    path: '/privacy',
  },
  terms: {
    title: 'Terms of Service - FortunaHub',
    description:
      'FortunaHub terms of service: license rights, open source software, user conduct, liability, and governing law.',
    path: '/terms',
  },
  docs: {
    title: 'Documentation - FortunaHub Kubernetes Risk Operations',
    description:
      'Complete documentation for Fortuna: quickstart, deployment, architecture, components, API, security, and troubleshooting guides.',
    path: '/docs',
  },
  docs_overview: {
    title: 'Fortuna Documentation - Platform Overview',
    description:
      'Fortuna platform overview: surfaces, components, multi-cluster support, and optional features for Kubernetes security and risk operations.',
    path: '/docs/overview',
  },
  docs_components: {
    title: 'Fortuna Components - Architecture & Deployment',
    description:
      'Fortuna components: Core, Agent, Dashboard, PostgreSQL, NATS, and optional runtime sensors. Architecture, roles, and data ownership.',
    path: '/docs/components',
  },
  docs_getting_started: {
    title: 'Fortuna Getting Started - Quick Install & Setup',
    description:
      'Quick install guide for Fortuna: clone repository, deploy from images, configure environment, access dashboard, and add remote clusters.',
    path: '/docs/getting-started',
  },
  docs_user_guide: {
    title: 'Fortuna User Guide - Dashboard & Operations',
    description:
      'User guide for FortunaHub dashboard: access, roles, cluster scope, navigation, findings triage, attack paths, and inventory review.',
    path: '/docs/user-guide',
  },
  docs_use_cases: {
    title: 'Fortuna Use Cases - Scenarios & Workflows',
    description:
      'Real use cases and workflows: confirm platform health, triage findings, investigate attack paths, review pod posture, verify runtime network, audit policies.',
    path: '/docs/use-cases',
  },
  docs_architecture: {
    title: 'Fortuna Architecture - System Design & Data Flow',
    description:
      'Architecture overview: logical design, data ownership, cluster identity, UI state contracts, runtime visibility states, and multi-cluster topology.',
    path: '/docs/architecture',
  },
  docs_deployment: {
    title: 'Fortuna Deployment - Production Setup & Configuration',
    description:
      'Deployment guide: reference manifests, local rebuild, published images, production inputs, CVE/runtime data, multi-cluster, and post-deploy checks.',
    path: '/docs/deployment',
  },
  docs_api: {
    title: 'Fortuna API - REST & gRPC Endpoints',
    description:
      'API documentation: public endpoints, authentication, domain route groups, important contracts, and API error handling.',
    path: '/docs/api',
  },
  docs_security: {
    title: 'Fortuna Security - Authentication & Deployment Security',
    description:
      'Security guide: authentication, default admin, secrets and mTLS, repository hygiene, and production security best practices.',
    path: '/docs/security',
  },
  docs_troubleshooting: {
    title: 'Fortuna Troubleshooting - Common Issues & Solutions',
    description:
      'Troubleshooting guide: long builds, CVE catalog, default admin issues, images/DNS/runtime, and debugging failing deployments.',
    path: '/docs/troubleshooting',
  },
};

const SCHEMA_ORG = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FortunaHub',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      'Kubernetes risk operations platform connecting SBOM/CVE evidence, attack paths, identity context, and runtime visibility.',
    sameAs: ['https://github.com/FortunaHub/fortuna'],
  },
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FortunaHub',
    url: SITE_URL,
  },
};

/**
 * Generate canonical URL
 */
function getCanonicalUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

/**
 * Get absolute OG image URL
 */
function getOgImageUrl(imagePath?: string): string {
  if (!imagePath) return `${SITE_URL}/logo.png`;
  return `${SITE_URL}/images/${imagePath}`;
}

/**
 * Generate HTML template with embedded SEO metadata
 */
function generateHtmlWithMetadata(route: SeoMeta): string {
  const canonical = getCanonicalUrl(route.path);
  const ogImage = getOgImageUrl(route.ogImage);
  const ogTitle = route.title;
  const ogDescription = route.description;

  const organizationSchema = JSON.stringify(SCHEMA_ORG.organization);
  const websiteSchema = JSON.stringify(SCHEMA_ORG.website);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(route.title)}</title>
    <meta name="description" content="${escapeHtml(route.description)}" />
    <meta name="robots" content="index, follow" />

    <!-- Favicon & Icons -->
    <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="/logo.png" sizes="192x192" />
    <link rel="apple-touch-icon" href="/logo.png" />

    <!-- Canonical URL (absolute) -->
    <link rel="canonical" href="${canonical}" />

    <!-- Open Graph / Social Sharing -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(ogTitle)}" />
    <meta property="og:description" content="${escapeHtml(ogDescription)}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:alt" content="Fortuna - Kubernetes Security & Risk Management" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:site_name" content="FortunaHub" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(ogTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(ogDescription)}" />
    <meta name="twitter:image" content="${ogImage}" />
    <meta name="twitter:site" content="@FortunaHub" />

    <!-- SEO and Sitemap -->
    <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
${organizationSchema}
    </script>
    <script type="application/ld+json">
${websiteSchema}
    </script>

    <!-- Preload critical assets -->
    <link rel="preload" href="/logo.png" as="image" />
  </head>
  <body>
    <div id="root"></div>
    <noscript>This site requires JavaScript to run properly.</noscript>
    <!-- Note: Script tag is injected by the 404.html fallback to root.tsx via React Router -->
    <!-- The actual JS module is loaded by the SPA router when this route is accessed via /#/path -->
  </body>
</html>`;
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Create directory if it doesn't exist
 */
function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Generate static HTML files for all routes
 */
function prerenderStaticHtml(): void {
  const distDir = path.resolve(process.cwd(), 'dist');

  console.log('\n=== Static SEO Pre-rendering ===\n');
  console.log(`Generating static HTML with SEO metadata...\n`);

  // Extract script tag and stylesheet link from Vite-built index.html (before we overwrite it)
  const vitIndexPath = path.join(distDir, 'index.html');
  let scriptTag = '';
  let stylesheetLink = '';
  
  if (fs.existsSync(vitIndexPath)) {
    const viteContent = fs.readFileSync(vitIndexPath, 'utf-8');
    
    // Extract stylesheet link
    const styleMatch = viteContent.match(/<link[^>]*rel="stylesheet"[^>]*>/);
    if (styleMatch) {
      stylesheetLink = styleMatch[0];
      console.log(`✓ Extracted Vite stylesheet: ${stylesheetLink}`);
    }
    
    // Extract script tag
    const scriptMatch = viteContent.match(/<script type="module"[^>]*><\/script>/);
    if (scriptMatch) {
      scriptTag = scriptMatch[0];
      console.log(`✓ Extracted Vite script tag: ${scriptTag}\n`);
    }
  }

  const results: Array<{ path: string; file: string; status: string }> = [];

  Object.entries(SEO_ROUTES).forEach(([key, route]) => {
    let html = generateHtmlWithMetadata(route);

    // Inject stylesheet link and script tag before closing body if we have them
    let injections = '';
    if (stylesheetLink) {
      injections += `    ${stylesheetLink}\n`;
    }
    if (scriptTag) {
      injections += `    ${scriptTag}\n`;
    }
    
    if (injections) {
      html = html.replace('  </body>', `${injections}  </body>`);
    }

    // Determine file path
    let filePath: string;
    if (route.path === '/') {
      filePath = path.join(distDir, 'index.html');
    } else {
      // Create directory structure: /features → dist/features/index.html
      const dirPath = path.join(distDir, route.path);
      ensureDir(dirPath);
      filePath = path.join(dirPath, 'index.html');
    }

    // Write file
    try {
      fs.writeFileSync(filePath, html, 'utf-8');
      results.push({
        path: route.path,
        file: filePath.replace(process.cwd(), '.'),
        status: '✓',
      });
    } catch (err) {
      results.push({
        path: route.path,
        file: filePath.replace(process.cwd(), '.'),
        status: `✗ Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
      });
    }
  });

  // Print results
  console.log('Generated files:\n');
  results.forEach((r) => {
    console.log(`${r.status} ${r.path.padEnd(20)} → ${r.file}`);
  });

  const successCount = results.filter((r) => r.status === '✓').length;
  console.log(`\n✓ Pre-rendered ${successCount}/${Object.keys(SEO_ROUTES).length} routes\n`);

  if (successCount !== Object.keys(SEO_ROUTES).length) {
    process.exit(1);
  }
}

/**
 * Verify pre-rendered HTML contains all required SEO tags
 */
function verifyPrerenderedHtml(): void {
  const distDir = path.resolve(process.cwd(), 'dist');

  console.log('\n=== Verification: HTML Source SEO Tags ===\n');

  const verifications: Array<{ file: string; checks: Record<string, boolean> }> = [];

  Object.values(SEO_ROUTES).forEach((route) => {
    let filePath: string;
    if (route.path === '/') {
      filePath = path.join(distDir, 'index.html');
    } else {
      filePath = path.join(distDir, route.path, 'index.html');
    }

    if (!fs.existsSync(filePath)) {
      console.log(`⚠ File not found: ${filePath}`);
      return;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const checks = {
      hasTitle: /<title>.*?<\/title>/.test(content),
      hasMetaDescription: /meta name="description"/.test(content),
      hasCanonical: /link rel="canonical".*href="https:\/\/fortunahub\.dev/.test(content),
      hasOgTitle: /property="og:title"/.test(content),
      hasOgDescription: /property="og:description"/.test(content),
      hasOgImage: /property="og:image"/.test(content),
      hasOgUrl: /property="og:url".*content="https:\/\/fortunahub\.dev/.test(content),
      hasJsonLd: /script type="application\/ld\+json"/.test(content),
      hasOrganizationSchema: /"@type":\s*"Organization"/.test(content),
      hasWebsiteSchema: /"@type":\s*"WebSite"/.test(content),
    };

    verifications.push({
      file: route.path,
      checks,
    });
  });

  // Print verification results
  verifications.forEach((v) => {
    console.log(`\n📄 ${v.file || '/'}`);
    Object.entries(v.checks).forEach(([check, pass]) => {
      const icon = pass ? '✅' : '❌';
      const label = check
        .replace(/^has/, '')
        .replace(/([A-Z])/g, ' $1')
        .trim();
      console.log(`  ${icon} ${label}`);
    });
  });

  // Summary
  const allPassed = verifications.every((v) =>
    Object.values(v.checks).every((check) => check)
  );

  const totalChecks = verifications.length * Object.keys(verifications[0]?.checks || {}).length;
  const passedChecks = verifications.reduce(
    (acc, v) => acc + Object.values(v.checks).filter(Boolean).length,
    0
  );

  console.log(`\n${allPassed ? '✓' : '⚠'} Verification: ${passedChecks}/${totalChecks} checks passed\n`);

  return;
}

/**
 * Main execution
 */
function main(): void {
  try {
    prerenderStaticHtml();
    verifyPrerenderedHtml();
    console.log('✓ Static SEO pre-rendering complete!\n');
  } catch (err) {
    console.error(
      '\n✗ Error during pre-rendering:',
      err instanceof Error ? err.message : String(err)
    );
    process.exit(1);
  }
}

main();
