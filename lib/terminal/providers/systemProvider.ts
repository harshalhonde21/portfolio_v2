/**
 * System Data Provider
 * Real browser API data for system.* commands
 */

import type { PerformanceMetrics, EnvironmentInfo } from '../types';

/** Get performance metrics from browser APIs */
export function getPerformanceMetrics(): PerformanceMetrics {
  const metrics: PerformanceMetrics = {
    domContentLoaded: null,
    loadComplete: null,
    firstPaint: null,
    fps: null,
    memoryUsed: null,
    memoryTotal: null,
  };

  // Navigation Timing API
  if (typeof window !== 'undefined' && window.performance) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;

    if (navigation) {
      metrics.domContentLoaded = Math.round(navigation.domContentLoadedEventEnd - navigation.startTime);
      metrics.loadComplete = Math.round(navigation.loadEventEnd - navigation.startTime);
    }

    // First Paint
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    if (firstPaint) {
      metrics.firstPaint = Math.round(firstPaint.startTime);
    }

    // Memory (Chrome only)
    const mem = (performance as Performance & { memory?: { usedJSHeapSize: number; totalJSHeapSize: number } }).memory;
    if (mem) {
      metrics.memoryUsed = Math.round(mem.usedJSHeapSize / 1024 / 1024);
      metrics.memoryTotal = Math.round(mem.totalJSHeapSize / 1024 / 1024);
    }
  }

  return metrics;
}

/** Estimate current FPS using requestAnimationFrame */
export function estimateFPS(callback: (fps: number) => void): () => void {
  let frameCount = 0;
  let lastTime = performance.now();
  let animationId: number;

  const measure = () => {
    frameCount++;
    const currentTime = performance.now();

    if (currentTime - lastTime >= 1000) {
      callback(frameCount);
      frameCount = 0;
      lastTime = currentTime;
    }

    animationId = requestAnimationFrame(measure);
  };

  animationId = requestAnimationFrame(measure);

  // Return cleanup function
  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  };
}

/** Get environment information */
export function getEnvironmentInfo(): EnvironmentInfo {
  if (typeof window === 'undefined') {
    return {
      userAgent: 'Server',
      platform: 'Server',
      screenWidth: 0,
      screenHeight: 0,
      devicePixelRatio: 1,
      reducedMotion: false,
      online: true,
      language: 'en',
    };
  }

  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    devicePixelRatio: window.devicePixelRatio,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    online: navigator.onLine,
    language: navigator.language,
  };
}

/** Format uptime from milliseconds to human readable */
export function formatUptime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }
  return `${seconds}s`;
}

/** Format timestamp to HH:MM:SS */
export function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}
