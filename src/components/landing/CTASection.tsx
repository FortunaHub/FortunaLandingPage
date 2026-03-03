import React from 'react';
import { Link } from 'react-router-dom';
import Tooltip from '../Tooltip';

export default function CTASection() {
  return (
    <section className="py-24 bg-fortuna-dark relative overflow-hidden">
      <div className="absolute inset-0 pink-gradient opacity-5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-8">
          Ready to secure your <br /> Kubernetes fleet?
        </h2>
        <Tooltip content="Join Fortuna Today" position="top">
          <Link
            to="/register"
            className="inline-flex px-12 py-5 pink-gradient text-white font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(209,26,94,0.3)]"
          >
            Request Trial Now
          </Link>
        </Tooltip>
      </div>
    </section>
  );
}
