import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import FeaturesSection from '../components/landing/FeaturesSection';

export default function FeaturesPage() {
  return (
    <div className="overflow-x-hidden bg-fortuna-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-fortuna-pink text-sm mb-8 transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Back to Home
        </Link>
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">
            Fortuna <span className="text-fortuna-pink">Features</span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            End-to-end Kubernetes security: SBOM, CVE matching, Risk Center, Attack Path Analysis, Network Designer, Pod Capability Engine, and runtime signals — all in one platform.
          </p>
        </div>
      </div>
      <FeaturesSection />
    </div>
  );
}
