import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { ChevronRight, Terminal, Layers, Rocket, FileCode, BookOpen, Cpu, ShieldCheck, Wrench } from 'lucide-react';
import { DOC_META } from '../config/docs';

const ICONS = { Terminal, Layers, Rocket, FileCode, BookOpen, Cpu, ShieldCheck, Wrench };

export default function DocsLayout() {
  return (
    <div className="min-h-screen bg-fortuna-dark">
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row">
        <aside
          className="lg:w-72 xl:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#080808] lg:sticky lg:top-16 lg:self-start lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto"
          aria-label="Documentation navigation"
        >
          <div className="p-6 lg:py-10 lg:pl-8 lg:pr-6">
            <Link
              to="/"
              className="inline-flex min-h-11 items-center gap-2 text-white/65 hover:text-fortuna-pink text-sm mb-8 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Back to homepage
            </Link>

            <h1 className="text-2xl font-black uppercase leading-tight">Documentation</h1>
            <p className="text-white/60 text-xs mt-3 leading-relaxed">
              Curated product docs for FortunaHub: quickstart, deployment, architecture, components, API
              contracts, multi-cluster telemetry, SBOM/CVE evidence, attack paths, identity context, and unified risk operations.
            </p>

            <nav className="mt-8 flex flex-col gap-1" aria-label="Documentation sections">
              {DOC_META.map((doc) => {
                const Icon = ICONS[doc.icon];
                return (
                  <NavLink
                    key={doc.slug}
                    to={doc.slug}
                    className={({ isActive }) =>
                      [
                        'flex min-h-14 items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fortuna-pink',
                        isActive
                          ? 'bg-fortuna-pink/15 border-fortuna-pink/40 text-white'
                          : 'text-white/65 hover:bg-white/5 hover:text-white border-white/5',
                      ].join(' ')
                    }
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/5 border border-white/10">
                      <Icon className="w-4 h-4 text-fortuna-pink" />
                    </span>
                    <span className="flex flex-col min-w-0">
                      <span className="font-bold uppercase tracking-tight text-xs leading-tight">{doc.title}</span>
                      <span className="text-[10px] font-mono text-white/45 truncate mt-0.5">/docs/{doc.slug}</span>
                    </span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="flex-1 min-w-0 p-6 lg:py-10 lg:pr-10 lg:pl-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
