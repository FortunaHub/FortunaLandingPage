import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { FEATURES } from '../config/landing';
import { PageHeader } from '../components/UI';
import FeatureSlideshow from '../components/landing/FeatureSlideshow';
import { SeoHead } from '../components/SeoHead';

export default function FeaturesPage() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="overflow-x-hidden bg-fortuna-dark">
      <SeoHead route="features" />

      {/* Page Header */}
      <PageHeader
        title="Platform Capabilities"
        description="Fortuna organizes around the questions security teams ask. Each capability answers one question and connects the evidence teams need to make decisions."
      />

      {/* Features Grid */}
      <div className="bg-fortuna-dark page-header-spacing">
        <div className="container-max py-4 md:py-8">
          <div className="space-y-12 md:space-y-16">
            {FEATURES.map((item) => (
              <motion.section
                key={item.id}
                id={item.id}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="scroll-mt-header grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start border-t border-white/5 pt-8 lg:pt-12 first:border-t-0 first:pt-0"
              >
                {/* Text Column */}
                <div className={item.order === 'img' ? 'lg:order-2' : 'lg:order-1'}>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                    {item.title}
                  </h2>
                  <p className="text-white/70 text-base leading-relaxed mb-6">
                    {item.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-xs font-mono uppercase tracking-wider text-white/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Image Column */}
                <div className={item.order === 'img' ? 'lg:order-1' : 'lg:order-2'}>
                  <FeatureSlideshow slides={item.slides} />
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
