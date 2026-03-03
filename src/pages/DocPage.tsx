import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ChevronRight, Terminal, Layers, Rocket, FileCode, BookOpen, Cpu } from 'lucide-react';
import { DOC_META, DOC_SLUGS, type DocSlug } from '../config/docs';

const ICONS = { Terminal, Layers, Rocket, FileCode, BookOpen, Cpu };

const DOC_CONTENT: Record<DocSlug, React.ReactNode> = {
  overview: (
    <div className="text-white/60 text-sm space-y-6">
      <p>
        <strong className="text-white/80">Fortuna</strong> is a Kubernetes security and risk management platform. It provides end-to-end visibility into workload security: from SBOM and CVE analysis to attack path visualization and runtime signal correlation.
      </p>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Solution Overview</h3>
        <p className="mb-2">
          Fortuna addresses the complexity of securing Kubernetes workloads by unifying vulnerability management, capability detection, and threat modeling in a single platform. Security teams gain real-time insights without sacrificing performance.
        </p>
        <p className="mb-2">
          The platform follows a visibility-first approach: Agent extracts SBOM from container images on each node; Core stores and processes data; NATS JetStream drives event-driven CVE matching and insight generation. Dashboard and API expose Risk Center, attack path graphs, Network Designer, and runtime signals.
        </p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong>Visibility:</strong> SBOM extraction, CVE matching, and security insights across all clusters</li>
          <li><strong>Threat modeling:</strong> Pod Capability Engine (PCE), attack path analysis, lateral movement visualization</li>
          <li><strong>Runtime security:</strong> Real-time signals, threat velocity metrics, correlation with static capabilities</li>
          <li><strong>Policy & compliance:</strong> CEL-based policy engine, optional Admission Webhook, Zero Trust network design</li>
        </ul>
      </div>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Key Features</h3>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Automatic SBOM extraction (dpkg, apk, rpm, npm, pip, gomod)</li>
          <li>Real-time CVE matching with ecosystem-specific version comparison</li>
          <li>Risk Center with severity filtering and actionable recommendations</li>
          <li>Attack path analysis — lateral movement and privilege escalation paths</li>
          <li>Network Designer — Zero Trust policy visualization and automated generation</li>
          <li>Pod Capability Engine with promotion rules and MITRE mapping</li>
          <li>Runtime signals and threat velocity dashboard</li>
          <li>mTLS for all inter-component communication</li>
        </ul>
      </div>
    </div>
  ),
  components: (
    <div className="text-white/60 text-sm space-y-6">
      <p>
        Fortuna consists of Core, Agent, Dashboard, and supporting infrastructure. Each component has a single responsibility; communication is event-driven and secured with mTLS.
      </p>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Core</h3>
        <p className="mb-2">
          Central processing component (Kubernetes Deployment). Handles SBOM storage, CVE matching, insight generation, Policy evaluation, Pod Capability Engine (PCE), attack path analysis, and runtime signal processing. Exposes REST API (51+ endpoints) and gRPC. Uses PostgreSQL for persistence and NATS JetStream for event-driven processing. Optional Admission Webhook for policy enforcement at admission time.
        </p>
        <p className="text-white/50 text-xs">Deployment: control-plane node. Resources: 256Mi–1Gi memory, 100m–1000m CPU.</p>
      </div>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Agent</h3>
        <p className="mb-2">
          Node-level component (DaemonSet). Runs on every node. Monitors pods locally, extracts SBOM from container images via containerd. Uses async work queue to avoid blocking pod detection. OS-aware parser selection (dpkg for Debian, apk for Alpine, rpm, npm, pip, gomod). Communicates with Core over gRPC (mTLS). One pod per node.
        </p>
        <p className="text-white/50 text-xs">Resources: 256Mi–1Gi memory, 100m–500m CPU.</p>
      </div>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Dashboard</h3>
        <p className="mb-2">
          Web UI (React/Vite). Risk Center, SBOM browser, threat velocity charts, pod capabilities, runtime signals, attack path visualization, Network Designer. Proxies /api to Core. JWT authentication. Real-time data refresh.
        </p>
      </div>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Infrastructure</h3>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong>PostgreSQL:</strong> SBOMs, CVEs, insights, capabilities, attack steps</li>
          <li><strong>NATS JetStream:</strong> Event queue, 3 replicas for HA</li>
          <li><strong>Metrics:</strong> Core exposes /metrics (Prometheus)</li>
        </ul>
      </div>
    </div>
  ),
  'getting-started': (
    <div className="text-white/60 text-sm space-y-6">
      <p>
        Get Fortuna running in four steps. The platform requires a Kubernetes cluster with containerd, plus PostgreSQL and NATS JetStream for Core.
      </p>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Quick Start</h3>
        <ol className="list-decimal list-inside space-y-2 ml-2">
          <li><strong>Prepare Environment</strong> — Kubernetes cluster with containerd, RBAC. Ensure PostgreSQL and NATS are available (or use Fortuna manifests).</li>
          <li><strong>Build Images</strong> — Build Core and Agent (Go). See Build Guide for make targets and image tags.</li>
          <li><strong>Deploy</strong> — Production deployment via Helm or raw manifests in deploy/. Configure secrets, mTLS certs, and environment variables.</li>
          <li><strong>Verify</strong> — Check deployment status (pods, services). Run E2E tests to validate SBOM flow, CVE matching, and Dashboard connectivity.</li>
        </ol>
      </div>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Prerequisites</h3>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Kubernetes cluster (1.24+)</li>
          <li>Containerd as container runtime</li>
          <li>PostgreSQL 14+</li>
          <li>NATS JetStream (3 replicas recommended for HA)</li>
          <li>RBAC configured for Agent and Core</li>
        </ul>
      </div>
    </div>
  ),
  architecture: (
    <div className="text-white/60 text-sm space-y-6">
      <p>
        Fortuna uses an event-driven architecture. Agent runs on each node and sends SBOM data to Core over gRPC. Core stores data in PostgreSQL, publishes events to NATS, and workers process CVE matching and insight generation asynchronously.
      </p>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Components</h3>
        <p className="mb-2">
          <strong className="text-white/80">Core</strong> (Deployment): SBOM storage, CVE matching, insight generation, Policy evaluation, PCE, attack path analysis, REST API (51+ endpoints), gRPC. Uses PostgreSQL and NATS JetStream.
        </p>
        <p className="mb-2">
          <strong className="text-white/80">Agent</strong> (DaemonSet): Pod detection, SBOM extraction (dpkg, apk, rpm, npm, pip, gomod), async work queue, gRPC mTLS to Core. One pod per node.
        </p>
        <p>
          <strong className="text-white/80">Dashboard</strong> (React/Vite): Risk Center, SBOM browser, threat velocity, pod capabilities, runtime signals. Proxies /api to Core.
        </p>
      </div>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Data Flow</h3>
        <p className="mb-2">End-to-end pipeline:</p>
        <pre className="bg-black/30 rounded p-4 text-xs font-mono text-white/80 overflow-x-auto">
{`Pod Created → Agent detects → SBOM queue → Extract
→ gRPC to Core → Store → NATS event → CVE Matcher
→ Insights → API`}
        </pre>
      </div>
      <div>
        <h3 className="text-white/80 font-bold mb-2">NATS Streams</h3>
        <p className="mb-2">fortuna-raw, fortuna-events, fortuna-insights. Workers subscribe to SBOM and CVE subjects. WorkQueue policy for at-least-once delivery.</p>
      </div>
    </div>
  ),
  deployment: (
    <div className="text-white/60 text-sm space-y-6">
      <p>
        Fortuna deploys as standard Kubernetes resources. Use Helm or raw manifests. Core runs migrations automatically on startup.
      </p>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Production Checklist</h3>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li><strong>Infrastructure:</strong> Deploy PostgreSQL (StatefulSet), NATS JetStream (3 replicas for HA)</li>
          <li><strong>Core:</strong> Deployment on control-plane node. Configure DB URL, NATS URL, mTLS server certs</li>
          <li><strong>Agent:</strong> DaemonSet on all nodes. Containerd socket, mTLS client certs</li>
          <li><strong>Dashboard:</strong> Static serving (nginx or similar). Proxy /api to Core</li>
          <li><strong>Secrets:</strong> mTLS certificates, DB credentials, JWT secret for Dashboard auth</li>
          <li><strong>Migrations:</strong> Core auto-runs migrations on start. No manual step required</li>
        </ul>
      </div>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Scripts & Manifests</h3>
        <p className="mb-2">
          <strong className="text-white/80">script-prod/</strong>: build, deploy, clean, verify. Versioned images, config-driven.
        </p>
        <p>
          <strong className="text-white/80">deploy/</strong>: Helm charts, raw manifests, deployment checklist. See deploy/README.md for details.
        </p>
      </div>
    </div>
  ),
  api: (
    <div className="text-white/60 text-sm space-y-6">
      <p>
        Core exposes REST API. Authenticate via <code className="text-fortuna-pink px-1 rounded">POST /api/v1/auth/login</code> (returns JWT). Send <code className="text-fortuna-pink px-1 rounded">Authorization: Bearer &lt;token&gt;</code> on subsequent requests.
      </p>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Key Endpoints</h3>
        <ul className="space-y-2 font-mono text-xs">
          <li><code className="text-fortuna-pink">/api/v1/insights</code> — Security insights (filter: severity, resource_uid, status)</li>
          <li><code className="text-fortuna-pink">/api/v1/risks</code> — Risk Center, summary</li>
          <li><code className="text-fortuna-pink">/api/v1/sbom</code> — SBOM list/detail by pod, namespace</li>
          <li><code className="text-fortuna-pink">/api/v1/pod-capabilities</code> — PCE, trends, summary by cluster/capability/namespace</li>
          <li><code className="text-fortuna-pink">/api/v1/attack-steps</code> — Attack steps, graph</li>
          <li><code className="text-fortuna-pink">/api/v1/runtime-signals</code> — Runtime signals by pod</li>
          <li><code className="text-fortuna-pink">/api/v1/dashboard/metrics/threat-velocity</code> — Threat velocity metrics</li>
          <li><code className="text-fortuna-pink">/api/v1/capability-metadata</code> — PCE capability metadata</li>
          <li><code className="text-fortuna-pink">/api/v1/promotion-rules</code> — PCE promotion rules</li>
          <li><code className="text-fortuna-pink">/metrics</code> — Prometheus metrics</li>
        </ul>
      </div>
      <p className="text-white/50 text-xs">Full reference: 51+ endpoints. Pagination via page, pageSize. Filter by resource_uid, namespace, severity, status.</p>
    </div>
  ),
};

export default function DocPage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug || !DOC_SLUGS.includes(slug as DocSlug)) {
    return <Navigate to="/docs" replace />;
  }

  const doc = DOC_META.find((d) => d.slug === slug)!;
  const Icon = ICONS[doc.icon];
  const content = DOC_CONTENT[slug as DocSlug];

  return (
    <div className="min-h-screen bg-fortuna-dark">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 pink-gradient rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight">{doc.title}</h1>
            <p className="text-white/50 text-xs">/docs/{doc.slug}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-white/60 hover:text-fortuna-pink transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Home
          </Link>
          <span className="text-white/30">/</span>
          <Link
            to="/docs"
            className="text-white/60 hover:text-fortuna-pink transition-colors"
          >
            Docs
          </Link>
          <span className="text-white/30">/</span>
          <span className="text-fortuna-pink">{doc.slug}</span>
        </div>

        <div className="glass-card p-6 lg:p-8 border border-white/5 rounded-xl">{content}</div>

        <div className="mt-12">
          <Link
            to="/docs"
            className="inline-flex items-center gap-2 text-fortuna-pink hover:underline text-sm font-semibold"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            All docs
          </Link>
        </div>
      </div>
    </div>
  );
}
