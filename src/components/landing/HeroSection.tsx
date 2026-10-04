import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const base = import.meta.env.BASE_URL;

export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="platform"
      className="relative pt-[calc(var(--header-height)+40px)] pb-16 md:pb-20 bg-fortuna-dark overflow-hidden scroll-mt-header"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'radial-gradient(circle, #D11A5E 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-fortuna-dark to-transparent" />
        <div className="absolute top-20 right-[8%] h-72 w-72 rounded-full bg-fortuna-pink/10 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="container-max relative z-10">
        <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-2 items-center">
          {/* Text Column */}
          <motion.div
            className="min-w-0"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fortuna-pink/25 bg-fortuna-pink/10 px-4 py-2">
              <span className="text-xs font-semibold text-fortuna-pink">Open-source Kubernetes security</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight mb-6 text-white text-balance">
              Trace Kubernetes attack paths. Prioritize the fix.
            </h1>

            {/* Description */}
            <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-lg">
              Follow workload identities and RBAC permissions toward cluster access. Connect SBOM, CVE, and runtime evidence to decide what to fix first.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/docs/first-investigation"
                className="inline-flex items-center justify-center gap-2 min-h-12 px-6 py-3 rounded-lg bg-fortuna-pink text-white font-semibold hover:bg-[#EA2A70] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink"
              >
                Explore your first attack path <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/features"
                className="inline-flex items-center justify-center min-h-12 px-6 py-3 rounded-lg border border-white/20 text-white font-semibold hover:border-white/40 hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink"
              >
                View capabilities
              </Link>
            </div>

            <p className="mt-6 text-sm text-white/55">
              Apache 2.0 licensed · Self-hosted in your clusters · Multi-cluster telemetry
            </p>
          </motion.div>

          {/* Image Column */}
          <motion.div
            className="min-w-0"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-fortuna-card shadow-xl">
              {/* Browser mockup header */}
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#EF476F]" />
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#FFD166]" />
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#06D6A0]" />
                <span className="ml-auto text-xs font-medium text-white/50">Fortuna · Attack Paths</span>
              </div>

              {/* Image */}
              <figure className="p-3">
                <a
                  href={`${base}images/live-rbac-attack-path.png`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-md overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fortuna-pink"
                  aria-label="View full-size RBAC attack path diagram"
                >
                  <img
                    src={`${base}images/live-rbac-attack-path.png`}
                    alt="RBAC path from rbac-pod through sa-rbac to cluster-admin permissions"
                    width={1363}
                    height={936}
                    loading="eager"
                    fetchpriority="high"
                    decoding="async"
                    className="aspect-[1363/936] w-full object-contain group-hover:opacity-90 transition-opacity"
                  />
                </a>
                <figcaption className="mt-3 text-xs text-white/60">
                  Live demo: pod → service account → role binding → cluster-admin.{' '}
                  <a
                    href={`${base}images/live-rbac-attack-path.png`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fortuna-pink underline underline-offset-2 hover:text-[#EA2A70]"
                  >
                    View full-size
                  </a>
                  . A possible access path, not proof of exploitation.
                </figcaption>
              </figure>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
