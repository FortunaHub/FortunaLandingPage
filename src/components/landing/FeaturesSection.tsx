import React from 'react';
import { motion } from 'motion/react';
import { Cpu } from 'lucide-react';
import { FEATURES } from '../../config/landing';

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-24 bg-fortuna-dark border-t border-white/5 scroll-mt-[5.5rem]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-fortuna-pink mb-3 block">
            Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase">Features</h2>
        </div>

        {FEATURES.map((item) => (
          <motion.div
            key={item.img}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 last:mb-0"
          >
            <div className={item.order === 'img' ? 'lg:order-2' : 'lg:order-1'}>
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-3">
                {item.title}
              </h3>
              <p className="text-white/60 text-sm mb-4">{item.desc}</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono uppercase tracking-wider text-white/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className={item.order === 'img' ? 'lg:order-1' : 'lg:order-2'}>
              <div className="rounded-lg overflow-hidden border border-white/10 shadow-lg">
                <img
                  src={`/images/${item.img}`}
                  alt={item.alt}
                  className="w-full max-w-full h-auto object-contain"
                />
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 border border-white/5 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 pink-gradient rounded-full flex items-center justify-center flex-shrink-0">
              <Cpu className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-4">
                Agent & Policy Engine
              </h3>
              <p className="text-white/60 text-sm max-w-md">
                DaemonSet per node. SBOM extraction via containerd. CEL-based policy evaluation.
                Optional Admission Webhook for enforcement.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded text-[10px] font-mono uppercase tracking-wider text-white/40">
              DaemonSet
            </span>
            <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded text-[10px] font-mono uppercase tracking-wider text-white/40">
              CEL Policy
            </span>
            <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded text-[10px] font-mono uppercase tracking-wider text-white/40">
              Admission Webhook
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
