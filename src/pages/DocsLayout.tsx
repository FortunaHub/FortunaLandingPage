import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DOC_META } from '../config/docs';

export default function DocsLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [headings, setHeadings] = useState<Array<{ id: string; title: string }>>([]);
  const location = useLocation();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // Extract headings from rendered content for TOC sidebar
  useEffect(() => {
    const extractHeadings = () => {
      // Get h2s that are inside section elements
      const sections = document.querySelectorAll('article section');
      const extracted = Array.from(sections).map(section => {
        const h2 = section.querySelector('h2');
        if (!h2) return null;
        return {
          id: section.id || '',
          title: h2.textContent || '',
        };
      }).filter((item): item is { id: string; title: string } => !!item?.id && !!item?.title);
      setHeadings(extracted);
    };
    // Delay to allow content to render
    const timer = setTimeout(extractHeadings, 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const groups = ['Start here', 'Use Fortuna', 'Operate Fortuna'] as const;

  const SidebarContent = () => (
    <div className="p-5 lg:p-6">
      <p className="text-lg font-bold text-white">Documentation</p>
      <p className="mt-2 text-sm text-white/60">Install, investigate, and operate Fortuna.</p>
      <nav aria-label="Documentation sections" className="mt-6 space-y-6">
        {groups.map((group) => (
          <div key={group}>
            <p className="mb-3 text-xs font-semibold text-white/50 uppercase tracking-wide">{group}</p>
            <div className="flex flex-col gap-1">
              {DOC_META.filter((doc) => doc.group === group).map((doc) => (
                <NavLink
                  key={doc.slug}
                  to={`/docs/${doc.slug}`}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2.5 text-sm rounded-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-fortuna-pink ${
                      isActive
                        ? 'bg-fortuna-pink/15 text-white font-medium'
                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  {doc.title}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-fortuna-dark pt-[var(--header-height)]">
      <div className="container-max">
        <div className="flex gap-8 xl:gap-12">
        {/* Mobile Sidebar Toggle */}
        <div className="lg:hidden fixed bottom-24 right-4 sm:right-8 z-40">
          <button
            type="button"
            aria-label={isSidebarOpen ? 'Close documentation menu' : 'Open documentation menu'}
            aria-expanded={isSidebarOpen}
            aria-controls="docs-sidebar"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-12 h-12 bg-fortuna-pink rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#EA2A70] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fortuna-pink"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Sidebar - Desktop Sticky, Mobile Modal */}
        <div
          id="docs-sidebar"
          className="hidden lg:block shrink-0 w-[var(--sidebar-width)] border-r border-white/10 bg-[#080808] lg:sticky lg:top-[var(--header-height)] lg:h-[calc(100vh-var(--header-height))] lg:overflow-y-auto"
        >
          <SidebarContent />
        </div>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                aria-hidden="true"
                className="fixed inset-0 bg-black/60 z-30 lg:hidden"
                onClick={() => setIsSidebarOpen(false)}
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.3, type: 'tween' }}
                role="dialog"
                aria-modal="true"
                aria-label="Documentation menu"
                className="fixed left-0 top-[var(--header-height)] bottom-0 w-72 max-w-[85vw] bg-[#080808] border-r border-white/10 z-40 overflow-y-auto lg:hidden"
              >
                <SidebarContent />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 min-w-0 py-8 md:py-12 pb-24">
          <div className="w-full max-w-[var(--docs-content-width)]">
            <Outlet />
          </div>
        </div>

        {/* Right TOC Sidebar - Desktop only */}
        <aside className="hidden xl:block shrink-0 w-60 border-l border-white/10 bg-[#080808] lg:sticky lg:top-[var(--header-height)] lg:h-[calc(100vh-var(--header-height))] lg:overflow-y-auto">
          <div className="p-5 lg:p-6">
            {headings.length > 0 && (
              <nav aria-label="On this page" className="space-y-3">
                <p className="text-sm font-semibold text-white">On this page</p>
                <ul className="space-y-2">
                  {headings.map(heading => (
                    <li key={heading.id}>
                      <a
                        href={`#${heading.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const element = document.getElementById(heading.id);
                          if (element) {
                            const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                            element.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
                            element.focus({ preventScroll: true });
                            // Update URL hash so users can share the link
                            window.history.pushState(null, '', `#${heading.id}`);
                          }
                        }}
                        className="text-sm leading-6 text-white/65 hover:text-fortuna-pink transition-colors"
                      >
                        {heading.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </aside>
      </div>
    </div>
    </div>
  );
}
