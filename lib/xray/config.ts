/**
 * X-Ray Architecture Configuration
 * Metadata for all portfolio sections defining their architecture
 */

import type { SectionMeta } from './types';

/**
 * Section architecture metadata
 * Each entry describes how a section is built and why
 */
export const SECTION_ARCHITECTURE: Record<string, SectionMeta> = {
  // Hero Section
  hero: {
    id: 'hero',
    label: 'Hero',
    componentType: 'client',
    dataSource: 'static',
    rationale: 'Client-side for terminal interactivity and animations',
    layer: 'content',
    dependencies: ['effects-grid', 'effects-scanlines'],
    labelPosition: 'top-left',
  },

  // About Section
  about: {
    id: 'about',
    label: 'About',
    componentType: 'client',
    dataSource: 'static',
    rationale: 'Client-side for image hover effects and transitions',
    layer: 'content',
    labelPosition: 'top-left',
  },

  // Skills Section
  skills: {
    id: 'skills',
    label: 'Skills',
    componentType: 'client',
    dataSource: 'static',
    rationale: 'Client-side for badge animations and grouping logic',
    layer: 'content',
    labelPosition: 'top-left',
  },

  // Experience Section
  experience: {
    id: 'experience',
    label: 'Experience',
    componentType: 'client',
    dataSource: 'static',
    rationale: 'Client-side for timeline animations and card hovers',
    layer: 'content',
    labelPosition: 'top-left',
  },

  // Projects Section
  projects: {
    id: 'projects',
    label: 'Projects',
    componentType: 'client',
    dataSource: 'static',
    rationale: 'Client-side for project card interactions',
    layer: 'content',
    dependencies: ['gallery'],
    labelPosition: 'top-left',
  },

  // Gallery Section
  gallery: {
    id: 'gallery',
    label: 'Gallery',
    componentType: 'client',
    dataSource: 'static',
    rationale: 'Client-side for lightbox and image transitions',
    layer: 'content',
    labelPosition: 'top-left',
  },

  // Contact Section
  contact: {
    id: 'contact',
    label: 'Contact',
    componentType: 'client',
    dataSource: 'hybrid',
    rationale: 'Client-side for form state; static social links',
    layer: 'content',
    labelPosition: 'top-left',
  },
};

/**
 * Layout components metadata (Header, Footer, etc.)
 */
export const LAYOUT_ARCHITECTURE: Record<string, SectionMeta> = {
  header: {
    id: 'header',
    label: 'Header',
    componentType: 'client',
    dataSource: 'static',
    rationale: 'Client-side for nav state and theme toggle',
    layer: 'layout',
    labelPosition: 'top-right',
  },

  footer: {
    id: 'footer',
    label: 'Footer',
    componentType: 'client',
    dataSource: 'static',
    rationale: 'Client-side for social link interactions',
    layer: 'layout',
    labelPosition: 'bottom-left',
  },
};

/**
 * Effects/overlay metadata
 */
export const EFFECTS_ARCHITECTURE: Record<string, SectionMeta> = {
  'effects-grid': {
    id: 'effects-grid',
    label: 'Cyber Grid',
    componentType: 'effects',
    dataSource: 'static',
    rationale: 'Pure CSS background pattern overlay',
    layer: 'effects',
    labelPosition: 'top-right',
  },

  'effects-scanlines': {
    id: 'effects-scanlines',
    label: 'Scanlines',
    componentType: 'effects',
    dataSource: 'static',
    rationale: 'CSS pseudo-element for CRT effect',
    layer: 'effects',
    labelPosition: 'top-right',
  },
};

/**
 * Get all architecture metadata combined
 */
export function getAllArchitecture(): SectionMeta[] {
  return [
    ...Object.values(SECTION_ARCHITECTURE),
    ...Object.values(LAYOUT_ARCHITECTURE),
    ...Object.values(EFFECTS_ARCHITECTURE),
  ];
}

/**
 * Get section meta by id
 */
export function getSectionMeta(id: string): SectionMeta | undefined {
  return (
    SECTION_ARCHITECTURE[id] ||
    LAYOUT_ARCHITECTURE[id] ||
    EFFECTS_ARCHITECTURE[id]
  );
}
