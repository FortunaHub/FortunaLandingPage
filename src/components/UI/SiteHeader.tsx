import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import Logo from '../Logo';

const GITHUB_URL = 'https://github.com/shino-337/Fortuna-Community';

const navLinks = [
  { name: 'Platform', to: '/' },
  { name: 'Features', to: '/features' },
  { name: 'Docs', to: '/docs' },
  { name: 'About', to: '/about' },
];

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isActive = (path: string) =>
    location.pathname === path || (path === '/docs' && location.pathname.startsWith('/docs'));

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[var(--header-height)] bg-fortuna-dark/80 backdrop-blur-md border-b border-white/5">
      <div className="container-max h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group flex-shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink rounded-sm"
          onClick={() => setIsMenuOpen(false)}
        >
          <Logo size={32} className="flex-shrink-0" />
          <span className="text-xl font-extrabold tracking-tighter whitespace-nowrap">
            Fortuna<span className="text-fortuna-pink">Hub</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Main" className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              aria-current={isActive(link.to) ? 'page' : undefined}
              className={`text-sm font-semibold uppercase tracking-[0.08em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink rounded-sm ${
                isActive(link.to) ? 'text-fortuna-pink' : 'text-white/60 hover:text-fortuna-pink'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex min-h-10 items-center gap-2 rounded-md border border-white/20 px-4 text-sm font-semibold text-white transition-colors hover:border-fortuna-pink/60 hover:bg-fortuna-pink/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            GitHub
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          className="md:hidden min-h-11 min-w-11 inline-flex items-center justify-center text-white hover:text-fortuna-pink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink rounded-sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-fortuna-card border-t border-white/5"
          >
            <nav aria-label="Main" className="container-max py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  aria-current={isActive(link.to) ? 'page' : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2.5 text-sm font-semibold uppercase tracking-[0.08em] transition-colors rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fortuna-pink ${
                    isActive(link.to)
                      ? 'text-fortuna-pink bg-fortuna-pink/10'
                      : 'text-white/60 hover:text-fortuna-pink hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/20 px-3 text-sm font-semibold text-white hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fortuna-pink"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                View on GitHub
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
