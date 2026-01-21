"use client";

/**
 * Performance Provider Wrapper
 * Client component wrapper for performance context
 */

import { PerformanceProvider } from "@/lib/performance";
import { ReactNode } from "react";

interface PerformanceWrapperProps {
  children: ReactNode;
}

export function PerformanceWrapper({ children }: PerformanceWrapperProps) {
  return <PerformanceProvider>{children}</PerformanceProvider>;
}
