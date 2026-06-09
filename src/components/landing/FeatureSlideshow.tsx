import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type FeatureSlide = { src: string; alt: string };

type Props = {
  slides: readonly FeatureSlide[];
};

const AUTO_MS = 7000;

export default function FeatureSlideshow({ slides }: Props) {
  const [index, setIndex] = useState(0);
  const n = slides.length;
  const base = import.meta.env.BASE_URL;

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % n);
  }, [n]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + n) % n);
  }, [n]);

  useEffect(() => {
    if (n <= 1) return;
    const id = window.setInterval(next, AUTO_MS);
    return () => window.clearInterval(id);
  }, [n, next]);

  if (n === 0) return null;

  const current = slides[index]!;

  if (n === 1) {
    return (
      <div className="rounded-lg overflow-hidden border border-white/10 shadow-lg bg-black/20">
        <img
          src={`${base}images/${current.src}`}
          alt={current.alt}
          className="w-full max-w-full h-auto object-contain"
        />
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden border border-white/10 shadow-lg bg-black/20 relative group">
      <div className="relative aspect-[16/10] md:aspect-video min-h-[200px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={current.src}
            src={`${base}images/${current.src}`}
            alt={current.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 w-full h-full object-contain object-center"
          />
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/70 border border-white/15 text-white/90 flex items-center justify-center opacity-90 md:opacity-0 md:group-hover:opacity-100 md:focus-within:opacity-100 focus:opacity-100 hover:bg-black/90 transition-opacity"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/70 border border-white/15 text-white/90 flex items-center justify-center opacity-90 md:opacity-0 md:group-hover:opacity-100 md:focus-within:opacity-100 focus:opacity-100 hover:bg-black/90 transition-opacity"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="flex justify-center gap-1.5 py-3 px-2 bg-black/40 border-t border-white/5">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'w-6 bg-fortuna-pink' : 'w-1.5 bg-white/25 hover:bg-white/45'
            }`}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
          />
        ))}
      </div>
    </div>
  );
}
