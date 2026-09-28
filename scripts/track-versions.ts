/**
 * Product Version & Source Tracking
 * 
 * Maintains mappings between landing page version, Fortuna product version,
 * and deployment context. Enables detection of stale paths and version drift.
 * 
 * Files tracked:
 * - Landing page version (package.json)
 * - Product version reference (PRODUCT.md)
 * - Deployment environment (CI metadata)
 * - Build context (BASE_PATH, ROUTER_BASENAME)
 * 
 * Usage: npx tsx scripts/track-versions.ts [--json]
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

interface VersionInfo {
  landingPageVersion: string;
  productName: string;
  productDescription: string;
  buildContext: {
    basePath: string;
    routerBasename: string;
    repositoryName: string;
  };
  buildMetadata: {
    timestamp: string;
    gitCommit?: string;
    gitBranch?: string;
    nodeVersion: string;
    buildCommand: string;
  };
  deployment: {
    environment: string;
    targetUrl?: string;
  };
}

// Get Git information
const getGitInfo = (): { commit?: string; branch?: string } => {
  try {
    const commit = execSync('git rev-parse HEAD', { encoding: 'utf-8' }).trim().slice(0, 8);
    const branch = execSync('git rev-parse --abbrev-ref HEAD', {
      encoding: 'utf-8',
    }).trim();
    return { commit, branch };
  } catch (err) {
    return {};
  }
};

// Read version information
const readVersionInfo = (): VersionInfo => {
  const packageJsonPath = path.resolve(process.cwd(), 'package.json');
  const productMdPath = path.resolve(process.cwd(), 'PRODUCT.md');
  const metadataPath = path.resolve(process.cwd(), 'metadata.json');

  // Read package.json
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  // Read PRODUCT.md for product info
  let productInfo = { name: 'FortunaHub', description: '' };
  if (fs.existsSync(productMdPath)) {
    const productContent = fs.readFileSync(productMdPath, 'utf-8');
    const nameMatch = productContent.match(/## (\w+)/);
    if (nameMatch) {
      productInfo.name = nameMatch[1];
    }
  }

  // Read metadata.json for product description
  if (fs.existsSync(metadataPath)) {
    try {
      const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
      if (metadata.description) {
        productInfo.description = metadata.description;
      }
    } catch (err) {
      // Ignore parse errors
    }
  }

  // Get build context from environment
  const basePath = process.env.VITE_BASE_PATH || '/';
  const routerBasename = process.env.VITE_ROUTER_BASENAME || '';
  const repositoryName = process.env.VITE_REPOSITORY_NAME || '';

  // Get Git info
  const gitInfo = getGitInfo();

  // Build timestamp
  const timestamp = new Date().toISOString();

  // Get Node version
  const nodeVersion = process.version;

  // Determine environment
  const environment = process.env.CI ? 'ci' : 'local';
  const targetUrl = process.env.DEPLOYMENT_URL;

  return {
    landingPageVersion: packageJson.version || '0.0.0',
    productName: productInfo.name,
    productDescription: productInfo.description,
    buildContext: {
      basePath,
      routerBasename,
      repositoryName,
    },
    buildMetadata: {
      timestamp,
      gitCommit: gitInfo.commit,
      gitBranch: gitInfo.branch,
      nodeVersion,
      buildCommand: process.env.npm_lifecycle_event || 'unknown',
    },
    deployment: {
      environment,
      targetUrl,
    },
  };
};

// Write version info to file
const writeVersionInfo = (info: VersionInfo): void => {
  const outputPath = path.resolve(process.cwd(), 'dist/.version-info.json');
  
  // Ensure dist directory exists
  const distDir = path.dirname(outputPath);
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(info, null, 2));
};

// Detect version drift
const detectVersionDrift = (): string[] => {
  const warnings: string[] = [];

  const packageJsonPath = path.resolve(process.cwd(), 'package.json');
  const versionInfoPath = path.resolve(process.cwd(), 'dist/.version-info.json');

  if (!fs.existsSync(versionInfoPath)) {
    warnings.push('No previous version info found (.version-info.json)');
    return warnings;
  }

  try {
    const previousInfo = JSON.parse(fs.readFileSync(versionInfoPath, 'utf-8'));
    const currentInfo = readVersionInfo();

    // Check for major version changes
    const prevVersion = previousInfo.landingPageVersion || '0.0.0';
    const currVersion = currentInfo.landingPageVersion || '0.0.0';

    if (prevVersion !== currVersion) {
      warnings.push(
        `Landing page version changed: ${prevVersion} -> ${currVersion}`,
      );
    }

    // Check for environment changes
    if (previousInfo.deployment.environment !== currentInfo.deployment.environment) {
      warnings.push(
        `Deployment environment changed: ${previousInfo.deployment.environment} -> ${currentInfo.deployment.environment}`,
      );
    }

    // Check for base path changes
    if (previousInfo.buildContext.basePath !== currentInfo.buildContext.basePath) {
      warnings.push(
        `Base path changed: ${previousInfo.buildContext.basePath} -> ${currentInfo.buildContext.basePath}`,
      );
    }

    // Check for router basename changes
    if (
      previousInfo.buildContext.routerBasename !==
      currentInfo.buildContext.routerBasename
    ) {
      warnings.push(
        `Router basename changed: ${previousInfo.buildContext.routerBasename} -> ${currentInfo.buildContext.routerBasename}`,
      );
    }
  } catch (err) {
    warnings.push(`Error reading previous version info: ${String(err)}`);
  }

  return warnings;
};

// Validate deployment path stability
const validateDeploymentPaths = (): { valid: boolean; issues: string[] } => {
  const issues: string[] = [];
  const packageJsonPath = path.resolve(process.cwd(), 'package.json');

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    
    // Check if there are deprecated base paths
    const scripts = packageJson.scripts || {};
    const buildScript = scripts.build || '';
    
    // Warn about hardcoded paths in build scripts
    if (buildScript.includes('/FortunaLandingPage/') && !process.env.VITE_BASE_PATH) {
      issues.push(
        'Build script contains hardcoded VITE_BASE_PATH - use environment variable instead',
      );
    }

    return {
      valid: issues.length === 0,
      issues,
    };
  } catch (err) {
    return {
      valid: false,
      issues: [`Error validating deployment paths: ${String(err)}`],
    };
  }
};

// Print version report
const printReport = (info: VersionInfo, drift: string[]): void => {
  console.log('\n=== Version & Source Tracking Report ===\n');

  console.log('Landing Page:');
  console.log(`  Version: ${info.landingPageVersion}`);
  console.log();

  console.log('Product Reference:');
  console.log(`  Name: ${info.productName}`);
  console.log(`  Description: ${info.productDescription.substring(0, 60)}...`);
  console.log();

  console.log('Build Context:');
  console.log(`  Base Path: ${info.buildContext.basePath}`);
  console.log(`  Router Basename: ${info.buildContext.routerBasename || '(none)'}`);
  console.log(`  Repository: ${info.buildContext.repositoryName || '(none)'}`);
  console.log();

  console.log('Build Metadata:');
  console.log(`  Timestamp: ${info.buildMetadata.timestamp}`);
  console.log(`  Git Commit: ${info.buildMetadata.gitCommit || '(unknown)'}`);
  console.log(`  Git Branch: ${info.buildMetadata.gitBranch || '(unknown)'}`);
  console.log(`  Node Version: ${info.buildMetadata.nodeVersion}`);
  console.log();

  console.log('Deployment:');
  console.log(`  Environment: ${info.deployment.environment}`);
  console.log(`  Target URL: ${info.deployment.targetUrl || '(not set)'}`);
  console.log();

  if (drift.length > 0) {
    console.log('⚠️  Version Drift Detected:');
    drift.forEach((d) => console.log(`  - ${d}`));
    console.log();
  }

  const pathValidation = validateDeploymentPaths();
  if (!pathValidation.valid) {
    console.log('⚠️  Path Validation Issues:');
    pathValidation.issues.forEach((issue) => console.log(`  - ${issue}`));
    console.log();
  }
};

// Main - always run when imported as script
const info = readVersionInfo();
const drift = detectVersionDrift();
const outputJson = process.argv.includes('--json');

if (outputJson) {
  console.log(JSON.stringify(info, null, 2));
} else {
  printReport(info, drift);
}

// Write version info to dist if build directory exists
try {
  const distPath = path.resolve(process.cwd(), 'dist');
  if (fs.existsSync(distPath)) {
    writeVersionInfo(info);
    console.log('✅ Version info saved to dist/.version-info.json');
  }
} catch (err) {
  // Silently fail if dist doesn't exist yet
}

// Exit with warning if drift detected
if (drift.length > 0) {
  process.exit(0); // Don't fail, just warn
}

export { readVersionInfo, writeVersionInfo, detectVersionDrift, validateDeploymentPaths };
