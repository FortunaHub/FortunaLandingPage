export const STRENGTHS = [
  'SBOM & OSV-backed CVE Matching',
  'Unified Risk Scoring',
  'Attack Paths & RBAC Context',
  'Multi-cluster Runtime Telemetry',
] as const;

const slide = (src: string, alt: string) => ({ src, alt });

export const FEATURES = [
  {
    id: 'platform-integrity',
    title: 'Platform Integrity',
    desc: 'Verify telemetry health before trusting a quiet Findings Queue. Shows agent sync status, CVE catalog freshness, runtime visibility, and data timestamps so you know whether the dashboard is complete or blocked.',
    tags: ['Agent Status', 'CVE Processing', 'Data Freshness'],
    order: 'text' as const,
    slides: [
      slide('platform-integrity.png', 'Platform Integrity workspace with telemetry reliability and governance status'),
      slide('dashboard-overview.png', 'Operations Dashboard with cluster posture and active risk summary'),
    ],
  },
  {
    id: 'findings',
    title: 'Findings Queue and Unified Risk',
    desc: 'One risk score per finding. Evidence, affected resources, linked rules, workflow state, and context links together in one triage interface.',
    tags: ['Risk Scoring', 'Triage', 'Evidence Review'],
    order: 'img' as const,
    slides: [
      slide('risk-operations.png', 'Findings Queue with unified risk, evidence, and workflow controls'),
      slide('reports.png', 'Reports with time-windowed active findings and exposure summaries'),
    ],
  },
  {
    id: 'inventory-sbom',
    title: 'Kubernetes Inventory and SBOM Detail',
    desc: 'All pods and workloads: roles, service accounts, SBOM packages, CVE matches, and runtime events linked from one inventory view.',
    tags: ['Pods & Workloads', 'SBOM Detail', 'Service Accounts'],
    order: 'text' as const,
    slides: [
      slide('resources.png', 'Kubernetes Inventory with workload, identity, risk, and SBOM context'),
      slide('reports.png', 'Reports showing time-windowed supply-chain and finding summaries'),
    ],
  },
  {
    id: 'cve',
    title: 'SBOM and OSV-backed CVE Matching',
    desc: 'SBOM packages matched against OSV vulnerability data. Shows unavailable or partial states when the CVE catalog is incomplete instead of falsely clean results.',
    tags: ['Package Analysis', 'CVE Matching', 'Vulnerability'],
    order: 'img' as const,
    slides: [
      slide('resources.png', 'Pod detail and inventory context for SBOM and CVE review'),
      slide('risk-operations.png', 'CVE-backed findings in the triage queue'),
    ],
  },
  {
    id: 'attack-path',
    title: 'Attack Paths',
    desc: 'RBAC escalation paths, service account exposure, and vulnerable images. When runtime sensors are enabled, adds process and network context.',
    tags: ['RBAC Escalation', 'Identity Paths', 'Risk Chaining'],
    order: 'text' as const,
    slides: [
      slide('attack-analysis.png', 'Attack Paths workspace with scenario list, graph, and remediation context'),
    ],
  },
  {
    id: 'network',
    title: 'Observed Network Activity',
    desc: 'Observed traffic: pods, services, and external destinations. Line thickness shows traffic volume. Topology, not inferred policy or drift.',
    tags: ['Pod Traffic', 'Service Flows', 'External Connections'],
    order: 'img' as const,
    slides: [
      slide('network-activity.png', 'Runtime Network Activity topology with observed pod, service, and external flows'),
    ],
  },
  {
    id: 'policy-rules',
    title: 'Policy Rules and Rule Catalog',
    desc: 'Rule catalog, matched findings, and legacy ID mapping. Search by rule UID or name to verify matching behavior.',
    tags: ['Rule Catalog', 'Matching Logic', 'Audit Trail'],
    order: 'img' as const,
    slides: [
      slide('policy-rules.png', 'Policy Rules catalog with UID-based detail and linked finding context'),
    ],
  },
  {
    id: 'monitoring',
    title: 'Pipeline and Runtime Health',
    desc: 'Agent sync, CVE processing, runtime sensor state (when enabled), and data freshness with explicit unavailable states.',
    tags: ['Agent Health', 'Processing Status', 'Data Freshness'],
    order: 'text' as const,
    slides: [
      slide('monitoring.png', 'Pipeline and Runtime Health with agent sync, Falco visibility, and processing activity'),
    ],
  },
] as const;
