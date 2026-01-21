/**
 * Performance Mode Types
 * Type definitions for progressive degradation system
 */

/** Available performance modes */
export type PerformanceMode = 'normal' | 'low-end' | 'slow-network' | 'reduced-motion';

/** Configuration per performance mode */
export interface PerformanceConfig {
  /** Glow effect intensity (0-1) */
  glowIntensity: number;
  /** Animation duration multiplier (0-1) */
  animationDuration: number;
  /** Enable heavy visual effects */
  enableEffects: boolean;
  /** Enable glow/shadow effects */
  enableGlow: boolean;
  /** CSS class to apply to document */
  cssClass: string;
  /** Human-readable label */
  label: string;
  /** Icon hint */
  icon: 'zap' | 'smartphone' | 'wifi-off' | 'eye-off';
}

/** Mode configuration mapping */
export const MODE_CONFIGS: Record<PerformanceMode, PerformanceConfig> = {
  normal: {
    glowIntensity: 1,
    animationDuration: 1,
    enableEffects: true,
    enableGlow: true,
    cssClass: '',
    label: 'Normal',
    icon: 'zap',
  },
  'low-end': {
    glowIntensity: 0.3,
    animationDuration: 0.6,
    enableEffects: false,
    enableGlow: false,
    cssClass: 'perf-low-end',
    label: 'Low-End Device',
    icon: 'smartphone',
  },
  'slow-network': {
    glowIntensity: 0.6,
    animationDuration: 0.5,
    enableEffects: true,
    enableGlow: true,
    cssClass: 'perf-slow-network',
    label: 'Slow Network',
    icon: 'wifi-off',
  },
  'reduced-motion': {
    glowIntensity: 0.5,
    animationDuration: 0,
    enableEffects: false,
    enableGlow: true,
    cssClass: 'perf-reduced-motion',
    label: 'Reduced Motion',
    icon: 'eye-off',
  },
};

/** Get Framer Motion transition config for mode */
export function getMotionTransition(mode: PerformanceMode) {
  const config = MODE_CONFIGS[mode];

  if (config.animationDuration === 0) {
    return { duration: 0 };
  }

  return {
    duration: 0.4 * config.animationDuration,
    ease: 'easeOut' as const,
  };
}

/** Get Framer Motion animation config for mode */
export function getMotionConfig(mode: PerformanceMode) {
  const config = MODE_CONFIGS[mode];

  return {
    transition: getMotionTransition(mode),
    // Simplified animations for reduced motion
    animate: config.animationDuration === 0
      ? { opacity: 1 }
      : undefined,
  };
}
