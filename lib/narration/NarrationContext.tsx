"use client";

/**
 * Narration Context
 * Manages scroll-triggered narration state
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  ReactNode,
} from "react";
import { getNarration, NARRATION_DISPLAY_DURATION, NARRATIONS } from "./config";
import { usePerformanceMode } from "@/lib/performance";

interface NarrationContextValue {
  /** Whether narration mode is enabled */
  enabled: boolean;
  /** Toggle narration mode */
  toggle: () => void;
  /** Current message to display */
  currentMessage: string | null;
  /** Check if section has been seen */
  hasSeen: (sectionId: string) => boolean;
}

const NarrationContext = createContext<NarrationContextValue | null>(null);

interface NarrationProviderProps {
  children: ReactNode;
}

export function NarrationProvider({ children }: NarrationProviderProps) {
  const [enabled, setEnabled] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  const seenSectionsRef = useRef<Set<string>>(new Set());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const performanceMode = usePerformanceMode();

  // Respect reduced motion
  const isReducedMotion = performanceMode === "reduced-motion";

  const toggle = useCallback(() => {
    setEnabled((prev) => !prev);
    if (enabled) {
      setCurrentMessage(null);
      seenSectionsRef.current.clear();
    }
  }, [enabled]);

  const hasSeen = useCallback((sectionId: string) => {
    return seenSectionsRef.current.has(sectionId);
  }, []);

  // Show narration for a section
  const showNarration = useCallback(
    (sectionId: string) => {
      if (!enabled || isReducedMotion) return;
      if (seenSectionsRef.current.has(sectionId)) return;

      const narration = getNarration(sectionId);
      if (!narration) return;

      // Mark as seen
      seenSectionsRef.current.add(sectionId);

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Show message after delay
      const delay = narration.delay ?? 300;
      setTimeout(() => {
        setCurrentMessage(narration.message);

        // Auto-dismiss
        timeoutRef.current = setTimeout(() => {
          setCurrentMessage(null);
        }, NARRATION_DISPLAY_DURATION);
      }, delay);
    },
    [enabled, isReducedMotion],
  );

  // Setup IntersectionObserver
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const sections = NARRATIONS.map((n) =>
      document.getElementById(n.sectionId),
    ).filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            showNarration(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-10% 0px -10% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [enabled, showNarration]);

  const value = useMemo<NarrationContextValue>(
    () => ({
      enabled,
      toggle,
      currentMessage,
      hasSeen,
    }),
    [enabled, toggle, currentMessage, hasSeen],
  );

  return (
    <NarrationContext.Provider value={value}>
      {children}
    </NarrationContext.Provider>
  );
}

/**
 * Hook to access narration context
 */
export function useNarration(): NarrationContextValue {
  const context = useContext(NarrationContext);
  if (!context) {
    throw new Error("useNarration must be used within NarrationProvider");
  }
  return context;
}
