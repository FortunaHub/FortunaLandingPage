import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import AboutSection from '../components/landing/AboutSection';

export default function AboutPage() {
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
      </div>
      <AboutSection />
    </div>
  );
}
