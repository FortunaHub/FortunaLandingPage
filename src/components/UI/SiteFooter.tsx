import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

const GITHUB_URL = 'https://github.com/shino-337/Fortuna-Community';

const linkClass =
  'text-sm text-white/60 hover:text-fortuna-pink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink rounded-sm inline-block';

const columns: { title: string; links: { name: string; to: string; external?: boolean }[] }[] = [
  {
    title: 'Product',
    links: [
      { name: 'Platform', to: '/' },
      { name: 'Capabilities', to: '/features' },
      { name: 'Request a demo', to: '/register' },
    ],
  },
  {
    title: 'Documentation',
    links: [
      { name: 'Getting Started', to: '/docs/getting-started' },
      { name: 'First Investigation', to: '/docs/first-investigation' },
      { name: 'Architecture', to: '/docs/architecture' },
      { name: 'Troubleshooting', to: '/docs/troubleshooting' },
    ],
  },
  {
    title: 'Project',
    links: [
      { name: 'About', to: '/about' },
      { name: 'GitHub', to: GITHUB_URL, external: true },
      { name: 'Privacy Policy', to: '/privacy' },
      { name: 'Terms of Service', to: '/terms' },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="bg-fortuna-dark border-t border-white/5 py-12">
      <div className="container-max">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link
              to="/"
              className="inline-flex items-center gap-2 mb-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink rounded-sm"
            >
              <Logo size={24} className="flex-shrink-0" />
              <span className="text-lg font-extrabold tracking-tighter">
                Fortuna<span className="text-fortuna-pink">Hub</span>
              </span>
            </Link>
            <p className="text-sm leading-6 text-white/60 max-w-xs">
              Open-source Kubernetes attack-path investigation and workload security.
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-4">{column.title}</h2>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    {link.external ? (
                      <a href={link.to} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        {link.name}
                      </a>
                    ) : (
                      <Link to={link.to} className={linkClass}>
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs text-white/55">
            © {new Date().getFullYear()} FortunaHub. Fortuna is released under the Apache License 2.0.
          </p>
        </div>
      </div>
    </footer>
  );
}
