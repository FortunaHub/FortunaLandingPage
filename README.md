# Fortuna Landing Page

Public landing page and lightweight documentation site for the Fortuna Kubernetes security platform.

## What This Site Describes

Fortuna is a Kubernetes security and risk management platform with:

- SBOM extraction from workload images through node-local Agents and containerd.
- OSV-backed CVE matching and package intelligence stored in PostgreSQL.
- One unified user-facing risk score across dashboard, findings, inventory, and reports.
- Findings Queue workflow for triage, evidence review, export, and remediation tracking.
- Attack Paths for RBAC escalation, service-account token paths, host/node escape paths, and lateral movement.
- Runtime Network for observed pod, service, and external traffic by cluster.
- Kubernetes Inventory for pods, service accounts, roles, bindings, SBOM, runtime, and identity detail.
- Policy Rules catalog with rule metadata and linked findings.
- Pipeline & Runtime Health for Agent sync, Falco/runtime visibility, pipeline processing, and data freshness.
- Multi-cluster telemetry: one management stack receives Agent/Falco data from remote clusters using stable `cluster_id` ownership.

## Repository Structure

| Path | Purpose |
|------|---------|
| `src/components/landing/` | Homepage sections and feature proof blocks |
| `src/pages/` | Feature, docs, about, and demo request pages |
| `src/config/landing.ts` | Feature taxonomy, copy, tags, and screenshot mapping |
| `src/config/docs.ts` | Documentation navigation metadata |
| `public/images/` | Product screenshots and marketing images |
| `.github/workflows/deploy-gh-pages.yml` | GitHub Pages build and deploy workflow |

## Run Locally

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run lint
npm run build
npm run preview
```

For GitHub Pages under a repository subpath:

```bash
VITE_BASE_PATH=/FortunaLandingPage/ npm run build
```

## GitHub Pages Deployment

The workflow in `.github/workflows/deploy-gh-pages.yml` builds on pushes to `main`.

Useful repository variables:

- `VITE_BASE_PATH`: set to `/FortunaLandingPage/` when serving from `https://<org>.github.io/FortunaLandingPage/`.
- `VITE_ROUTER_BASENAME`: optional explicit router basename when the site is hosted below a subpath.

Optional secret:

- `VITE_FORMSPREE_ENDPOINT`: demo request form endpoint. If omitted, the app uses the configured fallback endpoint in `RegisterPage.tsx`.

## Refresh Product Screenshots

Screenshots should reflect the current Fortuna dashboard state. Refresh them from the product repository's reviewed dashboard
captures before publishing.

Recommended capture size is `1440x1000`.

Current landing page image mapping:

| Landing image | Source screenshot |
|---------------|-------------------|
| `dashboard-overview.png` | Operations Dashboard |
| `platform-integrity.png`, `platform-ui-03.png` | Platform Integrity |
| `risk-operations.png`, `platform-ui-01.png`, `attack-path-viz.png` | Findings Queue |
| `resources.png`, `platform-ui-02.png` | Kubernetes Inventory and SBOM context |
| `attack-analysis.png`, `attack-path-analysis.png`, `attack-path-graph-view.png`, `attack-path-scenario.png` | Attack Paths |
| `network-activity.png`, `Network-design.png`, `network-designer.png`, `realtime-network-activity.png` | Runtime Network |
| `policy-rules.png`, `service-security.png` | Policy Rules |
| `monitoring.png`, `process-runtime-monitoring.png`, `system-monitoring.png` | Pipeline & Runtime Health |
| `reports.png`, `settings-admin.png` | Reports |

Do not commit screenshots that expose private customer names, tokens, kubeconfigs, credentials, or incident data.

## Content Accuracy Notes

- Admission webhook enforcement, SIEM export, OIDC/SAML, and advanced federation controls are roadmap items in the product README unless the product repo says otherwise.
- Remote clusters should run Agent/Falco only; Core, Dashboard, PostgreSQL, and NATS run once in the management cluster.
- Browser WebSocket origins must be allowlisted in Core when demonstrating live Findings Queue streams through a NodePort or custom host.
