import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ShieldCheck, Workflow, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import Tooltip from '../Tooltip';

const base = import.meta.env.BASE_URL;

const proofPoints = [
  { icon: ShieldCheck, label: 'Follow identity and privilege relationships', value: 'Attack Paths' },
  { icon: Workflow, label: 'Bring vulnerability and workload context', value: 'Workload Evidence' },
  { icon: Activity, label: 'Add observed network activity', value: 'Runtime Network' },
] as const;


export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="platform"
      className="relative min-h-[calc(100svh-4rem)] flex items-center pt-12 pb-14 bg-[#050505] overflow-hidden scroll-mt-[5.5rem]"
    >
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: 'radial-gradient(circle, #D11A5E 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-fortuna-dark to-transparent" />
        <div className="absolute top-20 right-[8%] h-72 w-72 rounded-full bg-fortuna-pink/10 blur-[120px]" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-14 items-center">
          <motion.div
            className="min-w-0"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-fortuna-pink/25 bg-fortuna-pink/10 px-4 py-2 text-xs font-semibold text-fortuna-pink">
              Kubernetes attack paths and workload evidence
            </p>
            <h1 className="max-w-3xl text-[2.5rem] sm:text-5xl xl:text-6xl font-black leading-[1.05] mb-6 text-balance">
              Trace Kubernetes attack paths. Prioritize the fix.
            </h1>
            <p className="text-white/70 text-base md:text-lg leading-8 max-w-2xl mb-9">
              Follow workload identities and RBAC permissions toward cluster access. Connect SBOM, CVE, and runtime evidence to decide what to fix first.
            </p>
            <div className="flex flex-wrap gap-3">
              <Tooltip content="Explore your first attack path" position="bottom">
                <Link
                  to="/docs/first-investigation"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-fortuna-pink px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#EA2A70] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink"
                >
                  Explore your first attack path <ArrowRight className="w-4 h-4" />
                </Link>
              </Tooltip>
              <Link
                to="/features"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/15 px-5 py-3 text-sm font-semibold text-white/85 transition-colors hover:border-white/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
              >
                View capabilities
              </Link>
              <a
                href="https://github.com/shino-337/Fortuna-Community"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/15 px-5 py-3 text-sm font-semibold text-white/85 transition-colors hover:border-white/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
              >
                View on GitHub
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="relative min-w-0"
          >
            <div className="relative overflow-hidden rounded-lg border border-white/12 bg-[#08080A] p-2 shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
              <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#EF476F]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FFD166]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#06D6A0]" />
                <span className="ml-3 text-xs font-medium text-white/45">attack paths / RBAC relationships</span>
              </div>
              <img
                src={`${base}images/live-rbac-attack-path.png`}
                alt="RBAC path from rbac-pod through sa-rbac and crb-rbac-admin to cluster-admin"
                width={1363}
                height={936}
                loading="eager"
                fetchpriority="high"
                decoding="async"
                className="aspect-[1363/936] w-full rounded-md object-contain object-top"
              />
              <p className="px-3 py-3 text-xs leading-5 text-white/65">Live demo: rbac-pod → sa-rbac → crb-rbac-admin → cluster-admin. A possible access path, not proof of exploitation.</p>
              <a href={`${base}images/live-rbac-attack-path.png`} target="_blank" rel="noopener noreferrer" className="inline-block px-3 pb-3 text-sm text-fortuna-pink underline">View full-size screenshot</a>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-[0.42fr_0.58fr]">
              <div className="hidden overflow-hidden rounded-md border border-white/12 bg-fortuna-card p-2 shadow-xl xl:block">
                <img
                  src={`${base}images/live-runtime-network.png`}
                  alt="Observed NATS traffic in a separate 15-minute network view"
                  width={1363}
                  height={936}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[1363/936] w-full rounded object-contain object-left-top"
                />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 xl:grid-cols-1">
                {proofPoints.map(({ icon: Icon, label, value }) => (
                  <div key={value} className="rounded-md border border-white/10 bg-white/[0.045] p-4">
                    <Icon className="mb-3 h-5 w-5 text-fortuna-pink" />
                    <p className="text-sm font-bold text-white">{value}</p>
                    <p className="mt-1 text-xs leading-5 text-white/58">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
