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
          Review your Kubernetes risk workflow with Fortuna
        </h2>
        <p className="mx-auto mb-9 max-w-2xl text-base leading-8 text-white/68">
          Bring a cluster posture question, an attack-path concern, or a network policy workflow.
          The demo can focus on the evidence your team needs to trust first.
        </p>
        <Tooltip content="Discuss your cluster risk workflow" position="top">
          <Link
            to="/register"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-fortuna-pink px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-[#EA2A70] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink"
          >
            Request a demo
          </Link>
        </Tooltip>
      </div>
    </section>
  );
}
