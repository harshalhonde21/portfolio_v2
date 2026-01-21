/**
 * Architecture Constants
 * Real architectural metadata for system.architecture command
 */

export const FRAMEWORK_INFO = {
  name: 'Next.js',
  version: '15',
  router: 'App Router',
  react: '19',
} as const;

export const RENDERING_MODEL = {
  type: 'Server/Client Hybrid',
  serverComponents: true,
  clientComponents: true,
  streaming: true,
} as const;

export const STYLING_SYSTEM = {
  framework: 'Tailwind CSS',
  version: '3.4',
  config: 'Cyberpunk Theme',
  features: ['Custom color system', 'Neon shadows', 'Glitch animations'],
} as const;

export const ANIMATION_SYSTEM = {
  library: 'Framer Motion',
  version: '12',
  features: ['Drag controls', 'Layout animations', 'Gesture support'],
} as const;

export const FONT_SYSTEM = {
  mono: 'JetBrains Mono',
  display: 'Orbitron',
  provider: 'next/font',
} as const;

export const FILE_STRUCTURE = {
  app: {
    path: 'app/',
    purpose: 'Routes, layouts, pages',
    files: ['layout.tsx', 'page.tsx', 'globals.css'],
  },
  components: {
    path: 'components/',
    purpose: 'UI components',
    subdirs: ['effects/', 'layout/', 'providers/', 'sections/', 'ui/'],
  },
  lib: {
    path: 'lib/',
    purpose: 'Utilities and constants',
    subdirs: ['constants/', 'terminal/', 'utils/'],
  },
} as const;

export const COMPONENT_ESTIMATE = {
  /** Approximate server component ratio */
  serverRatio: 0.3,
  /** Approximate client component ratio */
  clientRatio: 0.7,
  /** Note about estimation */
  note: 'Estimated from use client directives',
} as const;
