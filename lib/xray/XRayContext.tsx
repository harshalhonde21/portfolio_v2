"use client";

/**
 * X-Ray Context
 * Provides global state for Architecture X-Ray Mode
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useMemo,
} from "react";

interface XRayContextValue {
  /** Whether X-Ray mode is enabled */
  enabled: boolean;
  /** Toggle X-Ray mode on/off */
  toggle: () => void;
  /** Enable X-Ray mode */
  enable: () => void;
  /** Disable X-Ray mode */
  disable: () => void;
  /** Currently hovered section id */
  hoveredSection: string | null;
  /** Set hovered section */
  setHoveredSection: (id: string | null) => void;
}

const XRayContext = createContext<XRayContextValue | null>(null);

interface XRayProviderProps {
  children: ReactNode;
}

export function XRayProvider({ children }: XRayProviderProps) {
  const [enabled, setEnabled] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const toggle = useCallback(() => {
    setEnabled((prev) => !prev);
    // Clear hover state when toggling off
    if (enabled) {
      setHoveredSection(null);
    }
  }, [enabled]);

  const enable = useCallback(() => setEnabled(true), []);
  const disable = useCallback(() => {
    setEnabled(false);
    setHoveredSection(null);
  }, []);

  const value = useMemo<XRayContextValue>(
    () => ({
      enabled,
      toggle,
      enable,
      disable,
      hoveredSection,
      setHoveredSection,
    }),
    [enabled, toggle, enable, disable, hoveredSection],
  );

  return <XRayContext.Provider value={value}>{children}</XRayContext.Provider>;
}

/**
 * Hook to access X-Ray context
 */
export function useXRay(): XRayContextValue {
  const context = useContext(XRayContext);
  if (!context) {
    throw new Error("useXRay must be used within XRayProvider");
  }
  return context;
}

/**
 * Hook to check if X-Ray is enabled (safe outside provider)
 */
export function useXRayEnabled(): boolean {
  const context = useContext(XRayContext);
  return context?.enabled ?? false;
}
