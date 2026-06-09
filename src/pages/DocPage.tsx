import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Terminal, Layers, Rocket, FileCode, BookOpen, Cpu } from 'lucide-react';
import { DOC_META, DOC_SLUGS, type DocSlug } from '../config/docs';

const ICONS = { Terminal, Layers, Rocket, FileCode, BookOpen, Cpu };

const DOC_CONTENT: Record<DocSlug, React.ReactNode> = {
  overview: (
    <div className="text-white/60 text-sm space-y-6">
      <p>
        <strong className="text-white/80">Fortuna</strong> is a Kubernetes security and risk management platform that ties together
        software supply-chain visibility, live vulnerability intelligence, network policy design, attack-path modeling, centralized risk
        insights, and runtime telemetry: the same scope described in the project README.
      </p>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Product overview</h3>
        <p className="mb-3">
          Fortuna is aimed at platform security and SRE teams that need a single operational surface for Kubernetes exposure and posture:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>
            <strong className="text-white/70">SBOM &amp; supply chain</strong>: Continuous extraction from workloads via node agents and
            containerd, multi-ecosystem parsers, and PURL-normalized components for audit-ready exports.
          </li>
          <li>
            <strong className="text-white/70">CVE intelligence</strong>: SBOM components matched against a vulnerability datastore with
            ecosystem-aware version logic, severity context, and event-driven updates for current exposure views.
          </li>
          <li>
            <strong className="text-white/70">Network Designer &amp; live traffic</strong>: Zero Trust-oriented topology and policy views,
            including real-time network activity to validate intent against what is actually observed.
          </li>
          <li>
            <strong className="text-white/70">Attack Path Analysis</strong>: Interactive graphs and scenarios for lateral movement and
            privilege escalation, aligned with capability and vulnerability data.
          </li>
          <li>
            <strong className="text-white/70">Risk Center</strong>: Consolidated triage with severity rollups, filters, and drill-downs
            across resources and insight types.
          </li>
          <li>
            <strong className="text-white/70">Pod Capability Engine (PCE)</strong>: Static and runtime-backed reasoning over dangerous pod
            and RBAC combinations, with state progression and MITRE-aligned attack steps.
          </li>
          <li>
            <strong className="text-white/70">Runtime &amp; process monitoring</strong>: Live process and system signals that feed capability
            state and operational dashboards, with Prometheus-friendly metrics.
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Marketing site &amp; screenshots</h3>
        <p className="mb-2">
          On the <strong className="text-white/70">Features</strong> section of this landing site, capabilities that ship with more than one
          screenshot use an <strong className="text-white/70">auto-advancing slideshow</strong> (prev/next and indicator dots) instead of a
          single static image.
        </p>
        <p className="mb-2">README groups feature captures as follows (files live in the repo <code className="text-fortuna-pink text-xs">image/</code> folder):</p>
        <ul className="list-disc list-inside space-y-1 ml-2 text-xs">
          <li>Network design &amp; policy: <code className="text-fortuna-pink">Network-design.png</code></li>
          <li>Real-time network activity: <code className="text-fortuna-pink">realtime-network-activity.png</code></li>
          <li>
            Attack path (multi-screen) :{' '}
            <code className="text-fortuna-pink">attack-path-analysis.png</code>,{' '}
            <code className="text-fortuna-pink">attack-path-graph-view.png</code>,{' '}
            <code className="text-fortuna-pink">attack-path-scenario.png</code>
          </li>
          <li>Process / runtime monitoring: <code className="text-fortuna-pink">process-runtime-monitoring.png</code></li>
          <li>Product / UI walkthrough: screenshot sequence <code className="text-fortuna-pink">Screenshot 2026-02-27 …</code></li>
          <li>Brand: <code className="text-fortuna-pink">logo.png</code></li>
        </ul>
      </div>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Platform delivery (summary)</h3>
        <p className="mb-2">
          <strong className="text-white/70">Dashboard</strong> (React SPA, often behind Nginx) proxies API traffic to Core.{' '}
          <strong className="text-white/70">Core</strong> exposes REST and gRPC; <strong className="text-white/70">Agent</strong> runs per node
          (DaemonSet). <strong className="text-white/70">PostgreSQL</strong> holds inventory and findings; <strong className="text-white/70">NATS JetStream</strong>{' '}
          carries asynchronous work (SBOM, CVE, insights). Agent↔Core gRPC is protected with mTLS in production setups.
        </p>
      </div>
    </div>
  ),
  components: (
    <div className="text-white/60 text-sm space-y-6">
      <p>
        Fortuna is made of <strong className="text-white/80">Agent</strong> (DaemonSet), <strong className="text-white/80">Core</strong>{' '}
        (control-plane service), <strong className="text-white/80">Dashboard</strong> (React SPA), and data-plane infrastructure (PostgreSQL,
        NATS JetStream; Redis optional for caching). Responsibilities are split so the Agent focuses on node-local collection and Core on
        correlation, scoring, and APIs.
      </p>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Agent</h3>
        <p className="mb-2">
          Runs on <strong className="text-white/70">each node</strong>. Watches pods on that node only (Kubernetes informers), enqueues work, and
          extracts SBOMs from container images via the containerd socket. Supports many ecosystems: among them dpkg, apk, rpm, npm, pip, Go modules,
          Go buildinfo, Maven, Cargo, Ruby, NuGet, and distroless-oriented paths: with <strong className="text-white/70">OS-aware</strong> parser
          selection, <strong className="text-white/70">PURL</strong> identifiers, and async workers so pod detection is not blocked by slow extracts.
        </p>
        <p className="mb-2">
          Sends SBOMs and sync metadata to Core over <strong className="text-white/70">gRPC with mTLS</strong> (reconnect, heartbeat, retries). Can
          also contribute <strong className="text-white/70">runtime context</strong> (e.g. process/host signals, optional Falco JSONL ingestion,
          eBPF-related hooks where enabled) so Core can promote capability state: details depend on your deployment profile.
        </p>
        <p className="text-white/50 text-xs">
          Typical sizing: on the order of hundreds of millicores CPU and from a few hundred MiB RAM upward per node; tune worker count and limits
          for your cluster (heavy SBOM or runtime features may need higher caps).
        </p>
      </div>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Core</h3>
        <p className="mb-2">
          Central <strong className="text-white/70">REST</strong> and <strong className="text-white/70">gRPC</strong> service: persists SBOMs and
          components, runs CVE matching (ecosystem-specific version comparison), generates insights with severity and lifecycle states, evaluates
          policies (including CEL), drives <strong className="text-white/70">PCE</strong> and risk scoring, and can expose an{' '}
          <strong className="text-white/70">admission webhook</strong> for risk-aware admission. Workers consume NATS JetStream subjects for SBOM,
          CVE, correlation, and risk pipelines. PostgreSQL schema evolves via <strong className="text-white/70">migrations applied at startup</strong>.
        </p>
        <p className="mb-2">
          Operational surfaces include <strong className="text-white/70">health and readiness</strong> endpoints and{' '}
          <strong className="text-white/70">Prometheus metrics</strong> (API, workers, webhook).
        </p>
        <p className="text-white/50 text-xs">
          Production hardening: store DB and message-bus credentials in a secret manager; enable TLS/mTLS and JWT where required by your environment.
        </p>
      </div>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Dashboard</h3>
        <p className="mb-2">
          React (e.g. Vite, TypeScript, Tailwind) SPA for investigation: Risk Center, SBOM views, runtime signals, capabilities, attack-path /
          graph views, and aggregated charts. Usually served as static assets with <strong className="text-white/70">/api</strong> proxied to Core.
          This public marketing site uses an auto-advancing slideshow for multi-screenshot features.
        </p>
      </div>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Infrastructure</h3>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong>PostgreSQL:</strong> primary store for SBOMs, CVE matches, insights, pods, clusters, audit, and related entities</li>
          <li><strong>NATS JetStream:</strong> durable streams for raw events, normalized processing, and insight fan-out (HA often uses multiple brokers)</li>
          <li><strong>Redis (optional):</strong> caching or deduplication where enabled</li>
          <li><strong>Observability:</strong> scrape Core <code className="text-fortuna-pink text-xs">/metrics</code> with Prometheus-compatible tooling</li>
        </ul>
      </div>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Agent security posture</h3>
        <p className="mb-2">
          The Agent is designed for <strong className="text-white/70">least privilege</strong>: read-oriented Kubernetes API access for pods and
          related objects needed for inventory, no cluster secret access for normal operation, and encrypted channels to Core. Exact RBAC is defined
          in your deployment manifests.
        </p>
      </div>
    </div>
  ),
  'getting-started': (
    <div className="text-white/60 text-sm space-y-6">
      <div>
        <h3 className="text-white/80 font-bold mb-2">This documentation site (README)</h3>
        <p className="mb-2">To run the Fortuna landing page and browse these docs locally:</p>
        <ol className="list-decimal list-inside space-y-1 ml-2 text-xs font-mono">
          <li><code className="text-fortuna-pink">cd Untitled/FortunaLandingPage</code></li>
          <li><code className="text-fortuna-pink">npm install</code></li>
          <li><code className="text-fortuna-pink">npm run dev</code>: open http://localhost:3000</li>
        </ol>
        <p className="mt-2 text-white/50 text-xs">Production preview: <code className="text-fortuna-pink">npm run build</code> then <code className="text-fortuna-pink">npm run preview</code>.</p>
      </div>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Fortuna platform: prerequisites</h3>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Kubernetes <strong className="text-white/70">v1.25+</strong> (newer versions commonly used in testing)</li>
          <li>Container runtime such as <strong className="text-white/70">containerd 1.6+</strong> (or compatible environment for image access)</li>
          <li><strong className="text-white/70">PostgreSQL</strong> for Core persistence</li>
          <li><strong className="text-white/70">NATS with JetStream</strong> for asynchronous pipelines (multi-broker HA is typical in production)</li>
          <li>Cluster admin-level ability to install namespaces, RBAC, and workloads; tools such as <code className="text-fortuna-pink text-xs">kubectl</code>, image build/load utilities, and TLS material for mTLS as required by your process</li>
        </ul>
      </div>
      <div>
        <h3 className="text-white/80 font-bold mb-2">High-level rollout</h3>
        <ol className="list-decimal list-inside space-y-2 ml-2">
          <li>
            <strong>Namespace &amp; secrets</strong>: Create an application namespace. Provision <strong className="text-white/70">mTLS trust</strong>{' '}
            and workload certificates using your PKI or the project&apos;s helper scripts. Store <strong className="text-white/70">database URL</strong>,{' '}
            <strong className="text-white/70">message bus URL</strong>, and <strong className="text-white/70">signing keys</strong> in Kubernetes Secrets
            or an external vault: avoid committing real values to git.
          </li>
          <li>
            <strong>Infrastructure</strong>: Deploy PostgreSQL and NATS (and optional Redis) from your chosen charts or the repository&apos;s reference manifests; wait until stores are ready before Core starts.
          </li>
          <li>
            <strong>Build &amp; publish images</strong>: Build Core and Agent (Go) container images; tag with versioned labels for production. Ensure every node that must run the Agent can resolve and pull the image (registry or pre-loaded tarballs).
          </li>
          <li>
            <strong>Core &amp; Agent</strong>: Apply RBAC, Services, and Deployments/DaemonSets. Core runs DB migrations on startup. Then roll out Agents cluster-wide.
          </li>
          <li>
            <strong>Data &amp; verification</strong>: When applicable, load CVE/vulnerability reference data through your approved job flow. Confirm health endpoints, Agent heartbeats, and an end-to-end pod → SBOM path in a non-production cluster first.
          </li>
        </ol>
      </div>
      <p className="text-white/50 text-xs">
        Multi-node clusters often need correct cluster DNS and pod network paths between nodes so Agents can reach Core gRPC; treat CNI and DNS as
        first-class deployment concerns. Full operator runbooks live in the main product repository: not duplicated here.
      </p>
    </div>
  ),
  architecture: (
    <div className="text-white/60 text-sm space-y-6">
      <p>
        Fortuna provides real-time vulnerability visibility, SBOM extraction, CVE matching, insights, pod capability analysis (including MITRE
        ATT&amp;CK-oriented modeling), runtime signals, and optional admission control: unified behind a single control plane.
      </p>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Logical diagram</h3>
        <pre className="bg-black/30 rounded p-4 text-[11px] font-mono text-white/75 overflow-x-auto leading-relaxed whitespace-pre">
{`┌─────────────────────┐     ┌──────────────────────────┐
│ Dashboard (React)   │     │ Kubernetes API Server    │
│ static + /api proxy │     └────────────┬─────────────┘
└──────────┬──────────┘                  │
           │                             │
           ▼                             │
┌─────────────────────┐                  │
│ Core (REST + gRPC)  │◄── gRPC/mTLS ────┤
│ workers, scheduler  │                  │
└──────────┬──────────┘                  │
     ┌─────┴─────┐          ┌────────────▼─────────────┐
     ▼           ▼          │ Agent (DaemonSet)        │
 PostgreSQL   NATS         │ per-node SBOM + runtime  │
 JetStream               └──────────────────────────┘`}
        </pre>
      </div>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Pipelines (conceptual)</h3>
        <p className="mb-2">
          <strong className="text-white/70">Discovery → SBOM → CVE → insights:</strong> pods on a node are detected; SBOMs are extracted and sent
          to Core; events enter JetStream; workers persist components, run matching against the vulnerability store, emit insights, and refresh unified
          risk scores consumed by the UI and API.
        </p>
        <p className="mb-2">
          <strong className="text-white/70">Sync → PCE:</strong> pod specs and signals feed static and runtime capability evaluation; state can
          progress as evidence accumulates and feeds the risk engine.
        </p>
        <p>
          <strong className="text-white/70">Runtime:</strong> node-level collectors forward normalized events to Core for correlation and
          promotion rules; dashboards surface pod detail and Risk Center context.
        </p>
      </div>
      <div>
        <h3 className="text-white/80 font-bold mb-2">API surface (domain-oriented)</h3>
        <p className="mb-2 text-xs">Public HTTP routes are grouped by concern (exact paths evolve with releases):</p>
        <ul className="list-disc list-inside space-y-1 ml-2 text-xs">
          <li><strong className="text-white/70">Auth</strong>: login, tokens, session helpers</li>
          <li><strong className="text-white/70">Inventory</strong>: workloads, capabilities, resources</li>
          <li><strong className="text-white/70">Risk</strong>: insights, rules, scores</li>
          <li><strong className="text-white/70">Runtime</strong>: signals, events, telemetry</li>
          <li><strong className="text-white/70">Policy</strong>: rule artifacts and evaluation hooks</li>
          <li><strong className="text-white/70">Dashboard</strong>: aggregates tuned for the UI</li>
          <li><strong className="text-white/70">Agent</strong>: ingest and sync from node agents</li>
          <li><strong className="text-white/70">Cluster / SBOM</strong>: cluster scope and supply-chain payloads</li>
        </ul>
      </div>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Design choices (summary)</h3>
        <ul className="list-disc list-inside space-y-1 ml-2 text-xs">
          <li>CVE intelligence backed by a <strong className="text-white/70">queryable datastore</strong> (e.g. OSV-oriented) for operational control</li>
          <li><strong className="text-white/70">Custom SBOM extraction</strong> aligned to containerd and Fortuna parsers (lean node footprint)</li>
          <li><strong className="text-white/70">NATS JetStream</strong> for durable, Kubernetes-friendly asynchronous processing</li>
          <li><strong className="text-white/70">Rule-based unified risk scoring</strong>: explainable and auditable</li>
          <li><strong className="text-white/70">MITRE ATT&amp;CK alignment</strong> for capability and attack-path narratives</li>
          <li><strong className="text-white/70">JWT</strong> (and optional mTLS) for service and user auth patterns</li>
        </ul>
      </div>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Repository layout (product repo)</h3>
        <p className="text-xs font-mono text-white/55">
          agent/ · core/ · dashboard/ · deploy/ · docs/ · e2e/: each major component owns its build, manifests, and tests.
        </p>
      </div>
      <div>
        <h3 className="text-white/80 font-bold mb-2">NATS JetStream (names)</h3>
        <p className="mb-2 text-xs">
          Streams such as <code className="text-fortuna-pink">fortuna-raw</code>, <code className="text-fortuna-pink">fortuna-events</code>,{' '}
          <code className="text-fortuna-pink">fortuna-insights</code>, and <code className="text-fortuna-pink">fortuna-normalized</code> back work-queue
          and fan-out patterns; subjects include SBOM creation, CVE, runtime, and normalized event families. Operators tune retention and storage in
          their cluster configuration.
        </p>
      </div>
    </div>
  ),
  deployment: (
    <div className="text-white/60 text-sm space-y-6">
      <div>
        <h3 className="text-white/80 font-bold mb-2">Landing site: GitHub Pages (README)</h3>
        <p className="mb-2">
          To publish <strong className="text-white/70">this</strong> documentation/landing repo: create a GitHub repository, push <code className="text-fortuna-pink text-xs">main</code>, enable{' '}
          <strong className="text-white/70">Settings → Pages → GitHub Actions</strong> as the source, and let the workflow deploy on push. The site is served at{' '}
          <code className="text-fortuna-pink text-xs">https://&lt;username&gt;.github.io/&lt;repo-name&gt;/</code>.
        </p>
        <p className="text-white/50 text-xs mb-2">
          Notes from README: workflow targets <code className="text-fortuna-pink">main</code> (adjust if you use <code className="text-fortuna-pink">master</code>). For a subpath build, use{' '}
          <code className="text-fortuna-pink">BASE_PATH=/LandingPage/ npm run build</code> then <code className="text-fortuna-pink">npm run preview</code> to verify.
        </p>
      </div>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Kubernetes deployment: overview</h3>
        <p className="mb-2">
          Fortuna ships as ordinary Kubernetes workloads: StatefulSets/Deployments for data services, a Deployment for Core, a DaemonSet for Agents,
          Services, ConfigMaps, Secrets, and optional Jobs (e.g. loading vulnerability reference data). Core{' '}
          <strong className="text-white/70">applies database migrations automatically</strong> when it starts against an empty or versioned schema.
        </p>
        <p className="mb-2">
          A typical production pass: create the namespace → install TLS trust for mTLS → create application Secrets via your secret manager →
          bring up PostgreSQL and NATS → deploy Core and wait for readiness/migrations → distribute container images to every node (registry or import)
          → roll out Agents → validate health, heartbeats, and a sample workload SBOM before promoting to production traffic.
        </p>
      </div>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Environment &amp; sizing</h3>
        <ul className="list-disc list-inside space-y-2 ml-2 text-xs">
          <li>
            <strong>Cluster:</strong> commodity nodes (e.g. on the order of 2 vCPU / 4&nbsp;GiB per node as a starting point); adjust for SBOM
            throughput and HA replicas
          </li>
          <li>
            <strong>Storage:</strong> persistent volumes for PostgreSQL and JetStream; prefer replicated or cloud-backed storage classes in production
          </li>
          <li>
            <strong>Core:</strong> scale CPU/memory requests and limits with API load; consider multiple replicas only when the stack supports HA
            semantics for your release
          </li>
          <li>
            <strong>Agent:</strong> raise memory when many large images or optional runtime collectors run on the same node; align{' '}
            <code className="text-fortuna-pink">imagePullPolicy</code> with whether you use a registry or side-loaded images
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Networking &amp; multi-node</h3>
        <p className="mb-2 text-xs">
          Agents must resolve and reach Core gRPC (and HTTP where used). In multi-node clusters, verify cluster DNS, service routing, and CNI
          connectivity between node subnets. Symptoms such as DNS timeouts or connection timeouts after resolution usually point to platform DNS or
          overlay network configuration: resolve those before tuning application timeouts.
        </p>
      </div>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Operations checklist (non-sensitive)</h3>
        <ul className="list-disc list-inside space-y-1 ml-2 text-xs">
          <li>Infrastructure pods ready (database, messaging)</li>
          <li>Core pod ready; migration logs clean</li>
          <li>Schema verification or smoke tests passed in your environment</li>
          <li>Optional vulnerability bulk-load job completed when your process requires it</li>
          <li>One Agent per node ready; heartbeats or logs show stable connectivity</li>
          <li>Dashboard or API health checks green; Prometheus scrape configured if used</li>
          <li>Backup, monitoring, and incident runbooks owned by your platform team</li>
        </ul>
      </div>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Where manifests live</h3>
        <p className="mb-2 text-xs">
          Reference RBAC, Core, Agent, and infrastructure YAML (and companion scripts for certs, verification, and data load) ship in the product
          repository&apos;s <code className="text-fortuna-pink">deploy/</code> and automation folders. Adapt names, namespaces, and secret references
          to your standards: do not paste production credentials into public docs or tickets.
        </p>
      </div>
    </div>
  ),
  api: (
    <div className="text-white/60 text-sm space-y-6">
      <p>
        Core exposes a <strong className="text-white/70">versioned REST API</strong> (Gin) alongside <strong className="text-white/70">gRPC</strong>{' '}
        for Agents. HTTP routes are organized by domain (auth, inventory, risk, runtime, policy, dashboard, agent, cluster, SBOM). When JWT auth is
        enabled, obtain a token from the login route your deployment exposes, then send{' '}
        <code className="text-fortuna-pink px-1 rounded">Authorization: Bearer &lt;token&gt;</code> on protected HTTP calls.
      </p>
      <div>
        <h3 className="text-white/80 font-bold mb-2">gRPC (Agent-facing)</h3>
        <p className="text-xs mb-2">
          Typical RPCs include agent registration, heartbeat/ping, and SBOM submission flows. Transports should use{' '}
          <strong className="text-white/70">mTLS</strong> in hardened environments.
        </p>
      </div>
      <div>
        <h3 className="text-white/80 font-bold mb-2">Representative HTTP resources</h3>
        <p className="text-white/50 text-xs mb-2">
          Prefixes evolve across releases; confirm against your Core build. Examples often include:
        </p>
        <ul className="space-y-2 font-mono text-xs">
          <li><code className="text-fortuna-pink">/health</code>, <code className="text-fortuna-pink">/ready</code>, <code className="text-fortuna-pink">/live</code>: probes</li>
          <li><code className="text-fortuna-pink">/api/v1/risk/insights</code> (or legacy aliases): findings with filters</li>
          <li><code className="text-fortuna-pink">/api/v1/sboms</code>: SBOM payloads and components</li>
          <li><code className="text-fortuna-pink">/api/v1/cves</code>: CVE metadata and matches</li>
          <li><code className="text-fortuna-pink">/api/v1/inventory/…</code>: capabilities and workload inventory (naming may vary)</li>
          <li><code className="text-fortuna-pink">/api/v1/runtime/…</code>: signals and events</li>
          <li><code className="text-fortuna-pink">/api/v1/graph/…</code>: blast radius / attack-path helpers</li>
          <li><code className="text-fortuna-pink">/api/v1/policy/…</code>: policy artifacts</li>
          <li><code className="text-fortuna-pink">/api/v1/dashboard/…</code>: aggregates for the UI</li>
          <li><code className="text-fortuna-pink">/metrics</code>: Prometheus scrape surface</li>
        </ul>
      </div>
      <p className="text-white/50 text-xs">
        Large deployments rely on pagination (<code className="text-fortuna-pink">page</code>, <code className="text-fortuna-pink">pageSize</code>) and
        filters (resource, namespace, severity, status). For the canonical path list and schemas, use the product API reference bundled with your
        release.
      </p>
    </div>
  ),
};

export default function DocPage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug || !DOC_SLUGS.includes(slug as DocSlug)) {
    return <Navigate to="/docs/overview" replace />;
  }

  const doc = DOC_META.find((d) => d.slug === slug)!;
  const Icon = ICONS[doc.icon];
  const content = DOC_CONTENT[slug as DocSlug];

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 pink-gradient rounded-lg flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">{doc.title}</h1>
          <p className="text-white/50 text-xs font-mono truncate">/docs/{doc.slug}</p>
        </div>
      </div>

      <div className="glass-card p-6 lg:p-8 border border-white/5 rounded-xl">{content}</div>
    </div>
  );
}
