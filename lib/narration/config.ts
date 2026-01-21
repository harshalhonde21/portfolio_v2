/**
 * Narration Configuration
 * Engineering insights for each section
 */

import type { NarrationEntry } from './types';

/**
 * Section narrations - engineering intent messages
 * Tone: Builder's thoughts, not marketing
 */
export const NARRATIONS: NarrationEntry[] = [
  {
    sectionId: 'hero',
    message: 'Client-rendered for terminal interactivity and live animations',
  },
  {
    sectionId: 'about',
    message: 'Static data to minimize bundle — no API calls needed',
  },
  {
    sectionId: 'skills',
    message: 'Grouped by category for quick scanning — data from constants',
  },
  {
    sectionId: 'experience',
    message: 'Timeline with animated dots — client-side for hover effects',
  },
  {
    sectionId: 'projects',
    message: 'Static project data — GitHub links verified at build time',
  },
  {
    sectionId: 'gallery',
    message: 'Lazy-loaded images with lightbox — optimized for bandwidth',
  },
  {
    sectionId: 'contact',
    message: 'Form state is client-only — no server action needed yet',
  },
];

/** Get narration for a section */
export function getNarration(sectionId: string): NarrationEntry | undefined {
  return NARRATIONS.find(n => n.sectionId === sectionId);
}

/** Display duration in ms */
export const NARRATION_DISPLAY_DURATION = 2500;

/** Fade animation duration in ms */
export const NARRATION_FADE_DURATION = 300;
