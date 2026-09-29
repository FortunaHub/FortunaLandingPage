export const DOC_SLUGS = ['overview', 'getting-started', 'first-investigation', 'user-guide', 'architecture', 'deployment', 'security', 'troubleshooting'] as const;
export type DocSlug = (typeof DOC_SLUGS)[number];
export const DOC_ALIASES: Record<string, DocSlug> = {
  components: 'architecture',
  'use-cases': 'user-guide',
  api: 'architecture',
};
export interface DocMeta {
  slug: DocSlug;
  title: string;
  description: string;
  group: 'Start here' | 'Use Fortuna' | 'Operate Fortuna';
  icon: 'Terminal' | 'Layers' | 'Rocket' | 'BookOpen' | 'ShieldCheck' | 'Wrench';
}
export const DOC_META: DocMeta[] = [
  { slug: 'overview', title: 'Overview', description: 'Choose a starting point and understand the evidence Fortuna provides.', group: 'Start here', icon: 'BookOpen' },
  { slug: 'getting-started', title: 'Getting Started', description: 'Prepare a lab, install a matching release, and confirm your first inventory sync.', group: 'Start here', icon: 'Terminal' },
  { slug: 'first-investigation', title: 'First Investigation', description: 'Trace a workload identity to its RBAC grants and verify a remediation decision.', group: 'Use Fortuna', icon: 'ShieldCheck' },
  { slug: 'user-guide', title: 'Dashboard Guide', description: 'Find the right workspace, inspect evidence, and interpret empty or incomplete results.', group: 'Use Fortuna', icon: 'BookOpen' },
  { slug: 'architecture', title: 'Architecture', description: 'Understand the components, evidence flow, and multi-cluster deployment model.', group: 'Operate Fortuna', icon: 'Layers' },
  { slug: 'deployment', title: 'Deployment', description: 'Plan storage, image versions, connectivity, and checks for an operational deployment.', group: 'Operate Fortuna', icon: 'Rocket' },
  { slug: 'security', title: 'Security', description: 'Review Agent access, manage credentials, and protect dashboard and ingest endpoints.', group: 'Operate Fortuna', icon: 'ShieldCheck' },
  { slug: 'troubleshooting', title: 'Troubleshooting', description: 'Diagnose missing workloads, incomplete CVE results, runtime gaps, and deployment failures.', group: 'Operate Fortuna', icon: 'Wrench' },
];
