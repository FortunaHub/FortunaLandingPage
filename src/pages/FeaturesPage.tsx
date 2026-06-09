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
          className="inline-flex min-h-11 items-center gap-2 text-white/65 hover:text-fortuna-pink text-sm mb-8 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Back to homepage
        </Link>
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-black uppercase leading-tight mb-4 text-balance">
            Inspect the Fortuna control plane
          </h1>
          <p className="text-white/68 max-w-3xl mx-auto text-lg leading-8">
            Supply-chain visibility, live CVE intelligence, Zero Trust network design with real traffic, attack-path modeling, centralized risk insights, Pod Capability Engine, and runtime/process monitoring for Kubernetes security operations.
          </p>
        </div>
      </div>
      <FeaturesSection />
    </div>
  );
}
