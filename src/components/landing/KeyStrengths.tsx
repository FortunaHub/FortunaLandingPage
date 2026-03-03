import React from 'react';
import { motion } from 'motion/react';
import { STRENGTHS } from '../../config/landing';

export default function KeyStrengths() {
  return (
    <section className="py-16 bg-fortuna-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-4">
          {STRENGTHS.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-xs font-semibold uppercase tracking-wider text-white/80 hover:border-fortuna-pink/30 hover:text-fortuna-pink transition-colors"
            >
              {s}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
