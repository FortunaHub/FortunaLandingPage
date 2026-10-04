import { useEffect } from 'react';
import { getSeoMeta, getStructuredData } from '../config/seo';

interface SeoHeadProps {
  route: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

/**
 * Component to dynamically update document head with SEO metadata
 * Updates title, description, canonical URL, robots, Open Graph tags, and JSON-LD structured data.
 * Mirrors the static tags emitted by scripts/prerender-seo.ts so client navigation stays consistent.
 */
export function SeoHead({
  route,
  ogTitle,
  ogDescription,
  ogImage,
}: SeoHeadProps) {
  useEffect(() => {
    const meta = getSeoMeta(route);
    const title = ogTitle || meta.ogTitle || meta.title;
    const description = ogDescription || meta.ogDescription || meta.description;

    document.title = meta.title;
    updateOrCreateMeta('description', meta.description);
    updateOrCreateMeta('robots', meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');

    // 404 pages must not declare a canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (meta.noindex) {
      canonical?.remove();
    } else {
      const link = canonical ?? document.head.appendChild(document.createElement('link'));
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', meta.canonical);
    }

    const image = ogImage || meta.ogImage || 'logo.png';
    const imageUrl = /^https?:\/\//.test(image) ? image : `https://fortunahub.dev${import.meta.env.BASE_URL}${image === 'logo.png' ? image : `images/${image}`}`;

    updateOrCreateMeta('og:title', title);
    updateOrCreateMeta('og:description', description);
    updateOrCreateMeta('og:url', meta.canonical);
    updateOrCreateMeta('og:image', imageUrl);
    updateOrCreateMeta('og:site_name', 'FortunaHub');
    updateOrCreateMeta('og:type', 'website');
    updateOrCreateMeta('og:locale', 'en_US');

    updateOrCreateMeta('twitter:card', 'summary_large_image');
    updateOrCreateMeta('twitter:title', title);
    updateOrCreateMeta('twitter:description', description);
    updateOrCreateMeta('twitter:image', imageUrl);

    document.querySelectorAll('script[type="application/ld+json"]').forEach((node) => node.remove());
    for (const data of getStructuredData(route, meta, meta.canonical)) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    }
  }, [route, ogTitle, ogDescription, ogImage]);

  return null; // This component only manages head, no render output
}

/**
 * Helper to update or create meta tags
 */
function updateOrCreateMeta(property: string, content: string) {
  const isOpenGraph = property.startsWith('og:');
  const selector = `meta[property="${property}"], meta[name="${property}"]`;

  let meta = document.querySelector(selector);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(isOpenGraph ? 'property' : 'name', property);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}
