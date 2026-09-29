export const STRENGTHS = [
  'SBOM & OSV-backed CVE Matching',
  'Unified Risk Scoring',
  'Attack Paths & RBAC Context',
  'Multi-cluster Runtime Telemetry',
] as const;

const slide = (src: string, alt: string) => ({ src, alt });

export const FEATURES = [
  {
    id: 'workload-identity',
    title: 'Workload Identity & RBAC',
    desc: 'What can this workload identity do? Review ServiceAccounts, Roles, ClusterRoles, RoleBindings, dangerous verbs and resources, wildcard permissions, pod security context, and service-account token exposure.',
    tags: ['ServiceAccounts', 'RBAC', 'Permissions'],
    order: 'text' as const,
    slides: [
      slide('live-serviceaccount-identity.png', 'Fortuna identity detail showing ServiceAccount, binding source, and effective Kubernetes RBAC permissions'),
      slide('live-inventory-rbac-pod.png', 'Kubernetes Inventory filtered to workload with identity and RBAC context'),
    ],
  },
  {
    id: 'attack-paths',
    title: 'Attack Paths',
    desc: 'How could this workload gain more access? Follow identity and privilege relationships toward sensitive access. Paths enriched with SBOM/CVE evidence, runtime observations, and network context when available.',
    tags: ['RBAC Escalation', 'Identity Paths', 'Privilege Chains'],
    order: 'img' as const,
    slides: [
      slide('live-rbac-attack-path.png', 'Fortuna Attack Paths showing a Kubernetes workload connected through its ServiceAccount and RBAC grants toward sensitive cluster access'),
    ],
  },
  {
    id: 'workload-evidence',
    title: 'Workload Evidence',
    desc: 'Why is this workload risky? Review SBOM packages, CVE matches, workload configuration, pod security context, capabilities, runtime process events, and observed network connections.',
    tags: ['SBOM', 'CVE Matching', 'Configuration'],
    order: 'text' as const,
    slides: [
      slide('live-pod-sbom-cve.png', 'Fortuna Pod Detail showing workload SBOM package evidence and CVE correlation'),
      slide('live-inventory-rbac-pod.png', 'Inventory context with SBOM and risk indicators'),
    ],
  },
  {
    id: 'runtime-network',
    title: 'Runtime & Network Context',
    desc: 'What is the workload doing now? Observe workload communications and runtime signals to add operational context to static Kubernetes posture. Shows observed pod, service, and external traffic.',
    tags: ['Pod Traffic', 'Service Flows', 'External Connections'],
    order: 'img' as const,
    slides: [
      slide('live-runtime-network.png', 'Fortuna Runtime Network showing observed Kubernetes workload connections and external destinations'),
    ],
  },
  {
    id: 'unified-risk',
    title: 'Unified Risk & Findings',
    desc: 'What should we investigate first? Combine multiple evidence types into one user-facing risk result while keeping contributing factors visible. Findings stay linked to workloads and evidence.',
    tags: ['Risk Scoring', 'Triage', 'Evidence Review'],
    order: 'text' as const,
    slides: [
      slide('live-findings-queue.png', 'Fortuna Findings Queue showing Kubernetes security findings ranked by unified risk with linked workload evidence'),
    ],
  },
  {
    id: 'platform-integrity',
    title: 'Platform Integrity',
    desc: 'Can I trust the dashboard data? Verify telemetry health before making security decisions. Shows agent sync status, CVE processing state, runtime visibility, and data freshness with explicit unavailable states.',
    tags: ['Agent Health', 'Processing Status', 'Data Freshness'],
    order: 'img' as const,
    slides: [
      slide('live-platform-integrity.png', 'Fortuna Platform Integrity view showing cluster telemetry freshness, Agent status, and security data processing health'),
      slide('live-pipeline-runtime-health.png', 'Pipeline and Runtime Health with Agent, runtime sensor, processing, and data freshness status'),
    ],
  },
] as const;
