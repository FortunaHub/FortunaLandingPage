import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

/**
 * Logo: Renders only the logo image, no link wrapper.
 * Parent component (SiteHeader, SiteFooter) should wrap with <Link> or <a>.
 * This prevents nested link elements which violate HTML semantics.
 */
export default function Logo({ className = '', size = 32 }: LogoProps) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}logo.png`}
      alt="Fortuna"
      width={size}
      height={size}
      className={`object-contain ${className}`}
    />
  );
}
