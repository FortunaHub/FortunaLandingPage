import React from 'react';
import Tooltip from '../Tooltip';
import Logo from '../Logo';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 bg-fortuna-dark border-t border-white/5 scroll-mt-[5.5rem]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8 flex justify-center">
          <Tooltip content="FortunaHub" position="top">
            <div className="w-20 h-20 shrink-0 rounded-full bg-fortuna-card border border-white/10 flex items-center justify-center overflow-hidden p-1 shadow-[0_0_50px_rgba(209,26,94,0.2)]">
              <Logo size={64} className="object-contain" />
            </div>
          </Tooltip>
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-6">
          About <span className="text-fortuna-pink">FortunaHub</span>
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed mb-6">
          Fortuna is a Kubernetes security and risk management platform. It unifies SBOM extraction, CVE matching, Pod Capability Engine (PCE), attack path analysis, and runtime signals in a single solution.
        </p>
        <p className="text-white/50 max-w-2xl mx-auto text-sm leading-relaxed">
          Production-ready with mTLS for inter-component communication, NATS JetStream for high availability, and Prometheus metrics for observability. Designed for SRE and security teams who need visibility without performance overhead.
        </p>
      </div>
    </section>
  );
}
