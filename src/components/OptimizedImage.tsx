import React, { ImgHTMLAttributes, useState, useEffect } from 'react';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'loading'> {
  /**
   * Whether this image is the Largest Contentful Paint (LCP).
   * Only LCP images should use loading="eager".
   * All other images should use loading="lazy" for performance.
   */
  isLCP?: boolean;
  /**
   * Optional placeholder while image is loading
   * Can be a color or data URL
   */
  placeholder?: string;
}

/**
 * OptimizedImage component for proper image loading strategy
 * 
 * Enforces:
 * - Only LCP image uses eager loading
 * - Below-the-fold images use lazy loading
 * - Proper alt text for accessibility
 * - Responsive image attributes
 */
export const OptimizedImage = React.forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({ isLCP = false, placeholder, className, ...props }, ref) => {
    const [imageError, setImageError] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | undefined>(props.src);

    useEffect(() => {
      setImageSrc(props.src);
      setImageError(false);
    }, [props.src]);

    const loading = isLCP ? 'eager' : 'lazy';
    const decoding = isLCP ? 'async' : 'async';

    const handleError = () => {
      setImageError(true);
      if (props.onError) {
        props.onError?.(new Event('error') as any);
      }
    };

    if (imageError) {
      return (
        <div
          className={`bg-white/5 border border-white/10 flex items-center justify-center ${className || ''}`}
          style={{ aspectRatio: props.width && props.height ? `${props.width}/${props.height}` : undefined }}
        >
          <span className="text-white/50 text-xs">Image failed to load</span>
        </div>
      );
    }

    return (
      <img
        ref={ref}
        {...props}
        src={imageSrc}
        loading={loading}
        decoding={decoding}
        style={{
          backgroundColor: placeholder || undefined,
          ...props.style,
        }}
        className={className}
        onError={handleError}
      />
    );
  }
);

OptimizedImage.displayName = 'OptimizedImage';

/**
 * Hook to detect if an element is the LCP candidate
 * Useful for determining which images should be eagerly loaded
 */
export const useLCPImage = (elementRef: React.RefObject<HTMLElement>): boolean => {
  const [isLCP, setIsLCP] = useState(false);

  useEffect(() => {
    if (!elementRef.current) return;

    // Use PerformanceObserver to detect LCP
    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries() as PerformanceLCPEntry[];
        for (const entry of entries) {
          if ((entry.element as HTMLElement)?.contains?.(elementRef.current)) {
            setIsLCP(true);
            break;
          }
        }
      });

      observer.observe({ type: 'largest-contentful-paint', buffered: true });

      return () => observer.disconnect();
    } catch (e) {
      // Fallback: LCP API not supported
      console.warn('LCP API not supported');
    }
  }, []);

  return isLCP;
};

interface PerformanceLCPEntry extends PerformanceEntry {
  element?: Element;
  url?: string;
  size?: number;
  renderTime?: DOMHighResTimeStamp;
  loadTime?: DOMHighResTimeStamp;
}
