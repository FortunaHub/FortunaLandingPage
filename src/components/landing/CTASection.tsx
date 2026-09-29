import React from 'react';
import { Link } from 'react-router-dom';
import Tooltip from '../Tooltip';

export default function CTASection() {
  return (
    <section className="py-24 bg-fortuna-dark relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fortuna-pink/50 to-transparent" />
      <div className="absolute inset-0 bg-fortuna-pink/5" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-black leading-tight uppercase mb-6 text-balance">
          Start investigating your Kubernetes attack paths
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-base leading-8 text-white/68">
          Trace workload identity to broader permissions, connect SBOM/CVE evidence, inspect runtime context, and prioritize remediation from one investigation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/docs"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-fortuna-pink px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-[#EA2A70] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink"
          >
            Explore your first attack path
          </Link>
          <Link
            to="/features"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/15 px-8 py-4 text-sm font-semibold text-white/85 transition-colors hover:border-white/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
          >
            View capabilities
          </Link>
          <a
            href="https://github.com/shino-337/Fortuna-Community"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/15 px-8 py-4 text-sm font-semibold text-white/85 transition-colors hover:border-white/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
