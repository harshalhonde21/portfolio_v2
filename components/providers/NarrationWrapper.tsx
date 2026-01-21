"use client";

/**
 * Narration Provider Wrapper
 * Client component wrapper for narration context
 */

import { NarrationProvider } from "@/lib/narration";
import { NarrationHUD } from "@/components/narration/NarrationHUD";
import { ReactNode } from "react";

interface NarrationWrapperProps {
  children: ReactNode;
}

export function NarrationWrapper({ children }: NarrationWrapperProps) {
  return (
    <NarrationProvider>
      {children}
      <NarrationHUD />
    </NarrationProvider>
  );
}
