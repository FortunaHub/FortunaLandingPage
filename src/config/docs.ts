export const DOC_SLUGS = [
  'overview',
  'components',
  'getting-started',
  'user-guide',
  'use-cases',
  'architecture',
  'deployment',
  'api',
  'security',
  'troubleshooting',
] as const;
export type DocSlug = (typeof DOC_SLUGS)[number];

export interface DocMeta {
  slug: DocSlug;
  title: string;
  icon: 'Terminal' | 'Layers' | 'Rocket' | 'FileCode' | 'BookOpen' | 'Cpu' | 'ShieldCheck' | 'Wrench';
}

export const DOC_META: DocMeta[] = [
  { slug: 'overview', title: 'Overview', icon: 'BookOpen' },
  { slug: 'components', title: 'Components', icon: 'Cpu' },
  { slug: 'getting-started', title: 'Getting Started', icon: 'Terminal' },
  { slug: 'user-guide', title: 'User Guide', icon: 'BookOpen' },
  { slug: 'use-cases', title: 'Use Cases', icon: 'Layers' },
  { slug: 'architecture', title: 'Architecture', icon: 'Layers' },
  { slug: 'deployment', title: 'Deployment', icon: 'Rocket' },
  { slug: 'api', title: 'API Reference', icon: 'FileCode' },
  { slug: 'security', title: 'Security', icon: 'ShieldCheck' },
  { slug: 'troubleshooting', title: 'Troubleshooting', icon: 'Wrench' },
];
