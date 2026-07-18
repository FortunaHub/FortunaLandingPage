import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import AboutSection from '../components/landing/AboutSection';

const base = import.meta.env.BASE_URL;

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden bg-fortuna-dark">
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(circle, #D11A5E 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 relative z-10">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center gap-2 text-white/65 hover:text-fortuna-pink text-sm mb-8 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Back to homepage
        </Link>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-14 items-center">
            <div className="min-w-0">
              <p className="mb-5 inline-flex items-center rounded-full border border-fortuna-pink/25 bg-fortuna-pink/10 px-4 py-2 text-xs font-semibold text-fortuna-pink">
                About FortunaHub
              </p>
              <h1 className="max-w-3xl text-4xl sm:text-6xl font-black uppercase leading-[0.95] text-balance">
                We make Kubernetes risk inspectable before it becomes urgent
              </h1>
              <p className="mt-7 max-w-2xl text-base sm:text-lg leading-8 text-white/70">
                FortunaHub builds security software for teams that operate Kubernetes under real change:
                new workloads, policy drift, fresh CVEs, runtime signals, and attack paths that cross
                ownership boundaries.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-fortuna-pink px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-[#EA2A70] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink"
                >
                  Request a demo <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/features"
                  className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/15 px-7 py-3 text-sm font-semibold text-white/85 transition-colors hover:border-white/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
                >
                  Inspect capabilities
                </Link>
              </div>
            </div>

            <figure className="relative min-w-0 overflow-hidden rounded-lg border border-white/12 bg-[#08080A] p-2 shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
              <img
                src={`${base}images/attack-path-analysis.png`}
                alt="Fortuna attack path analysis screen with risk context and investigation workflow"
                width={1365}
                height={803}
                className="aspect-[1365/803] w-full rounded-md object-cover object-left-top"
              />
              <div aria-hidden="true" className="absolute inset-x-2 top-2 hidden h-[calc(100%-3.4rem)] sm:block">
                <div className="absolute left-[8%] top-[18%] rounded-md border border-white/14 bg-[#070709]/82 px-3 py-2 text-[0.7rem] font-bold text-white shadow-xl shadow-black/30 backdrop-blur-sm">
                  Exposure chain
                </div>
                <div className="absolute right-[7%] top-[42%] rounded-md border border-white/14 bg-[#070709]/82 px-3 py-2 text-[0.7rem] font-bold text-white shadow-xl shadow-black/30 backdrop-blur-sm">
                  Fix owner context
                </div>
              </div>
              <figcaption className="border-t border-white/10 px-4 py-3 text-xs leading-5 text-white/62">
                Attack-path context, policy posture, and workload evidence are designed to stay in the same investigation path.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
      <AboutSection />
    </div>
  );
}
