import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

export default function SiteFooter() {
  return (
    <footer className="bg-fortuna-dark border-t border-white/5 py-12" role="contentinfo">
      <div className="container-max">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-8">
          {/* Brand Column */}
          <div className="col-span-1">
            <Link
              to="/"
              className="inline-flex items-center gap-2 mb-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink rounded-sm"
            >
              <Logo size={24} className="flex-shrink-0" />
              <span className="text-lg font-extrabold tracking-tighter">
                Fortuna<span className="text-fortuna-pink">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-white/50">Kubernetes attack paths and workload security.</p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sm text-white/60 hover:text-fortuna-pink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink rounded-sm inline-block"
                >
                  Platform
                </Link>
              </li>
              <li>
                <Link
                  to="/features"
                  className="text-sm text-white/60 hover:text-fortuna-pink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink rounded-sm inline-block"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/docs"
                  className="text-sm text-white/60 hover:text-fortuna-pink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink rounded-sm inline-block"
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-white/60 hover:text-fortuna-pink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink rounded-sm inline-block"
                >
                  About
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/shino-337/Fortuna-Community"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-fortuna-pink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink rounded-sm inline-block"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-white/60 hover:text-fortuna-pink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink rounded-sm inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-white/60 hover:text-fortuna-pink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink rounded-sm inline-block"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs text-white/50 uppercase tracking-widest">
            © 2026 FortunaHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
