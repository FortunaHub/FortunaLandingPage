import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

export type FeatureSlide = { src: string; alt: string };

export default function FeatureSlideshow({ slides }: { slides: readonly FeatureSlide[] }) {
  const [index, setIndex] = useState(0);
  if (!slides.length) return null;
  const current = slides[index % slides.length];
  const url = `${import.meta.env.BASE_URL}images/${current.src}`;
  return (
    <figure className="overflow-hidden rounded-lg border border-white/10 bg-black/20 shadow-lg">
      <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size screenshot: ${current.alt}`} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-fortuna-pink">
        <img src={url} alt={current.alt} width={1363} height={936} loading="lazy" decoding="async" className="aspect-[1363/936] w-full object-contain" />
      </a>
      <figcaption className="border-t border-white/10 px-4 py-3">
        <p aria-live="polite" className="text-xs leading-6 text-white/70">{current.alt}</p>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
          <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-xs text-fortuna-pink underline">View full size <ExternalLink className="h-3 w-3" /></a>
          {slides.length > 1 && <div className="flex items-center gap-3">
            <button type="button" onClick={() => setIndex((index - 1 + slides.length) % slides.length)} aria-label="Previous screenshot" className="flex h-11 w-11 items-center justify-center rounded border border-white/20 hover:bg-white/10"><ChevronLeft className="h-5 w-5" /></button>
            <span className="text-xs text-white/65">{index + 1} / {slides.length}</span>
            <button type="button" onClick={() => setIndex((index + 1) % slides.length)} aria-label="Next screenshot" className="flex h-11 w-11 items-center justify-center rounded border border-white/20 hover:bg-white/10"><ChevronRight className="h-5 w-5" /></button>
          </div>}
        </div>
      </figcaption>
    </figure>
  );
}
