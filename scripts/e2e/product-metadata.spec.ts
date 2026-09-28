import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

/**
 * Product Metadata Contract Tests
 * 
 * Validates that all feature claims in landing.ts match current product state:
 * - No roadmap features marked as "current"
 * - Runtime/Falco marked as optional
 * - NetworkPolicy marked as roadmap
 * - Attack Paths disclaimers present
 */

test.describe('Product Metadata Contract', () => {
  test('Feature descriptions do not claim roadmap features as current', async ({ baseURL, page }) => {
    // Read config to verify metadata
    const configPath = path.resolve(process.cwd(), 'src/config/landing.ts');
    const configContent = fs.readFileSync(configPath, 'utf-8');

    // List of roadmap-only features that should not be presented as current
    const roadmapOnlyFeatures = [
      { name: 'NetworkPolicy', marker: 'NetworkPolicy' },
      { name: 'SIEM export', marker: 'SIEM' },
      { name: 'OIDC/SAML', marker: 'OIDC|SAML' },
      { name: 'Advanced federation', marker: 'federation' },
      { name: 'Host/node escape analysis', marker: 'escape.*analysis' },
      { name: 'Lateral movement detection', marker: 'lateral.*movement' },
    ];

    const errors: string[] = [];

    for (const feature of roadmapOnlyFeatures) {
      const featureRegex = new RegExp(feature.marker, 'i');
      
      // Check if feature is mentioned in non-roadmap context
      const featureLines = configContent.split('\n')
        .map((line, idx) => ({ line, idx }))
        .filter(({ line }) => featureRegex.test(line));

      for (const { line } of featureLines) {
        // If it appears in a feature description without roadmap marker, it's a problem
        if (!line.includes('roadmap') && !line.includes('under development') && !line.includes('future')) {
          errors.push(`Found "${feature.name}" without roadmap disclaimer in: ${line.trim()}`);
        }
      }
    }

    if (errors.length > 0) {
      console.error('❌ Roadmap features incorrectly marked as current:');
      errors.forEach(e => console.error(`  ${e}`));
    }

    expect(errors).toHaveLength(0);
  });

  test('Runtime features marked as optional', async () => {
    const configPath = path.resolve(process.cwd(), 'src/config/landing.ts');
    const configContent = fs.readFileSync(configPath, 'utf-8');
    const readmePath = path.resolve(process.cwd(), 'README.md');
    const readmeContent = fs.readFileSync(readmePath, 'utf-8');

    // Find Attack Paths description
    const attackPathsSection = configContent.match(/id:\s*['"]attack-path['"].*?desc:\s*['"]([^'"]+)['"]/s);
    
    if (attackPathsSection) {
      const description = attackPathsSection[1];
      // Should mention "when runtime sensors are enabled" or "optional"
      const hasOptionalMarker = /when.*runtime.*sensors.*enabled|when.*enabled|optional|if.*enabled|runtime.*optional/i.test(description);
      
      if (!hasOptionalMarker) {
        throw new Error('Attack Paths description should clarify that runtime features are optional');
      }
    }

    // Check README for runtime clarity
    expect(readmeContent).toContain('optional');
    expect(readmeContent).toContain('runtime');
  });

  test('NetworkPolicy clearly marked as roadmap', async () => {
    const readmePath = path.resolve(process.cwd(), 'README.md');
    const readmeContent = fs.readFileSync(readmePath, 'utf-8');

    // Should explicitly state NetworkPolicy is roadmap
    const hasNetworkPolicyRoadmap = /NetworkPolicy.*roadmap|NetworkPolicy.*drift.*roadmap|roadmap.*NetworkPolicy/i.test(readmeContent);
    
    if (!hasNetworkPolicyRoadmap) {
      throw new Error('README should clearly mark NetworkPolicy as roadmap item');
    }
  });

  test('Attack Paths disclaimers present', async ({ baseURL, page }) => {
    await page.goto(`${baseURL}/features`);

    // Find Attack Paths section
    const attackPathsText = await page.locator('text=/Attack.*Path/i').textContent();
    
    if (attackPathsText) {
      // Should mention that certain analysis is in development
      const hasDeveloping = /under development|developing|roadmap/i.test(attackPathsText);
      expect(hasDeveloping).toBeTruthy();
    }
  });

  test('Product integrity: README matches landing.ts', async () => {
    const configPath = path.resolve(process.cwd(), 'src/config/landing.ts');
    const readmePath = path.resolve(process.cwd(), 'README.md');
    
    const configContent = fs.readFileSync(configPath, 'utf-8');
    const readmeContent = fs.readFileSync(readmePath, 'utf-8');

    // Extract feature list from both
    const configFeatures = configContent.match(/title:\s*['"]([^'"]+)['"]/g) || [];
    const readmeFeatures = readmeContent.match(/^#{1,3}\s+(.+)$/gm) || [];

    // Should mention SBOM/CVE in both
    const configHasSBOM = /SBOM|sbom/i.test(configContent);
    const readmeHasSBOM = /SBOM|sbom/i.test(readmeContent);
    
    expect(configHasSBOM && readmeHasSBOM).toBe(true);

    // Should mention Attack Paths in both
    const configHasAttackPaths = /[Aa]ttack.*[Pp]ath/i.test(configContent);
    const readmeHasAttackPaths = /[Aa]ttack.*[Pp]ath/i.test(readmeContent);
    
    expect(configHasAttackPaths && readmeHasAttackPaths).toBe(true);
  });

  test('No self-passing mock tests in scripts', async () => {
    const scriptDir = path.resolve(process.cwd(), 'scripts');
    
    // Old mock test files should not exist
    const mockTestFiles = [
      'test-a11y.ts',
      'check-links.ts', 
      'test-seo.ts'
    ];

    const errors: string[] = [];

    for (const file of mockTestFiles) {
      const filePath = path.join(scriptDir, file);
      
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Check if it's a mock test (contains generateMock, shows PASS without real tests)
        const isMock = content.includes('generateMock') || 
                      (content.includes('console.log') && content.includes('✅ PASSED'));
        
        if (isMock) {
          errors.push(`${file} is a mock test and should be removed or replaced with real tests`);
        }
      }
    }

    // New real test files should exist
    const e2eDir = path.join(scriptDir, 'e2e');
    const hasRealTests = fs.existsSync(e2eDir) && 
                        fs.readdirSync(e2eDir).some(f => f.endsWith('.spec.ts'));

    if (!hasRealTests) {
      errors.push('No real Playwright tests found in scripts/e2e/');
    }

    if (errors.length > 0) {
      console.error('❌ Test integrity issues:');
      errors.forEach(e => console.error(`  ${e}`));
    }

    expect(errors).toHaveLength(0);
  });
});
