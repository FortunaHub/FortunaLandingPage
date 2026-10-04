import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CircleCheck, GitBranch, Gauge, PackageSearch, Search, Wrench, Network } from 'lucide-react';
import HeroSection from './landing/HeroSection';
import { SeoHead } from './SeoHead';

const GITHUB_URL = 'https://github.com/shino-337/Fortuna-Community';

const capabilities = [
  {
    icon: GitBranch,
    title: 'Attack Paths',
    description: 'Trace RBAC relationships from workload identity through role bindings toward sensitive cluster access.',
    to: '/features#attack-paths',
  },
  {
    icon: PackageSearch,
    title: 'Workload Evidence',
    description: 'Connect SBOM packages, CVE matches, pod security, and runtime observations to attack context.',
    to: '/features#workload-evidence',
  },
  {
    icon: Gauge,
    title: 'Unified Risk',
    description: 'One risk score with visible contributing evidence helps you decide what to remediate first.',
    to: '/features#unified-risk',
  },
];

const workflow = [
  {
    icon: Search,
    phase: 'Discover',
    copy: 'Start from a finding, workload, CVE, identity, or runtime signal without losing context.',
  },
  {
    icon: Network,
    phase: 'Triage',
    copy: 'Use the risk score, path evidence, and telemetry freshness to decide what deserves action.',
  },
  {
    icon: Wrench,
    phase: 'Remediate',
    copy: 'Hand off the exact pod, ServiceAccount, role, or package that needs the fix.',
  },
  {
    icon: CircleCheck,
    phase: 'Verify',
    copy: 'Confirm the grant or exposure is gone in fresh, reconciled evidence after the change lands.',
  },
];

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden bg-fortuna-dark">
      <SeoHead route="home" />

      {/* Hero */}
      <HeroSection />

      {/* Capabilities Grid */}
      <section aria-labelledby="capabilities-heading" className="py-16 md:py-24 border-t border-white/5">
        <div className="container-max">
          <div className="mb-12 max-w-2xl">
            <h2 id="capabilities-heading" className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white text-balance">
              Three ways Fortuna helps you investigate
            </h2>
            <p className="text-lg text-white/70">
              Connect identity and privilege paths with evidence to decide what's worth fixing first.
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <li key={cap.title}>
                  <Link
                    to={cap.to}
                    className="group flex h-full flex-col p-6 rounded-lg border border-white/10 bg-white/[0.03] hover:border-fortuna-pink/35 hover:bg-white/[0.05] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink"
                  >
                    <Icon className="w-6 h-6 text-fortuna-pink mb-4" aria-hidden="true" />
                    <h3 className="text-lg font-semibold text-white mb-2">{cap.title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{cap.description}</p>
                    <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 group-hover:text-fortuna-pink transition-colors">
                      Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Investigation workflow */}
      <section aria-labelledby="workflow-heading" className="py-16 md:py-24 border-t border-white/5">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
            <div>
              <p className="mb-3 text-sm font-semibold text-fortuna-pink">Investigation workflow</p>
              <h2 id="workflow-heading" className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white text-balance">
                From finding to verified fix, with evidence attached
              </h2>
              <p className="text-lg text-white/70 mb-8">
                Security reviewers, platform teams, and service owners work from the same connected evidence, so context
                doesn't get lost between discovery and remediation.
              </p>
              <Link
                to="/docs/first-investigation"
                className="inline-flex items-center gap-2 text-sm font-semibold text-fortuna-pink hover:text-[#EA2A70] underline-offset-4 hover:underline"
              >
                Read the first investigation guide <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {workflow.map(({ icon: Icon, phase, copy }, i) => (
                <li key={phase} className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md border border-fortuna-pink/25 bg-fortuna-pink/10">
                      <Icon className="h-5 w-5 text-fortuna-pink" aria-hidden="true" />
                    </span>
                    <span className="text-xs font-mono text-white/50">0{i + 1}</span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{phase}</h3>
                  <p className="text-sm leading-6 text-white/70">{copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Next Steps CTA */}
      <section aria-labelledby="cta-heading" className="relative py-16 md:py-24 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fortuna-pink/50 to-transparent" aria-hidden="true" />
        <div className="container-max text-center">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white text-balance">
            Ready to trace your first attack path?
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
            Follow a step-by-step walkthrough of a real Kubernetes RBAC scenario, or install Fortuna in a lab cluster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/docs/first-investigation"
              className="inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3 rounded-lg bg-fortuna-pink text-white font-semibold hover:bg-[#EA2A70] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink"
            >
              Begin the walkthrough <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              to="/docs/getting-started"
              className="inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white font-semibold hover:border-white/40 hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink"
            >
              Install Fortuna
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/55">
            Prefer a guided tour?{' '}
            <Link to="/register" className="text-white/80 underline underline-offset-4 hover:text-fortuna-pink">
              Request a demo
            </Link>{' '}
            or{' '}
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-white/80 underline underline-offset-4 hover:text-fortuna-pink">
              browse the source on GitHub
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
