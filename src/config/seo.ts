/**
 * SEO metadata configuration for all routes
 * Ensures unique titles, descriptions, canonical URLs, and social metadata
 */

export interface SeoMeta {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

const base = import.meta.env.BASE_URL || '/';
const siteUrl = 'https://fortunahub.dev';

const normalizePath = (path: string) => {
  const normalizedBase = base === '/' ? '' : base.replace(/\/$/, '');
  const normalizedPath = path === '/' ? '' : path;
  return `${normalizedBase}${normalizedPath}`;
};

const getCanonicalUrl = (path: string) => {
  // For development, return relative canonical; for production, return absolute URL
  if (import.meta.env.DEV) {
    return normalizePath(path);
  }
  return `${siteUrl}${normalizePath(path)}`;
};

export const SEO_ROUTES: Record<string, SeoMeta> = {
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
  docs_overview: {
    title: 'Fortuna Documentation - Platform Overview',
    description:
      'Fortuna platform overview: surfaces, components, multi-cluster support, and optional features for Kubernetes security and risk operations.',
    path: '/docs/overview',
  },
  docs_components: {
    title: 'Fortuna Documentation - Architecture & Components',
    description:
      'Learn about Fortuna components: Core, Agent, Dashboard, PostgreSQL, NATS JetStream, and optional runtime sensors. Understand how they work together.',
    path: '/docs/components',
  },
  docs_getting_started: {
    title: 'Getting Started with Fortuna - Installation Guide',
    description:
      'Deploy Fortuna from published images. Environment baseline, local rebuild pipeline, dashboard access, and multi-cluster setup for Kubernetes security operations.',
    path: '/docs/getting-started',
  },
  docs_user_guide: {
    title: 'Fortuna User Guide - Dashboard Navigation',
    description:
      'Navigate Fortuna dashboard. Access, roles, cluster scope, empty states, recommended workflows, and how to verify platform health before trusting findings.',
    path: '/docs/user-guide',
  },
  docs_use_cases: {
    title: 'Fortuna Use Cases - Security Workflows',
    description:
      'Security workflows with Fortuna: platform health confirmation, findings triage, attack path investigation, pod posture review, network verification, and reports.',
    path: '/docs/use-cases',
  },
  docs_architecture: {
    title: 'Fortuna Architecture - Multi-Cluster Design',
    description:
      'Fortuna multi-cluster architecture: single management cluster with remote agents, deployment models, networking requirements, and deployment topology.',
    path: '/docs/architecture',
  },
  docs_deployment: {
    title: 'Fortuna Deployment - Production Configuration',
    description:
      'Deploy Fortuna to production: namespaces, RBAC, storage, networking, security, scalability considerations, and best practices for enterprise deployments.',
    path: '/docs/deployment',
  },
  docs_api: {
    title: 'Fortuna API Reference - REST and gRPC Endpoints',
    description:
      'Fortuna REST API and gRPC endpoints: findings, inventory, rules, reports, and automation integrations for Kubernetes risk operations.',
    path: '/docs/api',
  },
  docs_security: {
    title: 'Fortuna Security - Credentials and Access Control',
    description:
      'Fortuna security: credential management, role-based access control (RBAC), mTLS, network policies, and security best practices for multi-cluster deployments.',
    path: '/docs/security',
  },
  docs_troubleshooting: {
    title: 'Fortuna Troubleshooting - Common Issues & Solutions',
    description:
      'Troubleshoot Fortuna: Agent sync issues, CVE catalog problems, performance optimization, log analysis, and debugging common deployment problems.',
    path: '/docs/troubleshooting',
  },
};

/**
 * Get SEO metadata for a route
 * @param route - Route key from SEO_ROUTES
 * @returns SeoMeta with resolved canonical URL
 */
export function getSeoMeta(route: string): SeoMeta & { canonical: string } {
  const meta = SEO_ROUTES[route];
  if (!meta) {
    console.warn(`SEO route '${route}' not found. Using default.`);
    return {
      title: 'FortunaHub',
      description: 'Kubernetes Risk Operations Platform',
      path: '/',
      canonical: getCanonicalUrl('/'),
    };
  }
  return {
    ...meta,
    canonical: getCanonicalUrl(meta.path),
  };
}

/**
 * Get all canonical URLs for sitemap.xml generation
 */
export function getAllCanonicalUrls(): string[] {
  return Object.values(SEO_ROUTES).map((route) => getCanonicalUrl(route.path));
}

/**
 * JSON-LD structured data configuration
 */
export const SCHEMA_ORG = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FortunaHub',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      'Kubernetes risk operations platform connecting SBOM/CVE evidence, attack paths, identity context, and runtime visibility.',
    sameAs: [
      'https://github.com/FortunaHub/fortuna',
      'https://twitter.com/FortunaHub', // Update with actual Twitter if available
    ],
  },

  softwareApplication: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Fortuna',
    alternateName: 'FortunaHub',
    description:
      'Open-source Kubernetes risk operations platform for security findings, attack path analysis, and unified risk scoring.',
    url: siteUrl,
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'Kubernetes',
    downloadUrl: 'https://github.com/FortunaHub/fortuna',
    license: 'https://github.com/FortunaHub/fortuna/blob/main/LICENSE',
    softwareRequirements: 'Kubernetes 1.20+, containerd or Docker runtime',
    inLanguage: 'en-US',
  },

  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FortunaHub',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  },
};
