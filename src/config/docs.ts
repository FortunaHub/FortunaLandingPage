export const DOC_SLUGS = ['overview', 'components', 'getting-started', 'architecture', 'deployment', 'api'] as const;
export type DocSlug = (typeof DOC_SLUGS)[number];

export interface DocMeta {
  slug: DocSlug;
  title: string;
  icon: 'Terminal' | 'Layers' | 'Rocket' | 'FileCode' | 'BookOpen' | 'Cpu';
}

export const DOC_META: DocMeta[] = [
  { slug: 'overview', title: 'Overview', icon: 'BookOpen' },
  { slug: 'components', title: 'Components', icon: 'Cpu' },
  { slug: 'getting-started', title: 'Getting Started', icon: 'Terminal' },
  { slug: 'architecture', title: 'Architecture', icon: 'Layers' },
  { slug: 'deployment', title: 'Deployment', icon: 'Rocket' },
  { slug: 'api', title: 'API Reference', icon: 'FileCode' },
];
