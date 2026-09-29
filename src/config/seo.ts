import { DOC_META } from './docs';

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

const base = import.meta.env?.BASE_URL || '/';
const siteUrl = 'https://fortunahub.dev';

const normalizePath = (path: string) => {
  const normalizedBase = base === '/' ? '' : base.replace(/\/$/, '');
  const normalizedPath = path === '/' ? '' : path;
  return `${normalizedBase}${normalizedPath}`;
};

const getCanonicalUrl = (path: string) => {
  // For development, return relative canonical; for production, return absolute URL
  if (import.meta.env?.DEV) {
    return normalizePath(path);
  }
  return `${siteUrl}${normalizePath(path)}`;
};

export const SEO_ROUTES: Record<string, SeoMeta> = {
  home: {
    title: 'Fortuna — Kubernetes RBAC Attack Paths & Workload Security',
    description:
      'Trace Kubernetes RBAC and ServiceAccount attack paths, connect SBOM/CVE and runtime evidence, inspect workload activity, and prioritize remediation with Fortuna.',
    path: '/',
    ogImage: 'live-rbac-attack-path.png',
  },
  features: {
    title: 'Capabilities - FortunaHub Kubernetes Security',
    description:
      'Explore FortunaHub features: SBOM/CVE matching, attack path analysis, RBAC context, observed network activity, policy rules, runtime health, and unified risk scoring.',
    path: '/features',
    ogImage: 'live-findings-queue.png',
  },
  about: {
    title: 'About FortunaHub - Kubernetes Risk Management',
    description:
      'Learn about FortunaHub, the open-source Kubernetes risk operations platform built for security teams operating real workloads across multiple clusters.',
    path: '/about',
    ogImage: 'live-rbac-attack-path.png',
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
  ...Object.fromEntries(DOC_META.map(doc => [
    `docs_${doc.slug.replace(/-/g, '_')}`,
    {
      title: `${doc.title} — Fortuna Documentation`,
      description: doc.description,
      path: `/docs/${doc.slug}`,
      ...(doc.slug === 'first-investigation' ? { ogImage: 'live-rbac-attack-path.png' } : {}),
    },
  ])),
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
      'https://github.com/shino-337/Fortuna-Community',
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
    downloadUrl: 'https://github.com/shino-337/Fortuna-Community',
    license: 'https://github.com/shino-337/Fortuna-Community/blob/main/LICENSE',
    inLanguage: 'en-US',
  },

  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FortunaHub',
    url: siteUrl,
  },
};
