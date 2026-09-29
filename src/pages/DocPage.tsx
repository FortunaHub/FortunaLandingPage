import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { DOC_ALIASES, DOC_META, DOC_SLUGS, type DocSlug } from '../config/docs';
import { SeoHead } from '../components/SeoHead';
import { Capture, Diagram } from '../components/UI';

const repository = 'https://github.com/shino-337/Fortuna-Community';
function Source({ path, children, version = 'main' }: { path: string; children: React.ReactNode; version?: string }) {
  return <a className="text-fortuna-pink underline underline-offset-4" href={`${repository}/blob/${version}/${path}`}>{children}</a>;
}
function Next({ to, children }: { to: DocSlug; children: React.ReactNode }) {
  return <Link className="text-fortuna-pink underline underline-offset-4" to={`/docs/${to}`}>{children}</Link>;
}
function Code({ children }: { children: string }) {
  return <pre className="overflow-x-auto rounded-md border border-white/10 bg-black/35 p-4 text-xs leading-6 text-white/80"><code>{children}</code></pre>;
}
function List({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc space-y-2 pl-5">{children}</ul>;
}
function Table({ headings, rows }: { headings: string[]; rows: string[][] }) {
  return <div className="overflow-x-auto"><table className="w-full text-left text-base"><thead><tr>{headings.map(h => <th key={h} scope="col" className="border-b border-white/20 px-3 py-3 font-semibold text-white">{h}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j} className="border-b border-white/10 px-3 py-3 align-top leading-7">{cell}</td>)}</tr>)}</tbody></table></div>;
}
type Section = { id: string; title: string; content: React.ReactNode };
export const DOC_CONTENT: Record<DocSlug, Section[]> = {
  overview: [
    { id: 'purpose', title: 'What Fortuna helps you investigate', content: <p>Fortuna connects Kubernetes workload inventory, ServiceAccounts, RBAC grants, SBOM/CVE evidence, and available runtime observations. Start with a workload, trace the access its identity holds, and inspect the evidence behind a finding before choosing a fix.</p> },
    { id: 'start', title: 'Choose your next step', content: <List><li>New installation: <Next to="getting-started">prepare your lab and open the dashboard</Next>.</li><li>Fortuna already running: <Next to="first-investigation">follow one RBAC investigation</Next>.</li><li>Exploring the interface: <Next to="user-guide">find the right workspace</Next>.</li><li>Operating a deployment: review <Next to="deployment">deployment checks</Next> and <Next to="security">security configuration</Next>.</li></List> },
    { id: 'evidence', title: 'Read the evidence in context', content: <Table headings={['Evidence', 'What it tells you']} rows={[
      ['RBAC path', 'Possible access through workload identities and grants. A path alone does not prove exploitation.'],
      ['SBOM and CVE matches', 'Packages and matches against the available catalog. Missing scans or an empty catalog leave coverage incomplete.'],
      ['Runtime and network observations', 'Activity collected by the configured sensors in the selected time window. No observations do not establish that no activity occurred.'],
      ['Risk score', 'A prioritization signal to review alongside contributing evidence, scope, and freshness.'],
    ]} /> },
    { id: 'versions', title: 'Versions and examples', content: <><p>Use installation instructions and manifests from the same Fortuna release. The repository's main branch can contain changes newer than a published image.</p><p>Screenshots here show a captured lab deployment. Counts, scores, names, and health states are examples; they are not benchmarks or remediation test results.</p><p><Source path="README.md">Product overview and current coverage</Source></p></> },
  ],
  'getting-started': [
    { id: 'prepare', title: '1. Prepare an isolated lab', content: <><List><li>For v1.0.0, use Kubernetes 1.28+ with kubectl configured for the intended cluster.</li><li>Provide a working StorageClass for PostgreSQL and NATS, and access to the published container images.</li><li>Review the Agent's RBAC, host mounts, and Linux capabilities before installing.</li></List><Code>{'kubectl config current-context\nkubectl get nodes\nkubectl get storageclass'}</Code><p>Review the <Source path="docs/01-getting-started/ENVIRONMENT_REQUIREMENTS.md">environment requirements</Source> for your selected version.</p></> },
    { id: 'install', title: '2. Install a matching release', content: <><p>Use a release checkout so the manifests and instructions match. For v1.0.0:</p><Code>{'git clone --branch v1.0.0 --depth 1 https://github.com/shino-337/Fortuna-Community.git\ncd Fortuna-Community'}</Code><p>Follow the <Source version="v1.0.0" path="docs/01-getting-started/QUICKSTART.md">v1.0.0 Quickstart — Public Install</Source>. Set the image version to v1.0.0, configure your own admin password and deployment secrets, create the mTLS material, then deploy infrastructure and Fortuna workloads. Registry authentication is needed only when the packages are private.</p><p>For another release, use the Quickstart inside that checkout. Source rebuilds and database resets are not required for this installation path.</p></> },
    { id: 'open', title: '3. Open the dashboard', content: <><p>With the default namespace and Service name:</p><Code>{'kubectl port-forward -n fortuna svc/fortuna-dashboard 8081:80'}</Code><p>Open <code>http://127.0.0.1:8081/</code> and sign in with the credentials configured during deployment. Complete a password-change prompt if one appears.</p></> },
    { id: 'verify', title: '4. Confirm data is arriving', content: <><List><li>Select your cluster and open Platform Integrity.</li><li>Check Agent sync and processing status in Pipeline &amp; Runtime Health.</li><li>Confirm that an expected workload appears in Kubernetes Inventory.</li><li>Before relying on CVE or runtime results, check their catalog, processing, and sensor coverage.</li></List><p>Inventory and derived findings update after collection and reconciliation. Use the configured sync interval and data timestamps; do not assume a fixed delay.</p><p>Continue with <Next to="first-investigation">your first investigation</Next>. If data is missing, use <Next to="troubleshooting">Troubleshooting</Next>.</p></> },
  ],
  'first-investigation': [
    { id: 'scope', title: '1. Choose one workload', content: <><p>See the <Link className="text-fortuna-pink underline underline-offset-4" to="/docs/architecture#flow">end-to-end investigation flow</Link> for an overview of collection, investigation, and verification.</p><p>Select a cluster, check Pipeline &amp; Runtime Health, then open the workload in Kubernetes Inventory. Record its namespace, pod name, ServiceAccount, and evidence timestamp.</p><p>The captured example uses <code>fortuna-test/rbac-pod</code>. You can follow the same process with an existing workload. To create the deliberate cluster-admin fixture, follow the <Source path="docs/01-getting-started/FIRST_FINDING.md">isolated-lab RBAC walkthrough</Source>, including its prerequisites and cleanup.</p></> },
    { id: 'grants', title: '2. Inspect the identity and grants', content: <><p>Open the ServiceAccount's effective permissions. Trace each relevant binding to its Role or ClusterRole, noting wildcard verbs, sensitive resources, and whether access is namespace-scoped or cluster-wide.</p><Capture src="live-serviceaccount-permissions" alt="Captured ServiceAccount permissions, including wildcard grants. Inspect the binding and role behind each permission." caption="Captured ServiceAccount permissions, including wildcard grants. Inspect the binding and role behind each permission." /></> },
    { id: 'path', title: '3. Follow the RBAC path', content: <><p>In Attack Paths, locate the selected workload and expand the path detail. Match the pod, ServiceAccount, binding, and role to the inventory evidence.</p><Capture src="live-rbac-attack-path-detail" alt="Lab path: rbac-pod → sa-rbac → crb-rbac-admin → cluster-admin. This shows possible access through a grant, not an observed compromise." caption="Lab path: rbac-pod → sa-rbac → crb-rbac-admin → cluster-admin. This shows possible access through a grant, not an observed compromise." /><p>If a group label and its expanded path disagree, use the individual steps and Kubernetes objects to check the relationship before drawing a conclusion.</p></> },
    { id: 'corroborate', title: '4. Check supporting evidence', content: <><p>Review the finding's contributing factors and any runtime evidence for the same workload and time window. Look at SBOM/CVE information only when a scan is available and matching coverage is ready.</p><p>In this capture, rbac-pod has no SBOM. PostgreSQL package data and NATS traffic shown elsewhere in the guide are separate examples, not evidence for this path. A low displayed score does not replace review of a broad RBAC grant.</p></> },
    { id: 'remediate', title: '5. Choose and verify a fix', content: <><p>Determine which permissions the workload actually needs. Review a change to narrow the role or remove the unnecessary binding using your normal Kubernetes change process.</p><List><li>Record the grant and effective authorization before changing it.</li><li>Apply the reviewed change and verify Kubernetes authorization again.</li><li>Wait for a fresh Agent sync and graph reconciliation.</li><li>Confirm current path evidence no longer relies on the removed grant. Check timestamps and distinguish historical findings from current state.</li></List><p>If the grant remains in fresh evidence, record the discrepancy instead of marking remediation complete. The screenshots in this guide do not demonstrate a completed before/after test.</p></> },
  ],
  'user-guide': [
    { id: 'scope', title: 'Set the investigation scope', content: <p>Choose a specific cluster when investigating a workload or opening Runtime Network. Keep cluster, namespace, workload, and time-window filters consistent when comparing pages. Widen the time range or clear filters before interpreting an empty view.</p> },
    { id: 'workspaces', title: 'Find the right workspace', content: <Table headings={['Workspace', 'Use it to']} rows={[
      ['Platform Integrity', 'Start with platform health and telemetry coverage.'],
      ['Pipeline & Runtime Health', 'Inspect Agent sync, processing, catalog readiness, and runtime sensor activity.'],
      ['Findings Queue', 'Select a finding and inspect its evidence, affected resource, score, and workflow state.'],
      ['Kubernetes Inventory', 'Locate a pod or identity and inspect configuration, grants, SBOM, and available runtime context.'],
      ['Attack Paths', 'Follow workload and identity relationships toward sensitive permissions.'],
      ['Runtime Network', 'Inspect observed connections for a selected cluster and time window.'],
      ['Policy Rules', 'Understand the rule associated with a finding.'],
      ['Reports', 'Prepare a time-scoped operational summary, where available for your role.'],
    ]} /> },
    { id: 'triage', title: 'Triage a finding', content: <><p>Start with the risk score, then open the finding detail. Check the affected resource, rule, contributing factors, evidence timestamps, and runtime support. Follow its workload or path links to decide what requires investigation.</p><Capture src="live-finding-detail" alt="Example: excessive RBAC on kube-proxy, score 53, seven capabilities, and no runtime evidence. The score alone does not establish an active attack." caption="Example: excessive RBAC on kube-proxy, score 53, seven capabilities, and no runtime evidence. The score alone does not establish an active attack." /></> },
    { id: 'packages', title: 'Review package and CVE evidence', content: <><p>Open a pod's SBOM, confirm the image and packages, then inspect matching status. An unavailable scan or empty catalog leaves the vulnerability assessment incomplete.</p><Capture src="live-pod-sbom-cve" alt="Separate PostgreSQL example: 48 packages from postgres:15-alpine. The OSV mirror was empty at capture time, so zero CVEs is not a clean verdict." caption="Separate PostgreSQL example: 48 packages from postgres:15-alpine. The OSV mirror was empty at capture time, so zero CVEs is not a clean verdict." /></> },
    { id: 'network', title: 'Review observed network activity', content: <><p>Select the cluster and time window, then filter to the workload of interest. Inspect endpoints and connections. Observed traffic is not a complete reachability assessment or a ready-made network-policy recommendation.</p><Capture src="live-runtime-network" alt="Separate NATS example: two sources, two destinations, and three observed edges in a 15-minute window. This view does not show rbac-pod traffic or external destinations." caption="Separate NATS example: two sources, two destinations, and three observed edges in a 15-minute window. This view does not show rbac-pod traffic or external destinations." /></> },
    { id: 'states', title: 'Interpret empty and blocked views', content: <Table headings={['State', 'Next step']} rows={[
      ['Unauthenticated', 'Sign in again; your session may have expired.'],
      ['Forbidden or cluster outside scope', 'Ask an administrator to check your role and cluster access.'],
      ['No matching data', 'Check filters and time range, then verify ingestion.'],
      ['No telemetry or stale data', 'Check Agent or sensor health and the latest collection timestamp.'],
      ['Unknown runtime status', 'Inspect sensor activity and processing separately; do not infer healthy collection from the summary alone.'],
    ]} /> },
  ],
  architecture: [
    { id: 'topology', title: 'High-level architecture', content: <><Diagram name="fortuna-architecture" title="Fortuna architecture" height={1060} caption="Local and remote Agents send evidence to Core. Dashboard reads Core APIs; PostgreSQL stores state and NATS queues work for Core workers. Dashed input represents optional Falco telemetry." /><p>This diagram shows logical responsibilities. Core workers are part of Core processing, not an additional mandatory deployment. Remote collectors require connectivity and credentials trusted by the management Core.</p></> },
    { id: 'components', title: 'Components and responsibilities', content: <Table headings={['Component', 'Role']} rows={[
      ['Agent · DaemonSet', 'Collects node/workload inventory, extracts SBOM evidence, and sends available runtime observations to Core.'],
      ['Core · Deployment', 'Receives evidence, serves APIs, and coordinates matching, risk, and path processing.'],
      ['Dashboard · Deployment', 'Presents Core data for investigation and operations.'],
      ['PostgreSQL', 'Stores inventory, evidence, findings, and application state.'],
      ['NATS JetStream', 'Queues asynchronous processing work.'],
      ['Optional runtime sensors', 'Supply additional telemetry when installed, configured, and healthy.'],
    ]} /> },
    { id: 'flow', title: 'Evidence and investigation flow', content: <><Diagram name="fortuna-investigation-flow" title="Evidence to remediation verification" height={1200} caption="Collect, ingest, and process evidence; check coverage before investigating. The cluster owner reviews and applies a fix outside Fortuna, then verifies authorization and fresh reconciled evidence." /><p>Agents collect evidence from Kubernetes nodes and send it to Core, using gRPC with mTLS in the documented deployment. Core persists records and uses queued workers to process evidence. The dashboard reads Core APIs.</p><p>Collection, matching, and graph reconciliation are separate stages. A healthy dashboard connection does not mean every evidence pipeline is current.</p></> },
    { id: 'clusters', title: 'Multi-cluster deployment', content: <p>Core, Dashboard, PostgreSQL, and NATS run in the management cluster. Remote clusters run Agents and any required runtime sensors. Remote Agents need connectivity and trusted credentials for the management Core. Keep cluster identity and selected scope consistent when checking their data.</p> },
    { id: 'runtime', title: 'Runtime coverage', content: <p>Falco ingestion and the built-in eBPF path are separate. The current repository overview describes the built-in eBPF implementation as an experimental scaffold; simulated events are not observed workload activity. Verify the collector used by your version and its actual event timestamps.</p> },
    { id: 'integration', title: 'Implementation and integration references', content: <><p>Use the source and documentation for your deployed version when integrating with Core. Dashboard routes are not an API contract, and a list of endpoint names is not a complete API reference.</p><List><li><Source path="docs/02-architecture/ARCHITECTURE.md">Architecture and API domain overview</Source></li><li><Source path="docs/03-components/README.md">Component details</Source></li><li><Source path="README.md">Current implementation coverage</Source></li></List></> },
  ],
  deployment: [
    { id: 'plan', title: 'Plan the deployment', content: <><p>For a first lab, follow <Next to="getting-started">Getting Started</Next>. For an operational deployment, use the <Source path="docs/05-operations/PRODUCTION_DEPLOYMENT.md">production deployment guide</Source> from the matching release.</p><Table headings={['Input', 'Decision to make']} rows={[
      ['Images', 'Choose a published version or digest reachable from every node. Keep Core, Agent, Dashboard, and manifests compatible.'],
      ['Storage', 'Provide persistent storage for PostgreSQL and NATS; plan backup and restore before upgrades.'],
      ['Credentials', 'Configure admin, database, JWT, ingest, and mTLS material required by the selected deployment.'],
      ['Connectivity', 'Verify DNS and Agent-to-Core access. Define dashboard access and any remote-cluster ingress.'],
      ['Evidence coverage', 'Decide whether CVE matching and optional runtime sensors are needed, then verify their readiness.'],
    ]} /></> },
    { id: 'rollout', title: 'Verify rollout and data', content: <><p>For the default namespace and workload names:</p><Code>{'kubectl -n fortuna rollout status deployment/fortuna-core\nkubectl -n fortuna rollout status daemonset/fortuna-agent\nkubectl -n fortuna rollout status deployment/fortuna-dashboard\nkubectl -n fortuna get pods,svc,pvc'}</Code><p>After rollout, check Agent sync, expected inventory, catalog readiness, and sensor activity in the dashboard. Ready pods alone do not confirm complete security coverage.</p></> },
    { id: 'remote', title: 'Add remote clusters', content: <p>Follow the remote-cluster section of the <Source path="docs/01-getting-started/QUICKSTART.md">version-matched Quickstart</Source>. Confirm Core endpoints, certificate trust, registry access, and the remote Agent's first sync. Check that workloads appear under the correct cluster before comparing totals.</p> },
    { id: 'change', title: 'Upgrade deliberately', content: <p>Review release changes, back up persistent state, and record the running image versions before an upgrade. Recheck both rollout and evidence freshness afterward. Database-reset scripts are for disposable environments and are not an upgrade procedure.</p> },
  ],
  security: [
    { id: 'agent', title: 'Review Agent privileges', content: <p>The current Agent uses host PID access, root, host mounts including the containerd socket, and additional Linux capabilities. Review the <Source path="deploy/fortuna-agent-daemonset.yaml">Agent manifest</Source> and its RBAC for your release before granting access to a cluster.</p> },
    { id: 'credentials', title: 'Manage credentials and sessions', content: <List><li>Configure a unique admin password during deployment and complete any required first-login change.</li><li>Use your secret-management process for database, JWT, ingest, and mTLS values.</li><li>An existing database keeps its current admin password; restarting Core is not a password-reset procedure.</li><li>Choose roles and cluster access appropriate to each user. A user-administration role does not imply access to workload findings.</li></List> },
    { id: 'network', title: 'Protect access paths', content: <List><li>Keep local evaluation access on loopback with the documented port-forward.</li><li>For shared dashboard access, configure authenticated HTTPS access appropriate to your environment.</li><li>Limit Agent ingest and database access to the systems that require it; verify mTLS trust before adding remote clusters.</li><li>Rotate credentials and certificates through a planned change, then verify Agent reconnects and user access.</li></List> },
    { id: 'report', title: 'Report a vulnerability', content: <><p>Follow the repository's <Source path="SECURITY.md">security reporting policy</Source>. Use private reporting when available. Remove credentials, tokens, kubeconfigs, and sensitive cluster data from diagnostic material.</p><p>See the <Source path="docs/06-reference/SECURITY.md">deployment security reference</Source> for version-specific configuration.</p></> },
  ],
  troubleshooting: [
    { id: 'workload', title: 'An expected workload is missing', content: <List><li>Confirm the selected cluster, namespace, and filters.</li><li>Check the Agent's latest sync and connectivity in Pipeline &amp; Runtime Health.</li><li>Compare the Kubernetes object with the inventory timestamp. Wait for the configured collection and reconciliation cycle.</li><li>If the object is still absent after a fresh sync, collect the Agent error and affected resource details.</li></List> },
    { id: 'cve', title: 'A workload shows no CVEs', content: <List><li>Confirm that the expected image has an SBOM and package records.</li><li>Check catalog availability and freshness, then matching status.</li><li>Resolve ingestion or matching failures before treating the result as complete. Zero matches with an empty catalog do not establish a clean image.</li></List> },
    { id: 'runtime', title: 'Runtime or network views are empty', content: <List><li>Check the cluster, workload filter, and time window.</li><li>Confirm the required collector is installed, enabled, and reporting recent activity.</li><li>Inspect sensor activity separately from runtime-layer or promotion status.</li><li>Distinguish no observed events from disabled, stale, or unsupported collection.</li></List> },
    { id: 'access', title: 'Sign-in or access fails', content: <p>Use the credentials configured for this deployment and complete any password-change prompt. For an existing database, use its current account credentials. Ask an administrator to check account status, role, and cluster scope; do not reset the database to recover access.</p> },
    { id: 'pods', title: 'A Fortuna workload does not start', content: <><Table headings={['Symptom', 'Check first']} rows={[
      ['ImagePullBackOff', 'Image name/tag, registry reachability, and pull secret if required.'],
      ['Pending', 'Pod events, available node resources, scheduling constraints, and PVC binding.'],
      ['CrashLoopBackOff', 'Container logs, database/NATS connectivity, required secrets, and migrations.'],
      ['Agent cannot reach Core', 'Service endpoints, DNS, network rules, and certificate trust.'],
    ]} /><Code>{'kubectl -n fortuna get pods,pvc\nkubectl -n fortuna get events --sort-by=.lastTimestamp\nkubectl -n fortuna logs deployment/fortuna-core --tail=100'}</Code><p>Adjust the namespace and workload names if your deployment differs.</p></> },
    { id: 'support', title: 'Collect a useful issue report', content: <p>Record the Fortuna version, Kubernetes/runtime version, affected cluster and workload, selected time window, evidence timestamps, and expected versus observed behavior. Include relevant errors after removing secrets. Consult the <Source path="docs/05-operations/DEPLOYMENT.md">operations guide</Source> for deeper diagnostics.</p> },
  ],
};

export default function DocPage() {
  const { slug } = useParams<{ slug: string }>();
  if (slug && Object.hasOwn(DOC_ALIASES, slug)) return <Navigate to={`/docs/${DOC_ALIASES[slug]}`} replace />;
  if (!slug || !DOC_SLUGS.includes(slug as DocSlug)) return <Navigate to="/docs/overview" replace />;
  const doc = DOC_META.find(item => item.slug === slug)!;
  const sections = DOC_CONTENT[doc.slug];
  const next = DOC_META[DOC_META.indexOf(doc) + 1];

  const TableOfContents = () => (
    <nav aria-label="On this page" className="rounded-lg border border-white/10 p-5">
      <p className="mb-3 text-sm font-semibold text-white">On this page</p>
      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        {sections.map(section => <li key={section.id}><a className="text-sm leading-6 text-white/65 hover:text-fortuna-pink" href={`#${section.id}`}>{section.title}</a></li>)}
      </ul>
    </nav>
  );

  return (
    <>
      <SeoHead route={`docs_${slug.replace(/-/g, '_')}`} />
      <article className="max-w-4xl">
        <header className="mb-8"><p className="mb-3 text-xs font-semibold text-fortuna-pink">{doc.group}</p><h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{doc.title}</h1><p className="mt-4 max-w-2xl text-base leading-7 text-white/65">{doc.description}</p></header>
        {/* Mobile TOC */}
        <div className="mb-10 lg:hidden">
          <nav aria-label="On this page" className="rounded-lg border border-white/10 p-5"><p className="mb-3 text-sm font-semibold text-white">On this page</p><ul className="grid gap-2 sm:grid-cols-2">{sections.map(section => <li key={section.id}><a className="text-sm leading-6 text-white/65 hover:text-fortuna-pink" href={`#${section.id}`} onClick={(e) => { e.preventDefault(); const element = document.getElementById(section.id); if (element) { element.scrollIntoView({ behavior: 'smooth', block: 'start' }); element.focus({ preventScroll: true }); window.history.pushState(null, '', `#${section.id}`); } }}>{section.title}</a></li>)}</ul></nav>
        </div>
        <div className="space-y-10">{sections.map(section => <section key={section.id} id={section.id} className="scroll-mt-24"><h2 className="mb-4 text-xl font-semibold text-white">{section.title}</h2><div className="space-y-4 text-base leading-7 text-white/70">{section.content}</div></section>)}</div>
        {next && <footer className="mt-12 border-t border-white/10 pt-6"><Next to={next.slug}>Next: {next.title}</Next></footer>}
      </article>
    </>
  );
}
