import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, CircleCheck, DatabaseZap, Network, Search, ShieldCheck, Wrench } from 'lucide-react';

const principles = [
  {
    icon: Network,
    title: 'Evidence before opinion',
    copy: 'Start from workload identity, RBAC permissions, SBOM, runtime signals, and observed traffic. Security conclusions follow from collected evidence, not the other way around.',
  },
  {
    icon: ShieldCheck,
    title: 'Connected investigation',
    copy: 'Attack paths, SBOM, CVE, capabilities, and runtime observations stay linked to one security question instead of becoming disconnected findings.',
  },
  {
    icon: Activity,
    title: 'Observed and inferred',
    copy: 'Runtime network, Falco, and process signals keep posture reviews aligned with changing workloads, not only with yesterday’s manifests.',
  },
  {
    icon: DatabaseZap,
    title: 'Explainable results',
    copy: 'Risk scoring, path analysis, and rule matching need transparent inputs so security and platform teams can defend the decision and understand limits.',
  },
] as const;

const handoffSteps = [
  {
    icon: Search,
    phase: 'Discover',
    owner: 'Security reviewer',
    copy: 'Start from a finding, workload, CVE, identity, attack path, or runtime signal without losing context.',
  },
  {
    icon: Network,
    phase: 'Triage',
    owner: 'Platform team',
    copy: 'Use the unified risk score, path evidence, and runtime signal quality to decide what deserves action.',
  },
  {
    icon: Wrench,
    phase: 'Remediate',
    owner: 'Service owner',
    copy: 'Hand off the exact pod, service account, role, package, path, or runtime event needed to make the fix.',
  },
  {
    icon: CircleCheck,
    phase: 'Verify',
    owner: 'Shared review',
    copy: 'Confirm that exposure, attack-path reachability, runtime signals, or findings changed after the remediation lands.',
  },
] as const;

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 bg-fortuna-dark scroll-mt-[5.5rem]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.86fr_1.14fr] gap-12 lg:gap-16 items-start">
          <div>
            <p className="mb-4 text-sm font-semibold text-fortuna-pink">Product philosophy</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight text-balance">
              Understand Kubernetes attack paths and the evidence behind them
            </h2>
          </div>
          <div>
            <p className="text-white/70 text-lg leading-8 mb-6">
              Fortuna is a Kubernetes security project built around attack-path investigation: understand what a workload can access, why that access matters, and what evidence supports the risk. FortunaHub represents the open-source project and documentation site.
            </p>
            <p className="text-white/70 text-sm leading-7">
              The product combines workload identity and RBAC analysis, attack-path discovery, SBOM/CVE matching, findings triage, runtime visibility, and telemetry health so security teams can move from one investigation without losing context.
            </p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-4">
          {principles.map(({ icon: Icon, title, copy }) => (
            <div key={title} className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
              <Icon className="mb-5 h-6 w-6 text-fortuna-pink" />
              <h3 className="text-base font-bold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/70">{copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-lg border border-white/10 bg-[#08080A] p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_1.25fr] gap-8 lg:gap-12">
            <div>
              <p className="text-sm font-bold text-fortuna-pink">Investigation workflow</p>
              <h3 className="mt-4 text-2xl sm:text-3xl font-black uppercase leading-tight text-balance">
                Keep evidence and context connected through investigation
              </h3>
              <p className="mt-5 text-sm leading-7 text-white/70">
                Fortuna connects identity, attack paths, evidence, and runtime signals through each investigation phase so findings don't lose context during discovery, triage, remediation, and verification.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
                <Link
                  to="/docs"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-fortuna-pink/45 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-fortuna-pink/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink"
                >
                  Start investigation <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://github.com/shino-337/Fortuna-Community"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-5 py-3 text-sm font-semibold text-white/85 transition-colors hover:border-white/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
                >
                  View on GitHub
                </a>
              </div>
            </div>
            <div className="divide-y divide-white/10 border-y border-white/10">
              {handoffSteps.map(({ icon: Icon, phase, owner, copy }) => (
                <div key={phase} className="grid grid-cols-[2.75rem_1fr] gap-4 py-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md border border-fortuna-pink/25 bg-fortuna-pink/10">
                    <Icon className="h-5 w-5 text-fortuna-pink" />
                  </div>
                  <div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <p className="text-sm font-bold text-white">{phase}</p>
                      <p className="text-xs font-semibold text-white/60">{owner}</p>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-white/70">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
