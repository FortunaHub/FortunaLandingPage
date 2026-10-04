import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';

const suggestions = [
  { name: 'Platform capabilities', to: '/features' },
  { name: 'Getting started', to: '/docs/getting-started' },
  { name: 'First investigation walkthrough', to: '/docs/first-investigation' },
];

export default function NotFoundPage() {
  return (
    <div className="bg-fortuna-dark pt-[calc(var(--header-height)+64px)] pb-24">
      <SeoHead route="notFound" />
      <div className="container-max max-w-3xl">
        <p className="mb-3 text-sm font-semibold text-fortuna-pink">404</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Page not found</h1>
        <p className="text-lg text-white/70 mb-10">
          The page you requested doesn't exist or has moved. Try one of these instead:
        </p>
        <ul className="grid gap-3 sm:grid-cols-3 mb-10">
          {suggestions.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="group flex h-full items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm font-semibold text-white transition-colors hover:border-fortuna-pink/40 hover:bg-white/[0.05]"
              >
                {item.name}
                <ArrowRight className="h-4 w-4 flex-shrink-0 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-fortuna-pink" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to="/"
          className="inline-flex min-h-12 items-center justify-center rounded-lg bg-fortuna-pink px-6 py-3 font-semibold text-white transition-colors hover:bg-[#EA2A70]"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
