import React from 'react';

interface CaptureProps {
  src: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
  lazy?: boolean;
}

/**
 * Capture: Screenshot with caption and full-size link
 * - Accessible figure/figcaption
 * - Click to open full-size in new tab
 * - Lazy loading for performance
 */
export default function Capture({
  src,
  alt,
  caption,
  width = 1363,
  height = 936,
  lazy = true,
}: CaptureProps) {
  const url = `${import.meta.env.BASE_URL}images/${src}`;

  return (
    <figure className="my-6 overflow-hidden rounded-lg border border-white/10 bg-fortuna-card">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View full-size screenshot: ${alt}`}
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fortuna-pink"
      >
        <img
          src={url}
          alt={alt}
          width={width}
          height={height}
          loading={lazy ? 'lazy' : 'eager'}
          decoding="async"
          fetchpriority={lazy ? 'low' : 'high'}
          className="w-full h-auto object-cover"
        />
      </a>
      <figcaption className="px-4 py-3 text-xs leading-relaxed text-white/60 border-t border-white/5">
        <span>{caption}</span>
        {' '}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-fortuna-pink underline hover:text-[#EA2A70] transition-colors"
        >
          View full size
        </a>
      </figcaption>
    </figure>
  );
}
