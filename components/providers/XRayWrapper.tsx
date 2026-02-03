"use client";

/**
 * X-Ray Provider Wrapper
 * Client component wrapper for XRay context
 */

import { XRayProvider } from "@/lib/xray/XRayContext";
import { XRayOverlay } from "@/components/xray/XRayOverlay";
import { XRayScanner } from "@/components/xray/XRayScanner";
import { GlobalSearch } from "@/components/features/GlobalSearch";
import { ReactNode } from "react";

interface XRayWrapperProps {
  children: ReactNode;
}

export function XRayWrapper({ children }: XRayWrapperProps) {
  return (
    <XRayProvider>
      {children}
      <XRayOverlay />
      <XRayScanner />
      <GlobalSearch />
    </XRayProvider>
  );
}
