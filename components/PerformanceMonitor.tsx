'use client';

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Web Vitals monitoring
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Core Web Vitals monitoring
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Log performance metrics to console in development
          if (process.env.NODE_ENV === 'development') {
            console.log(`${entry.name}: ${entry.duration}ms`);
          }
          
          // In production, you can send to analytics
          if (process.env.NODE_ENV === 'production' && window.gtag) {
            window.gtag('event', 'web_vitals', {
              name: entry.name,
              value: entry.duration,
              custom_parameter_1: entry.entryType,
            });
          }
        });
      });

      // Observe navigation and resource timing
      try {
        observer.observe({ entryTypes: ['navigation', 'resource', 'measure'] });
      } catch {
        // Fallback for older browsers
        console.warn('Performance Observer not supported');
      }

      // Cleanup
      return () => {
        observer.disconnect();
      };
    }
  }, []);

  // This component doesn't render anything
  return null;
}

// Type declaration for gtag
declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: object) => void;
  }
}