import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = '', size = 32 }: LogoProps) {
  return (
    <Link to="/" className="inline-block">
      <img
        src="/logo.png"
        alt="Fortuna - Kubernetes Security & Risk Management"
        width={size}
        height={size}
        className={`object-contain cursor-pointer ${className}`}
      />
    </Link>
  );
}
