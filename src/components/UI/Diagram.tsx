import React from 'react';

interface DiagramProps {
  name: string;
  title: string;
  caption: string;
  height?: number;
  width?: number;
}

/**
 * Diagram: SVG diagram with caption and full-size link
 * - Accessible figure/figcaption
 * - Click to open full-size SVG in new tab
 * - Dark background for diagram visibility
 * - Responsive sizing
 */
export default function Diagram({
  name,
  title,
  caption,
  height = 1200,
  width = 960,
}: DiagramProps) {
  const url = `${import.meta.env.BASE_URL}images/diagrams/${name}.svg`;

  return (
    <figure className="my-6 overflow-hidden rounded-lg border border-white/10 bg-[#0c1019]">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open full-size diagram: ${title}`}
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fortuna-pink"
      >
        <img
          src={url}
          alt={caption}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className="w-full h-auto object-contain bg-[#0c1019]"
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
