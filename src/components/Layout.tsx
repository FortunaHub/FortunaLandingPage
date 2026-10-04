import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SiteHeader, SiteFooter } from './UI';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const target = location.hash
      ? document.getElementById(decodeURIComponent(location.hash.slice(1)))
      : null;
    if (target) {
      target.scrollIntoView({ block: 'start', behavior: 'instant' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.pathname, location.hash]);

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
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-fortuna-dark">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-fortuna-pink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
        {children}
      </main>
      <SiteFooter />

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-[60]"
          >
            <button
              type="button"
              aria-label="Scroll to top"
              onClick={scrollToTop}
              className="w-12 h-12 bg-fortuna-pink rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(209,26,94,0.4)] hover:bg-[#EA2A70] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink"
              title="Scroll to top"
            >
              <ArrowUp className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
