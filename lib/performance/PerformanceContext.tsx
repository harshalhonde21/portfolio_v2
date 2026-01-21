"use client";

/**
 * Performance Context
 * Centralized performance mode control
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import {
  PerformanceMode,
  PerformanceConfig,
  MODE_CONFIGS,
  getMotionTransition,
} from "./types";

interface PerformanceContextValue {
  /** Current performance mode */
  mode: PerformanceMode;
  /** Current mode configuration */
  config: PerformanceConfig;
  /** Set performance mode */
  setMode: (mode: PerformanceMode) => void;
  /** Get Framer Motion transition for current mode */
  getTransition: () => ReturnType<typeof getMotionTransition>;
}

const PerformanceContext = createContext<PerformanceContextValue | null>(null);

interface PerformanceProviderProps {
  children: ReactNode;
}

export function PerformanceProvider({ children }: PerformanceProviderProps) {
  const [mode, setModeState] = useState<PerformanceMode>("normal");

  // Detect prefers-reduced-motion on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      setModeState("reduced-motion");
    }

    // Listen for changes
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setModeState("reduced-motion");
      }
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Apply CSS class to html element
  useEffect(() => {
    if (typeof document === "undefined") return;

    const html = document.documentElement;

    // Remove all performance classes
    html.classList.remove(
      "perf-low-end",
      "perf-slow-network",
      "perf-reduced-motion",
    );

    // Add current mode class
    const cssClass = MODE_CONFIGS[mode].cssClass;
    if (cssClass) {
      html.classList.add(cssClass);
    }

    // Set CSS variables
    const config = MODE_CONFIGS[mode];
    html.style.setProperty(
      "--perf-glow-intensity",
      String(config.glowIntensity),
    );
    html.style.setProperty(
      "--perf-animation-duration",
      String(config.animationDuration),
    );
    html.style.setProperty(
      "--perf-effect-opacity",
      config.enableEffects ? "1" : "0",
    );
  }, [mode]);

  const setMode = useCallback((newMode: PerformanceMode) => {
    setModeState(newMode);
  }, []);

  const getTransition = useCallback(() => {
    return getMotionTransition(mode);
  }, [mode]);

  const value = useMemo<PerformanceContextValue>(
    () => ({
      mode,
      config: MODE_CONFIGS[mode],
      setMode,
      getTransition,
    }),
    [mode, setMode, getTransition],
  );

  return (
    <PerformanceContext.Provider value={value}>
      {children}
    </PerformanceContext.Provider>
  );
}

/**
 * Hook to access performance context
 */
export function usePerformance(): PerformanceContextValue {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error("usePerformance must be used within PerformanceProvider");
  }
  return context;
}

/**
 * Hook to get current performance mode (safe outside provider)
 */
export function usePerformanceMode(): PerformanceMode {
  const context = useContext(PerformanceContext);
  return context?.mode ?? "normal";
}
