import React from 'react';
import { Activity, Network, ShieldCheck } from 'lucide-react';

const principles = [
  {
    icon: Network,
    title: 'Topology before claims',
    copy: 'Fortuna starts with workloads, policies, and observed traffic so teams can see the actual cluster shape.',
  },
  {
    icon: ShieldCheck,
    title: 'Risk tied to evidence',
    copy: 'SBOM, CVE, capability, and runtime signals stay connected to the decision they support.',
  },
  {
    icon: Activity,
    title: 'Operations stay current',
    copy: 'Live telemetry and event-driven refreshes keep posture reviews aligned with changing workloads.',
  },
] as const;

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 bg-fortuna-dark border-t border-white/5 scroll-mt-[5.5rem]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.86fr_1.14fr] gap-12 lg:gap-16 items-start">
          <div>
            <p className="mb-4 text-sm font-semibold text-fortuna-pink">About FortunaHub</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight text-balance">
              Built for teams that need Kubernetes risk to be inspectable
            </h2>
          </div>
          <div>
            <p className="text-white/70 text-lg leading-8 mb-6">
              Fortuna brings together SBOM extraction, live CVE matching, Risk Center insights,
              attack-path analysis, Zero Trust Network Designer, Pod Capability Engine, and
              runtime monitoring in one operational surface.
            </p>
            <p className="text-white/62 text-sm leading-7">
              The platform is designed for SRE and security teams that need current cluster evidence
              without turning every vulnerability, policy gap, or pod capability into a disconnected queue.
            </p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
          {principles.map(({ icon: Icon, title, copy }) => (
            <div key={title} className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
              <Icon className="mb-5 h-6 w-6 text-fortuna-pink" />
              <h3 className="text-base font-bold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/62">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
