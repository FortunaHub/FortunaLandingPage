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
    desc: 'Start with telemetry reliability before interpreting security results. Platform Integrity shows governance status, runtime coverage, data freshness, and operational impact so teams can tell whether missing findings mean no signal or a broken pipeline.',
    tags: ['Telemetry', 'Governance', 'Freshness'],
    order: 'text' as const,
    slides: [
      slide('platform-integrity.png', 'Platform Integrity workspace with telemetry reliability and governance status'),
      slide('dashboard-overview.png', 'Operations Dashboard with cluster posture and active risk summary'),
    ],
  },
  {
    id: 'findings',
    title: 'Findings Queue and Unified Risk',
    desc: 'Findings Queue is the main triage surface. Core computes one user-facing risk value and keeps evidence, affected resource names, linked rules, workflow state, and context links together so operators do not reconcile conflicting risk numbers across pages.',
    tags: ['Unified risk', 'Workflow', 'Evidence'],
    order: 'img' as const,
    slides: [
      slide('risk-operations.png', 'Findings Queue with unified risk, evidence, and workflow controls'),
      slide('reports.png', 'Reports with time-windowed active findings and exposure summaries'),
    ],
  },
  {
    id: 'inventory-sbom',
    title: 'Kubernetes Inventory and SBOM Detail',
    desc: 'Inventory connects pods, workloads, service accounts, roles, bindings, SBOM packages, CVE matches, runtime events, and capability exposure. Inspect Detail and Open Identity flows help trace why a workload has a specific risk posture.',
    tags: ['Inventory', 'SBOM', 'Identity'],
    order: 'text' as const,
    slides: [
      slide('resources.png', 'Kubernetes Inventory with workload, identity, risk, and SBOM context'),
      slide('reports.png', 'Reports showing time-windowed supply-chain and finding summaries'),
    ],
  },
  {
    id: 'cve',
    title: 'OSV-backed CVE Matching',
    desc: 'Agent SBOM extraction feeds Core matching against OSV-backed vulnerability data loaded into PostgreSQL. CVE state is treated as catalog-backed data, including unavailable or partial states after DB reset, instead of silently showing clean results when the catalog is missing.',
    tags: ['OSV', 'CVE catalog', 'PostgreSQL'],
    order: 'img' as const,
    slides: [
      slide('resources.png', 'Pod detail and inventory context for SBOM and CVE review'),
      slide('risk-operations.png', 'CVE-backed findings in the triage queue'),
    ],
  },
  {
    id: 'attack-path',
    title: 'Attack Paths',
    desc: 'Attack Paths explain how an exposed workload can move through RBAC, service-account identity, runtime evidence, network relationships, or vulnerable images toward a sensitive target. Path focus keeps one selected route readable while dimming unrelated nodes.',
    tags: ['RBAC', 'Graph focus', 'Blast radius'],
    order: 'text' as const,
    slides: [
      slide('attack-analysis.png', 'Attack Paths workspace with scenario list, graph, and remediation context'),
    ],
  },
  {
    id: 'network',
    title: 'Runtime Network Activity',
    desc: 'Runtime Network shows observed traffic, not inferred intent. It separates workload, service, namespace, node, and external destination types, and uses edge weight/opacity to show higher-volume links more clearly while low-volume links stay quieter.',
    tags: ['Observed traffic', 'Cluster scope', 'Topology'],
    order: 'img' as const,
    slides: [
      slide('network-activity.png', 'Runtime Network Activity topology with observed pod, service, and external flows'),
    ],
  },
  {
    id: 'policy-rules',
    title: 'Policy Rules and Rule Catalog',
    desc: 'Policy Rules expose catalog metadata, rule UID routes, legacy code mapping, linked findings, and matching behavior. Operators can inspect why a finding matched and whether the rule is catalog-backed before acting on remediation guidance.',
    tags: ['Rule UID', 'Catalog', 'Matching'],
    order: 'img' as const,
    slides: [
      slide('policy-rules.png', 'Policy Rules catalog with UID-based detail and linked finding context'),
    ],
  },
  {
    id: 'monitoring',
    title: 'Pipeline and Runtime Health',
    desc: 'Monitoring verifies pipeline activity, Agent sync, CVE/SBOM processing, Falco/runtime visibility, process snapshots, and data timestamps. The UI distinguishes not installed, disabled, quiet, unavailable, and events-arriving states.',
    tags: ['Falco', 'Pipeline', 'Runtime'],
    order: 'text' as const,
    slides: [
      slide('monitoring.png', 'Pipeline and Runtime Health with agent sync, Falco visibility, and processing activity'),
    ],
  },
] as const;
