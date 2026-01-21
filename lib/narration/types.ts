/**
 * Narration Types
 * Type definitions for narrated scroll system
 */

/** Single narration entry */
export interface NarrationEntry {
  /** Section DOM id to observe */
  sectionId: string;
  /** Engineering insight message */
  message: string;
  /** Delay before showing (ms, default 300) */
  delay?: number;
}

/** Narration context state */
export interface NarrationState {
  enabled: boolean;
  currentMessage: string | null;
  seenSections: Set<string>;
}
