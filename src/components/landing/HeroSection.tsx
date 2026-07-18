import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ShieldCheck, Workflow, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import Tooltip from '../Tooltip';

const base = import.meta.env.BASE_URL;

const proofPoints = [
  { icon: Workflow, label: 'Triage with one score', value: 'Findings Queue' },
  { icon: ShieldCheck, label: 'Break risky paths', value: 'Attack Paths' },
  { icon: Activity, label: 'Correlate live flows', value: 'Runtime Network' },
] as const;

const screenshotNotes = [
  { label: 'Cluster scope', className: 'left-[7%] top-[17%]' },
  { label: 'Observed flows', className: 'right-[8%] top-[39%]' },
  { label: 'Traffic weight', className: 'left-[18%] bottom-[13%]' },
] as const;

export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="platform"
      className="relative min-h-[calc(100svh-4rem)] flex items-center pt-20 pb-14 bg-[#050505] overflow-hidden scroll-mt-[5.5rem]"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-14 items-center">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-fortuna-pink/25 bg-fortuna-pink/10 px-4 py-2 text-xs font-semibold text-fortuna-pink">
              Multi-cluster Kubernetes risk, tied to live evidence
            </p>
            <h1 className="max-w-3xl text-[3.3rem] sm:text-[4.6rem] lg:text-[5.6rem] font-black leading-[0.92] mb-7 uppercase text-balance">
              See which workload risks deserve action first
            </h1>
            <p className="text-white/70 text-base md:text-lg leading-8 max-w-2xl mb-9">
              Fortuna connects SBOM exposure, OSV-backed CVE matching, attack paths,
              runtime network activity, Falco signals, and one unified risk score in a centralized dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Tooltip content="Discuss your cluster risk workflow" position="bottom">
                <Link
                  to="/register"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-fortuna-pink px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-[#EA2A70] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink"
                >
                  Request a demo <ArrowRight className="w-4 h-4" />
                </Link>
              </Tooltip>
              <Link
                to="/features"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/15 px-7 py-3 text-sm font-semibold text-white/85 transition-colors hover:border-white/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
              >
                Inspect capabilities
              </Link>
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
                <span className="ml-3 text-xs font-medium text-white/45">runtime network / cluster scope</span>
              </div>
              <img
                src={`${base}images/Network-design.png`}
                alt="Fortuna Runtime Network showing observed Kubernetes workload traffic"
                width={1440}
                height={1000}
                loading="eager"
                className="aspect-[1440/1000] w-full rounded-md object-cover object-top"
              />
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-2 bottom-2 top-[2.9rem] hidden sm:block">
                {screenshotNotes.map(({ label, className }) => (
                  <div key={label} className={`absolute ${className}`}>
                    <div className="flex items-center gap-2 rounded-md border border-white/14 bg-[#070709]/82 px-3 py-2 text-[0.7rem] font-bold text-white shadow-xl shadow-black/30 backdrop-blur-sm">
                      <span className="h-2 w-2 rounded-full bg-fortuna-pink shadow-[0_0_18px_rgba(209,26,94,0.9)]" />
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-[0.42fr_0.58fr]">
              <div className="hidden overflow-hidden rounded-md border border-white/12 bg-fortuna-card p-2 shadow-xl xl:block">
                <img
                  src={`${base}images/attack-path-graph-view.png`}
                  alt="Attack path graph highlighting lateral movement paths across workloads"
                  width={1440}
                  height={1000}
                  loading="eager"
                  className="aspect-[1440/1000] w-full rounded object-cover object-left-top"
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
