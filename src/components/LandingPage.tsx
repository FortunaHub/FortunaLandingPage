import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, BookOpen, Info } from 'lucide-react';
import HeroSection from './landing/HeroSection';
import { SeoHead } from './SeoHead';

const capabilities = [
  {
    icon: Zap,
    title: 'Attack Paths',
    description: 'Trace RBAC relationships from workload identity through role bindings toward sensitive cluster access.',
  },
  {
    icon: BookOpen,
    title: 'Workload Evidence',
    description: 'Connect SBOM packages, CVE matches, pod security, and runtime observations to attack context.',
  },
  {
    icon: Info,
    title: 'Unified Risk',
    description: 'One risk score with visible contributing evidence helps you prioritize remediation before spending time.',
  },
];

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden bg-fortuna-dark">
      <SeoHead route="home" />

      {/* Hero */}
      <HeroSection />

      {/* Capabilities Grid */}
      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container-max">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Three ways Fortuna helps you investigate
            </h2>
            <p className="text-lg text-white/70">
              Connect identity and privilege paths with evidence to decide what's worth fixing first.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="p-6 rounded-lg border border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05] transition-colors"
                >
                  <Icon className="w-6 h-6 text-fortuna-pink mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{cap.title}</h3>
                  <p className="text-sm text-white/65 leading-relaxed">{cap.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Next Steps CTA */}
      <section className="py-16 md:py-20 border-t border-white/5">
        <div className="container-max text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to explore?</h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">
            Start with a step-by-step walkthrough of a real Kubernetes attack scenario.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/docs/first-investigation"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-fortuna-pink text-white font-semibold hover:bg-[#EA2A70] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink"
            >
              Begin investigation walkthrough <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://github.com/shino-337/Fortuna-Community"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white font-semibold hover:border-white/40 hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
