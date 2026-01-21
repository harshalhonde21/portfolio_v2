"use client";

/**
 * X-Ray Provider Wrapper
 * Client component wrapper for XRay context
 */

import { XRayProvider } from "@/lib/xray/XRayContext";
import { XRayOverlay } from "@/components/xray/XRayOverlay";
import { ReactNode } from "react";

interface XRayWrapperProps {
  children: ReactNode;
}

export function XRayWrapper({ children }: XRayWrapperProps) {
  return (
    <XRayProvider>
      {children}
      <XRayOverlay />
    </XRayProvider>
  );
}
