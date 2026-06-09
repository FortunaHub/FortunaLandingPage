import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, FileText, Info, Zap } from 'lucide-react';
import { HeroSection, KeyStrengths, ProductProofSection, CTASection } from './landing';

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <ProductProofSection />
      <KeyStrengths />

      <section className="py-24 bg-fortuna-dark border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-sm font-semibold text-fortuna-pink">Evaluate Fortuna</p>
              <h2 className="text-3xl md:text-4xl font-black uppercase leading-tight">
                Choose the next depth of detail
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-white/62">
              Move from product evidence into capabilities, implementation notes, or company context
              without losing the Kubernetes security workflow.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Link
              to="/features"
              className="group rounded-lg border border-white/10 bg-white/[0.035] p-6 transition-colors hover:border-fortuna-pink/35 hover:bg-white/[0.055] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink"
            >
              <div className="mb-8 flex items-center justify-between">
                <Zap className="h-6 w-6 text-fortuna-pink" />
                <ArrowRight className="h-5 w-5 text-white/35 transition-transform group-hover:translate-x-1 group-hover:text-fortuna-pink" />
              </div>
              <h3 className="text-lg font-bold text-white">Inspect platform capabilities</h3>
              <p className="mt-3 text-sm leading-6 text-white/58">
                SBOM, CVE matching, network design, attack paths, PCE, and runtime signals.
              </p>
            </Link>
            <Link
              to="/docs"
              className="group rounded-lg border border-white/10 bg-white/[0.035] p-6 transition-colors hover:border-fortuna-pink/35 hover:bg-white/[0.055] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink"
            >
              <div className="mb-8 flex items-center justify-between">
                <BookOpen className="h-6 w-6 text-fortuna-pink" />
                <ArrowRight className="h-5 w-5 text-white/35 transition-transform group-hover:translate-x-1 group-hover:text-fortuna-pink" />
              </div>
              <h3 className="text-lg font-bold text-white">Read architecture notes</h3>
              <p className="mt-3 text-sm leading-6 text-white/58">
                Deployment model, API surfaces, prerequisites, and operational runbooks.
              </p>
            </Link>
            <Link
              to="/about"
              className="group rounded-lg border border-white/10 bg-white/[0.035] p-6 transition-colors hover:border-fortuna-pink/35 hover:bg-white/[0.055] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink"
            >
              <div className="mb-8 flex items-center justify-between">
                <Info className="h-6 w-6 text-fortuna-pink" />
                <FileText className="h-5 w-5 text-white/35 transition-transform group-hover:translate-x-1 group-hover:text-fortuna-pink" />
              </div>
              <h3 className="text-lg font-bold text-white">Understand the platform</h3>
              <p className="mt-3 text-sm leading-6 text-white/58">
                Why Fortuna brings security evidence, topology, and runtime context together.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
