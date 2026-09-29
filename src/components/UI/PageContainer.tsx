import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * PageContainer: Wraps all page content between header and footer
 * - Applies consistent max-width and guttering
 * - Adds appropriate padding and spacing
 */
export default function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <main className={`flex-grow bg-fortuna-dark pt-[var(--header-height)] ${className}`}>
      <div className="container-max">{children}</div>
    </main>
  );
}
