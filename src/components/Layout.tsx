import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Tooltip from './Tooltip';
import Logo from './Logo';
import { SOLUTIONS } from '../config/solutions';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showSolutionsDropdown, setShowSolutionsDropdown] = useState(false);
  const [comingSoonToast, setComingSoonToast] = useState(false);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const navLinks = [
    { name: 'Platform', to: '/', tooltip: 'Home' },
    { name: 'Features', to: '/features', tooltip: 'Capabilities' },
    { name: 'Docs', to: '/docs', tooltip: 'Documentation' },
    { name: 'About', to: '/about', tooltip: 'About Fortuna' },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (solutionsRef.current && !solutionsRef.current.contains(e.target as Node)) {
        setShowSolutionsDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!comingSoonToast) return;
    const t = setTimeout(() => setComingSoonToast(false), 2500);
    return () => clearTimeout(t);
  }, [comingSoonToast]);


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 bg-fortuna-dark/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center py-4 gap-4">
            <Tooltip content="Go to Homepage" position="bottom">
              <div className="flex items-center gap-2 group flex-shrink-0">
                <Logo size={32} className="flex-shrink-0" />
                <Link to="/" className="text-xl font-extrabold tracking-tighter whitespace-nowrap">
                  K8S<span className="text-fortuna-pink">FORTUNA</span>
                </Link>
              </div>
            </Tooltip>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {/* Solutions Dropdown */}
              <div ref={solutionsRef} className="relative">
                <button
                  onClick={() => setShowSolutionsDropdown((v) => !v)}
                  className={`flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors whitespace-nowrap ${
                    showSolutionsDropdown ? 'text-fortuna-pink' : 'text-white/60 hover:text-fortuna-pink'
                  }`}
                >
                  Solutions
                  <ChevronDown className={`w-4 h-4 transition-transform ${showSolutionsDropdown ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {showSolutionsDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-80 rounded-xl bg-fortuna-card border border-white/10 shadow-xl overflow-hidden z-50"
                    >
                      <div className="p-2">
                        {SOLUTIONS.map((sol) => {
                          const Icon = sol.icon;
                          const isComingSoon = sol.comingSoon;
                          const content = (
                            <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                              <div className="w-10 h-10 rounded-lg bg-fortuna-pink/20 flex items-center justify-center flex-shrink-0 group-hover:bg-fortuna-pink/30 transition-colors">
                                <Icon className="w-5 h-5 text-fortuna-pink" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-bold text-white text-sm flex items-center gap-2">
                                  {sol.name}
                                  {isComingSoon && (
                                    <span className="text-[10px] font-normal uppercase tracking-wider text-fortuna-pink/80 bg-fortuna-pink/10 px-1.5 py-0.5 rounded">
                                      Coming soon
                                    </span>
                                  )}
                                </div>
                                <div className="text-white/50 text-xs truncate">{sol.tagline}</div>
                              </div>
                            </div>
                          );
                          return isComingSoon ? (
                            <button
                              key={sol.id}
                              type="button"
                              onClick={() => {
                                setComingSoonToast(true);
                                setShowSolutionsDropdown(false);
                              }}
                              className="w-full text-left"
                            >
                              {content}
                            </button>
                          ) : (
                            <Link
                              key={sol.id}
                              to={sol.to}
                              onClick={() => {
                                setShowSolutionsDropdown(false);
                                setIsMenuOpen(false);
                              }}
                              className="block"
                            >
                              {content}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {navLinks.map((link) => {
                const isActive =
                  location.pathname === link.to ||
                  (link.to === '/docs' && location.pathname.startsWith('/docs'));
                return (
                  <Tooltip key={link.name} content={link.tooltip} position="bottom">
                    <Link
                      to={link.to}
                      onClick={() => setIsMenuOpen(false)}
                      className={`min-w-[5rem] text-center text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors whitespace-nowrap ${
                        isActive ? 'text-fortuna-pink' : 'text-white/60 hover:text-fortuna-pink'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </Tooltip>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <Tooltip content={isMenuOpen ? "Close Menu" : "Open Menu"} position="bottom">
              <button
                className="md:hidden text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-fortuna-card border-t border-white/5"
            >
              <div className="px-4 py-6 flex flex-col gap-4">
                <div className="pb-4 border-b border-white/5">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">Solutions</div>
                  <div className="flex flex-col gap-2">
                    {SOLUTIONS.map((sol) => {
                      const Icon = sol.icon;
                      const isComingSoon = sol.comingSoon;
                      const content = (
                        <div className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-white/5 transition-colors">
                          <div className="w-8 h-8 rounded-lg bg-fortuna-pink/20 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-4 h-4 text-fortuna-pink" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-white text-sm flex items-center gap-2 flex-wrap">
                              {sol.name}
                              {isComingSoon && (
                                <span className="text-[10px] font-normal uppercase tracking-wider text-fortuna-pink/80 bg-fortuna-pink/10 px-1.5 py-0.5 rounded">
                                  Coming soon
                                </span>
                              )}
                            </div>
                            <div className="text-white/50 text-xs">{sol.tagline}</div>
                          </div>
                        </div>
                      );
                      return isComingSoon ? (
                        <button
                          key={sol.id}
                          type="button"
                          onClick={() => {
                            setComingSoonToast(true);
                            setIsMenuOpen(false);
                          }}
                          className="w-full text-left"
                        >
                          {content}
                        </button>
                      ) : (
                        <Link
                          key={sol.id}
                          to={sol.to}
                          onClick={() => setIsMenuOpen(false)}
                          className="block"
                        >
                          {content}
                        </Link>
                      );
                    })}
                  </div>
                </div>
                {navLinks.map((link) => {
                  const isActive =
                    location.pathname === link.to ||
                    (link.to === '/docs' && location.pathname.startsWith('/docs'));
                  return (
                    <Link
                      key={link.name}
                      to={link.to}
                      onClick={() => setIsMenuOpen(false)}
                      className={`py-2 text-sm font-semibold uppercase tracking-[0.15em] transition-colors border-b border-white/5 last:border-0 ${
                        isActive ? 'text-fortuna-pink' : 'text-white/60 hover:text-fortuna-pink'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow pt-16">
        {children}
      </main>

      <footer className="bg-fortuna-dark border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Logo size={24} className="flex-shrink-0" />
                <Link to="/" className="text-lg font-extrabold tracking-tighter">
                  K8S<span className="text-fortuna-pink">FORTUNA</span>
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-6">Product</h4>
              <ul className="space-y-4">
                <li><Link to="/" className="text-sm text-white/40 hover:text-fortuna-pink transition-colors">Platform</Link></li>
                <li><Link to="/features" className="text-sm text-white/40 hover:text-fortuna-pink transition-colors">Features</Link></li>
                <li><Link to="/docs" className="text-sm text-white/40 hover:text-fortuna-pink transition-colors">Documentation</Link></li>
                <li><Link to="/about" className="text-sm text-white/40 hover:text-fortuna-pink transition-colors">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-6">Company</h4>
              <ul className="space-y-4">
                <li><Link to="/about" className="text-sm text-white/40 hover:text-fortuna-pink transition-colors">About Fortuna</Link></li>
                <li><a href="mailto:contact@fortunahub.com" className="text-sm text-white/40 hover:text-fortuna-pink transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/20 uppercase tracking-widest">
              © 2026 FortunaHub. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-white/20 hover:text-white transition-colors uppercase tracking-widest">Privacy Policy</a>
              <a href="#" className="text-xs text-white/20 hover:text-white transition-colors uppercase tracking-widest">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Coming Soon Toast */}
      <AnimatePresence>
        {comingSoonToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[70] px-6 py-3 rounded-xl bg-fortuna-card border border-white/10 shadow-xl"
          >
            <p className="text-sm font-semibold text-white">Coming soon</p>
            <p className="text-xs text-white/50 mt-0.5">Sản phẩm sẽ có mặt sớm</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 z-[60]"
          >
            <Tooltip content="Scroll to Top" position="left">
              <button
                onClick={scrollToTop}
                className="w-12 h-12 pink-gradient rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(209,26,94,0.4)] hover:scale-110 transition-transform"
              >
                <ArrowUp className="w-6 h-6" />
              </button>
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
