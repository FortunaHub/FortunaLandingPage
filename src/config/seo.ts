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
  /** Exclude from search indexes and the sitemap. */
  noindex?: boolean;
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
    title: 'Kubernetes Security Capabilities | FortunaHub',
    description:
      'Explore FortunaHub features: SBOM/CVE matching, attack path analysis, RBAC context, observed network activity, policy rules, runtime health, and unified risk scoring.',
    path: '/features',
    ogImage: 'live-findings-queue.png',
  },
  about: {
    title: 'About Fortuna — Open-Source Kubernetes Security | FortunaHub',
    description:
      'Learn about Fortuna, the open-source Kubernetes risk operations platform that connects workload identity, RBAC, SBOM/CVE, and runtime evidence for security teams.',
    path: '/about',
    ogImage: 'live-rbac-attack-path.png',
  },
  privacy: {
    title: 'Privacy Policy | FortunaHub',
    description:
      'FortunaHub privacy policy: how we handle your data, what information we collect, your rights, and our commitment to transparency.',
    path: '/privacy',
  },
  terms: {
    title: 'Terms of Service | FortunaHub',
    description:
      'FortunaHub terms of service: license rights, open source software, user conduct, liability, and governing law.',
    path: '/terms',
  },
  register: {
    title: 'Request a Fortuna Demo | FortunaHub',
    description:
      'Request a focused Fortuna walkthrough of Kubernetes attack paths, RBAC exposure, SBOM/CVE evidence, and runtime network context for your team.',
    path: '/register',
    ogImage: 'live-rbac-attack-path.png',
  },
  ...Object.fromEntries(DOC_META.map(doc => [
    `docs_${doc.slug.replace(/-/g, '_')}`,
    {
      title: `${doc.title} — Fortuna Docs | FortunaHub`,
      description: doc.description,
      path: `/docs/${doc.slug}`,
      ...(doc.slug === 'first-investigation' ? { ogImage: 'live-rbac-attack-path.png' } : {}),
    },
  ])),
};

/** Metadata for unknown URLs; never emitted into the sitemap. */
export const NOT_FOUND_META: SeoMeta = {
  title: 'Page Not Found | FortunaHub',
  description: 'The page you requested does not exist. Explore Fortuna capabilities, documentation, or the homepage.',
  path: '/404',
  noindex: true,
};

/** Routes that belong in sitemap.xml. */
export const INDEXABLE_ROUTES = Object.values(SEO_ROUTES).filter((route) => !route.noindex);

/**
 * Get SEO metadata for a route
 * @param route - Route key from SEO_ROUTES
 * @returns SeoMeta with resolved canonical URL
 */
export function getSeoMeta(route: string): SeoMeta & { canonical: string } {
  const meta = route === 'notFound' ? NOT_FOUND_META : SEO_ROUTES[route];
  if (!meta) {
    console.warn(`SEO route '${route}' not found. Using default.`);
    return { ...SEO_ROUTES.home, canonical: getCanonicalUrl('/') };
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
  return INDEXABLE_ROUTES.map((route) => getCanonicalUrl(route.path));
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
    license: 'https://www.apache.org/licenses/LICENSE-2.0',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    inLanguage: 'en-US',
    publisher: { '@type': 'Organization', name: 'FortunaHub', url: siteUrl },
  },

  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FortunaHub',
    url: siteUrl,
    inLanguage: 'en-US',
  },
};

/** JSON-LD documents for a route: site-wide entities plus page-specific ones. */
export function getStructuredData(route: string, meta: SeoMeta, canonical: string): Record<string, unknown>[] {
  const data: Record<string, unknown>[] = [SCHEMA_ORG.organization, SCHEMA_ORG.website];
  if (route === 'home') data.push(SCHEMA_ORG.softwareApplication);
  if (route.startsWith('docs_')) {
    data.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Docs', item: `${siteUrl}/docs/overview` },
        { '@type': 'ListItem', position: 3, name: meta.title.split(' — ')[0], item: canonical },
      ],
    });
  }
  return data;
}
