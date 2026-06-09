export const STRENGTHS = [
  'SBOM & CVE Intelligence',
  'Attack Path Modeling',
  'Zero Trust Networking',
  'Runtime Telemetry',
] as const;

const slide = (src: string, alt: string) => ({ src, alt });

export const FEATURES = [
  {
    id: 'sbom',
    title: 'SBOM (Software Bill of Materials)',
    desc: 'Continuous SBOM extraction from workloads through node-local agents and containerd. Multi-ecosystem parsers (dpkg, apk, RPM, npm, pip, Go modules) with OS-aware selection, PURL-normalized components, and exports by pod or namespace for audits and supply-chain review.',
    tags: ['Containerd', 'PURL', 'Supply chain'],
    order: 'text' as const,
    slides: [
      slide('dashboard-overview.png', 'SBOM and workload overview in Fortuna'),
    ],
  },
  {
    id: 'cve',
    title: 'Real-time CVE Matching',
    desc: 'Match SBOM packages against NVD with ecosystem-specific version comparison (Debian, RPM, Alpine, npm, PyPI). Severity tiers, CVSS context, fixed-version hints, and event-driven refreshes over NATS so exposure views stay aligned with new disclosures.',
    tags: ['NVD', 'CVSS', 'NATS'],
    order: 'img' as const,
    slides: [slide('service-security.png', 'CVE context and service risk')],
  },
  {
    id: 'network',
    title: 'Network Designer & Live Traffic',
    desc: 'Design and reason about Zero Trust posture: workload topology, allowed vs. denied flows, and active NetworkPolicies. Correlate policy intent with observed traffic, including real-time network activity, to surface drift, gaps, and exportable policy hardening.',
    tags: ['Zero Trust', 'NetworkPolicy'],
    order: 'img' as const,
    slides: [
      slide('Network-design.png', 'Network topology and policy design'),
      slide('realtime-network-activity.png', 'Real-time network activity'),
    ],
  },
  {
    id: 'attack-path',
    title: 'Attack Path Analysis',
    desc: 'Explore lateral movement and privilege escalation as an interactive graph: analytic summaries, dedicated graph exploration, and scenario drill-downs with blast-radius context. Tie paths to PCE signals and CVE exposure to prioritize fixes that break the worst chains.',
    tags: ['Threat modeling', 'Graph'],
    order: 'text' as const,
    slides: [
      slide('attack-path-analysis.png', 'Attack path analysis overview'),
      slide('attack-path-graph-view.png', 'Interactive attack path graph'),
      slide('attack-path-scenario.png', 'Attack scenario detail'),
    ],
  },
  {
    id: 'risk-center',
    title: 'Risk Center & Security Insights',
    desc: 'Operational hub for cluster risk: filters by cluster, severity, ownership, and resolution state with rollups for critical/high/medium counts. Connects vulnerability data, path insights, and investigative views so teams can triage faster with consistent context.',
    tags: ['Insights', 'Remediation'],
    order: 'text' as const,
    slides: [
      slide('attack-path-viz.png', 'Risk and path visualization'),
      slide('platform-ui-01.png', 'Risk and insights workspace'),
      slide('platform-ui-02.png', 'Security metrics and drill-down'),
      slide('platform-ui-03.png', 'Insight and resource detail'),
    ],
  },
  {
    id: 'pce',
    title: 'Pod Capability Engine (PCE)',
    desc: 'Combine static risk (privileged containers, hostPath mounts, projected tokens, risky RBAC) with runtime corroboration. Capabilities move through detected → confirmed → exploited states with MITRE ATT&CK-aligned steps, metadata, and APIs for automation.',
    tags: ['PCE', 'MITRE'],
    order: 'img' as const,
    slides: [slide('network-designer.png', 'Capability and dependency context')],
  },
  {
    id: 'runtime',
    title: 'Runtime Signals & Process Monitoring',
    desc: 'Monitor process behavior, system activity, and policy tuning from live telemetry. Surface anomalies that should promote PCE states, quantify threat velocity in dashboards, and expose Prometheus-friendly metrics for SRE and SecOps workflows.',
    tags: ['Real-time', 'Prometheus'],
    order: 'img' as const,
    slides: [
      slide('process-runtime-monitoring.png', 'Process and runtime monitoring'),
      slide('system-monitoring.png', 'System-level monitoring'),
      slide('settings-admin.png', 'Runtime and policy administration'),
    ],
  },
] as const;
