import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Tooltip from './Tooltip';
import Logo from './Logo';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Platform', to: '/', tooltip: 'Home' },
    { name: 'Features', to: '/features', tooltip: 'Capabilities' },
    { name: 'Docs', to: '/docs', tooltip: 'Documentation' },
    { name: 'About', to: '/about', tooltip: 'About Fortuna' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


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
                <div className="w-8 h-8 pink-gradient rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(209,26,94,0.3)]">
                  <Logo size={20} className="text-white" />
                </div>
                <Link to="/" className="text-xl font-extrabold tracking-tighter whitespace-nowrap">
                  K8S<span className="text-fortuna-pink">FORTUNA</span>
                </Link>
              </div>
            </Tooltip>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
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
                <div className="w-6 h-6 pink-gradient rounded flex items-center justify-center">
                  <Logo size={14} className="text-white" />
                </div>
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
