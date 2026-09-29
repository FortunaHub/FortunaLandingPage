import { useEffect } from 'react';
import { getSeoMeta, SCHEMA_ORG } from '../config/seo';

interface SeoHeadProps {
  route: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

/**
 * Component to dynamically update document head with SEO metadata
 * Updates title, description, canonical URL, Open Graph tags, and JSON-LD structured data
 */
export function SeoHead({
  route,
  ogTitle,
  ogDescription,
  ogImage,
}: SeoHeadProps) {
  useEffect(() => {
    const meta = getSeoMeta(route);
    
    // Update title
    document.title = meta.title;
    
    // Update or create meta description
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', meta.description);
    
    // Update or create canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', meta.canonical);
    
    const image = ogImage || meta.ogImage || 'logo.png';
    const imageUrl = /^https?:\/\//.test(image) ? image : `https://fortunahub.dev${import.meta.env.BASE_URL}${image === 'logo.png' ? image : `images/${image}`}`;

    // Update Open Graph tags
    updateOrCreateMeta('og:title', ogTitle || meta.ogTitle || meta.title);
    updateOrCreateMeta('og:description', ogDescription || meta.ogDescription || meta.description);
    updateOrCreateMeta('og:url', meta.canonical);
    updateOrCreateMeta('og:image', imageUrl);
    updateOrCreateMeta('og:site_name', 'FortunaHub');
    updateOrCreateMeta('og:type', 'website');
    
    // Update Twitter Card tags
    updateOrCreateMeta('twitter:card', 'summary_large_image');
    updateOrCreateMeta('twitter:title', ogTitle || meta.ogTitle || meta.title);
    updateOrCreateMeta('twitter:description', ogDescription || meta.ogDescription || meta.description);
    updateOrCreateMeta('twitter:image', imageUrl);
  }, [route, ogTitle, ogDescription, ogImage]);

  return null; // This component only manages head, no render output
}

/**
 * Helper to update or create meta tags
 */
function updateOrCreateMeta(property: string, content: string) {
  const isOpenGraph = property.startsWith('og:') || property.startsWith('twitter:');
  const selector = isOpenGraph
    ? `meta[property="${property}"], meta[name="${property}"]`
    : `meta[name="${property}"]`;
  
  let meta = document.querySelector(selector);
  if (!meta) {
    meta = document.createElement('meta');
    const attr = isOpenGraph && property.startsWith('og:') ? 'property' : 'name';
    meta.setAttribute(attr, property);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

/**
 * Add structured data (JSON-LD) to document head
 */
export function addStructuredData(data: Record<string, unknown>) {
  let script = document.querySelector('script[type="application/ld+json"]');
  if (!script) {
    script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

/**
 * Initialize global structured data on page load
 */
export function initializeStructuredData() {
  // Add Organization schema
  addStructuredData(SCHEMA_ORG.organization);
  
  // Add Website schema
  addStructuredData(SCHEMA_ORG.website);
}
