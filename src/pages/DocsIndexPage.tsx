import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Terminal, Layers, Rocket, FileCode, BookOpen, Cpu } from 'lucide-react';
import { DOC_META } from '../config/docs';

const ICONS = { Terminal, Layers, Rocket, FileCode, BookOpen, Cpu };

export default function DocsIndexPage() {
  return (
    <div className="min-h-screen bg-fortuna-dark">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mb-12">
          <h1 className="text-3xl font-black uppercase tracking-tight">Documentation</h1>
          <p className="text-white/50 text-sm mt-2 max-w-xl">
            Fortuna platform guides and reference. Overview, components, getting started, architecture, deployment, and API.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-fortuna-pink text-sm mb-12 transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Back to Home
        </Link>

        <div className="space-y-4">
          {DOC_META.map((doc) => {
            const Icon = ICONS[doc.icon];
            return (
              <Link
                key={doc.slug}
                to={`/docs/${doc.slug}`}
                className="block glass-card p-6 border border-white/5 rounded-xl hover:border-fortuna-pink/30 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 pink-gradient/80 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold uppercase tracking-tight">{doc.title}</h2>
                    <p className="text-white/50 text-xs mt-1">/docs/{doc.slug}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-fortuna-pink transition-colors" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
