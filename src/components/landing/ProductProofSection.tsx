import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, GitBranch, Radar, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const base = import.meta.env.BASE_URL;

const workflow = [
  {
    icon: Radar,
    title: 'Compare intent with traffic',
    copy: 'Review allowed, denied, and observed flows against active NetworkPolicies before drift turns into exposure.',
  },
  {
    icon: GitBranch,
    title: 'Trace the blast radius',
    copy: 'Move from vulnerable workloads into attack-path context so teams can break the chains that matter first.',
  },
  {
    icon: ShieldAlert,
    title: 'Prioritize runtime risk',
    copy: 'Promote risky pod capabilities with process and traffic evidence instead of treating every finding equally.',
  },
] as const;

export default function ProductProofSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-fortuna-dark py-20 sm:py-24 border-t border-white/5">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fortuna-pink/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 xl:gap-16 items-start">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-28"
          >
            <p className="mb-4 text-sm font-semibold text-fortuna-pink">
              Product proof
            </p>
            <h2 className="max-w-2xl text-3xl sm:text-5xl font-black leading-tight uppercase text-balance">
              Start with the evidence your cluster already produces
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/70">
              Fortuna is built around inspection, not decoration. Network posture, attack paths,
              vulnerability context, and runtime signals stay connected in one Kubernetes risk workflow.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/features"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-fortuna-pink/45 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-fortuna-pink/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink"
              >
                View feature evidence <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/docs"
                className="inline-flex min-h-12 items-center justify-center rounded-md px-6 py-3 text-sm font-semibold text-white/75 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
              >
                Read architecture notes
              </Link>
            </div>
          </motion.div>

          <div className="space-y-5">
            <motion.figure
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-lg border border-white/12 bg-[#08080A] shadow-[0_26px_90px_rgba(0,0,0,0.45)]"
            >
              <img
                src={`${base}images/realtime-network-activity.png`}
                alt="Fortuna real-time network activity showing observed workload traffic"
                width={1863}
                height={824}
                loading="lazy"
                className="aspect-[1863/824] w-full object-cover object-left-top"
              />
              <figcaption className="border-t border-white/10 px-4 py-3 text-xs leading-5 text-white/60">
                Live traffic gives policy review a current signal, not just static intent.
              </figcaption>
            </motion.figure>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <motion.figure
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-lg border border-white/12 bg-[#08080A]"
              >
                <img
                  src={`${base}images/attack-path-analysis.png`}
                  alt="Fortuna attack path analysis with risk context"
                  width={1365}
                  height={803}
                  loading="lazy"
                  className="aspect-[1365/803] w-full object-cover object-left-top"
                />
                <figcaption className="border-t border-white/10 px-4 py-3 text-xs leading-5 text-white/60">
                  Attack paths connect exposure to remediation priority.
                </figcaption>
              </motion.figure>

              <div className="grid gap-3">
                {workflow.map(({ icon: Icon, title, copy }) => (
                  <motion.div
                    key={title}
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-md border border-white/10 bg-white/[0.045] p-4"
                  >
                    <div className="flex items-start gap-3">
                      <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-fortuna-pink" />
                      <div>
                        <h3 className="text-sm font-bold text-white">{title}</h3>
                        <p className="mt-1 text-xs leading-5 text-white/60">{copy}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
