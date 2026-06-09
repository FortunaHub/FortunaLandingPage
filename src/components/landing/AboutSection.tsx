import React from 'react';
import { Activity, DatabaseZap, Network, ShieldCheck } from 'lucide-react';

const principles = [
  {
    icon: Network,
    title: 'Topology before opinion',
    copy: 'Fortuna starts with workloads, namespaces, policies, and observed traffic. Security review begins from the cluster shape teams already operate.',
  },
  {
    icon: ShieldCheck,
    title: 'Risk tied to evidence',
    copy: 'SBOM, CVE, capability, and runtime signals stay connected to the fix decision instead of becoming disconnected queues.',
  },
  {
    icon: Activity,
    title: 'Runtime changes matter',
    copy: 'Live traffic and process signals keep posture reviews aligned with changing workloads, not only with yesterday’s manifests.',
  },
  {
    icon: DatabaseZap,
    title: 'Automation must explain itself',
    copy: 'Risk scoring, policy evaluation, and path analysis need clear inputs so platform and security teams can defend the decision.',
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
            <p className="mb-4 text-sm font-semibold text-fortuna-pink">Operating model</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight text-balance">
              Security decisions should survive handoff
            </h2>
          </div>
          <div>
            <p className="text-white/70 text-lg leading-8 mb-6">
              Kubernetes risk crosses several teams before it is fixed: platform engineers, service
              owners, security reviewers, and incident responders. Fortuna keeps the evidence in one
              place so a finding can move from discovery to remediation without losing context.
            </p>
            <p className="text-white/62 text-sm leading-7">
              The product combines SBOM extraction, live CVE matching, Risk Center insights,
              attack-path analysis, Zero Trust Network Designer, Pod Capability Engine, and runtime
              monitoring for teams that need current cluster evidence without adding another queue.
            </p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-4">
          {principles.map(({ icon: Icon, title, copy }) => (
            <div key={title} className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
              <Icon className="mb-5 h-6 w-6 text-fortuna-pink" />
              <h3 className="text-base font-bold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/62">{copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-lg border border-white/10 bg-[#08080A] p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-sm font-bold text-white">Built for review</p>
              <p className="mt-2 text-sm leading-6 text-white/62">
                Every capability is shaped around questions reviewers ask during posture, exposure, and incident work.
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-white">Designed for operations</p>
              <p className="mt-2 text-sm leading-6 text-white/62">
                DaemonSet collection, event pipelines, and Prometheus-friendly metrics fit cluster operations instead of bypassing them.
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-white">Specific by default</p>
              <p className="mt-2 text-sm leading-6 text-white/62">
                The interface names workloads, policies, CVEs, paths, and runtime signals so teams can act on the exact evidence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
