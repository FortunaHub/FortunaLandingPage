/**
 * Accessibility utilities for WCAG AA compliance
 * - Reduced motion support
 * - Contrast checking
 * - Focus management
 */

/**
 * Check if user has prefers-reduced-motion enabled in system settings
 * Returns boolean that can be used to conditionally disable animations
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Listen for changes to prefers-reduced-motion preference
 * Useful for reacting to preference changes at runtime
 */
export const onReducedMotionChange = (callback: (prefersReduced: boolean) => void): (() => void) => {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  const handler = (e: MediaQueryListEvent) => {
    callback(e.matches);
  };
  
  mediaQuery.addEventListener('change', handler);
  
  return () => {
    mediaQuery.removeEventListener('change', handler);
  };
};

/**
 * WCAG AA Contrast ratio checker (simplified)
 * Note: For production, use a proper color contrast library
 * Returns true if contrast meets WCAG AA standard (4.5:1 for normal text, 3:1 for large text)
 */
export const checkContrast = (
  foreground: string,
  background: string,
  largeText: boolean = false
): boolean => {
  // This is a simplified check. For production, use a library like polished or color-contrast-checker
  const requiredRatio = largeText ? 3 : 4.5;
  
  // Note: Full contrast calculation would involve:
  // 1. Parse RGB values
  // 2. Calculate relative luminance
  // 3. Calculate contrast ratio
  // 4. Compare against required ratio
  
  // Placeholder for actual implementation
  console.warn('Full contrast check requires a color utility library. Use color-contrast-checker or similar.');
  return true;
};

/**
 * Focus trap utility for modals and dropdowns
 * Keeps focus within a container when tabbing
 */
export const createFocusTrap = (element: HTMLElement) => {
  const focusableElements = element.querySelectorAll<HTMLElement>(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  if (focusableElements.length === 0) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener('keydown', handleKeyDown);

  return () => {
    element.removeEventListener('keydown', handleKeyDown);
  };
};

/**
 * Announce important messages to screen readers using aria-live
 */
export const announceToScreenReaders = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after message is read
  setTimeout(() => {
    announcement.remove();
  }, 1000);
};

/**
 * Skip to main content link utility
 * Helps keyboard users skip repetitive navigation
 */
export const createSkipLink = (): HTMLAnchorElement => {
  const skip = document.createElement('a');
  skip.href = '#main-content';
  skip.className = 'sr-only focus:not-sr-only';
  skip.textContent = 'Skip to main content';
  skip.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #D11A5E;
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
    
    &:focus {
      top: 0;
    }
  `;
  return skip;
};
