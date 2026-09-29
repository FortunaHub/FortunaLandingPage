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
      slide("live-serviceaccount-permissions.png", "Effective RBAC grants, including wildcard rules and five ClusterRoleBindings."),
      slide("live-serviceaccount-identity.png", "ServiceAccount sa-rbac and its identity context in fortuna-test."),
      slide("live-inventory-rbac-pod.png", "rbac-pod inventory detail: Failed status, Low risk (11/100), and no SBOM."),
    ],
  },
  {
    id: 'attack-paths',
    title: 'Attack Paths',
    desc: 'How could this workload gain more access? Follow identity and privilege relationships toward sensitive access. Paths enriched with SBOM/CVE evidence, runtime observations, and network context when available.',
    tags: ['RBAC Escalation', 'Identity Paths', 'Privilege Chains'],
    order: 'img' as const,
    slides: [
      slide("live-rbac-attack-path.png", "Possible access: rbac-pod → sa-rbac → crb-rbac-admin → cluster-admin. This graph does not prove exploitation."),
    ],
  },
  {
    id: 'workload-evidence',
    title: 'Workload Evidence',
    desc: 'Why is this workload risky? Review SBOM packages, CVE matches, workload configuration, pod security context, capabilities, runtime process events, and observed network connections.',
    tags: ['SBOM', 'CVE Matching', 'Configuration'],
    order: 'text' as const,
    slides: [
      slide("live-pod-sbom-cve.png", "Separate PostgreSQL example: 48 SBOM packages. The empty OSV mirror means zero CVEs is not a clean verdict."),
      slide("live-inventory-rbac-pod.png", "rbac-pod inventory detail: Failed status, Low risk (11/100), and no SBOM."),
    ],
  },
  {
    id: 'runtime-network',
    title: 'Runtime & Network Context',
    desc: 'What is the workload doing now? Observe workload communications and runtime signals to add operational context to static Kubernetes posture. Shows observed pod, service, and external traffic.',
    tags: ['Pod Traffic', 'Service Flows', 'External Connections'],
    order: 'img' as const,
    slides: [
      slide("live-runtime-network.png", "Separate NATS example: two sources, two destinations, three edges in a 15-minute window."),
    ],
  },
  {
    id: 'unified-risk',
    title: 'Unified Risk & Findings',
    desc: 'What should we investigate first? Combine multiple evidence types into one user-facing risk result while keeping contributing factors visible. Findings stay linked to workloads and evidence.',
    tags: ['Risk Scoring', 'Triage', 'Evidence Review'],
    order: 'text' as const,
    slides: [
      slide("live-findings-queue.png", "Findings Queue filtered to ServiceAccount Token Access. This is a triage capture, not an after-remediation result."),
    ],
  },
  {
    id: 'platform-integrity',
    title: 'Platform Integrity',
    desc: 'Can I trust the dashboard data? Verify telemetry health before making security decisions. Shows agent sync status, CVE processing state, runtime visibility, and data freshness with explicit unavailable states.',
    tags: ['Agent Health', 'Processing Status', 'Data Freshness'],
    order: 'img' as const,
    slides: [
      slide("live-platform-integrity.png", "Platform Integrity overview. Inspect Pipeline & Runtime Health for component-level readiness."),
      slide("live-pipeline-runtime-health.png", "Monitoring reports DEGRADED: stale catalog, empty OSV mirror, and 0/18 matched images."),
    ],
  },
] as const;
