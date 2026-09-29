import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export default function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="bg-fortuna-dark pt-[calc(var(--header-height)+40px)] pb-8 md:pb-16 page-header-spacing">
      <div className="container-max">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-white">
          {title}
        </h1>
        {description && (
          <p className="text-lg md:text-xl text-white/70 max-w-2xl">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
}
