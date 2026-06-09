import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Cpu } from 'lucide-react';
import { FEATURES } from '../../config/landing';
import FeatureSlideshow from './FeatureSlideshow';

export default function FeaturesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="features"
      className="py-24 bg-fortuna-dark border-t border-white/5 scroll-mt-[5.5rem]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-black leading-tight uppercase text-balance">
            Evidence across the Kubernetes risk workflow
          </h2>
          <p className="mt-5 text-base leading-8 text-white/68">
            Each capability keeps product evidence close to the decision it supports: exposure,
            policy drift, attack paths, workload capability, or runtime behavior.
          </p>
        </div>

        {FEATURES.map((item) => (
          <motion.div
            key={item.id}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-14 border-t border-white/8 first:border-t-0 first:pt-0 last:pb-0"
          >
            <div className={item.order === 'img' ? 'lg:order-2' : 'lg:order-1'}>
              <h3 className="text-xl md:text-2xl font-black uppercase leading-tight mb-4">
                {item.title}
              </h3>
              <p className="text-white/68 text-sm leading-7 mb-5">{item.desc}</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1.5 bg-white/5 border border-white/10 rounded text-[10px] font-mono uppercase tracking-wider text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className={item.order === 'img' ? 'lg:order-1' : 'lg:order-2'}>
              <FeatureSlideshow slides={item.slides} />
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 rounded-lg border border-white/10 bg-white/[0.035] p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-md bg-fortuna-pink/15 border border-fortuna-pink/25 flex items-center justify-center flex-shrink-0">
              <Cpu className="w-7 h-7 text-fortuna-pink" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase leading-tight mb-3">
                Agent & Policy Engine
              </h3>
              <p className="text-white/68 text-sm leading-7 max-w-md">
                DaemonSet per node. SBOM extraction via containerd. CEL-based policy evaluation.
                Optional Admission Webhook for enforcement.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded text-[10px] font-mono uppercase tracking-wider text-white/60">
              DaemonSet
            </span>
            <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded text-[10px] font-mono uppercase tracking-wider text-white/60">
              CEL Policy
            </span>
            <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded text-[10px] font-mono uppercase tracking-wider text-white/60">
              Admission Webhook
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
