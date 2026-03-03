import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Zap, BookOpen, Info } from 'lucide-react';
import { HeroSection, KeyStrengths, CTASection } from './landing';

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <KeyStrengths />

      {/* Quick links to full pages */}
      <section className="py-24 bg-fortuna-dark border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/features"
              className="glass-card p-8 border border-white/5 rounded-xl hover:border-fortuna-pink/30 transition-colors group flex items-center gap-4"
            >
              <div className="w-14 h-14 pink-gradient/80 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-tight mb-1">Features</h3>
                <p className="text-white/50 text-xs">SBOM, CVE, Network Designer, Attack Path, PCE, Runtime Signals</p>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-fortuna-pink ml-auto" />
            </Link>
            <Link
              to="/docs"
              className="glass-card p-8 border border-white/5 rounded-xl hover:border-fortuna-pink/30 transition-colors group flex items-center gap-4"
            >
              <div className="w-14 h-14 pink-gradient/80 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-tight mb-1">Documentation</h3>
                <p className="text-white/50 text-xs">Getting Started, Architecture, Deployment, API</p>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-fortuna-pink ml-auto" />
            </Link>
            <Link
              to="/about"
              className="glass-card p-8 border border-white/5 rounded-xl hover:border-fortuna-pink/30 transition-colors group flex items-center gap-4"
            >
              <div className="w-14 h-14 pink-gradient/80 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Info className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-tight mb-1">About</h3>
                <p className="text-white/50 text-xs">Fortuna platform overview</p>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-fortuna-pink ml-auto" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
