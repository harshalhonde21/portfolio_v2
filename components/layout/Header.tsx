"use client";

import { PERSONAL_INFO } from "@/lib/constants/portfolio";
import { Navigation } from "@/components/layout/Navigation";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { XRayToggle } from "@/components/xray/XRayToggle";
import { DegradationSelector } from "@/components/performance/DegradationSelector";
import { NarrationToggle } from "@/components/narration/NarrationToggle";
import { MobileNav } from "@/components/layout/MobileNav";
import { useAdminAuth } from "@/components/providers/AdminAuthProvider";
import { Lock } from "lucide-react";
import Link from "next/link";

export function Header() {
  const { isAuthenticated } = useAdminAuth();
  return (
    <header
      id="header"
      className="sticky top-0 z-50 w-full border-b border-primary/30 bg-background/95 backdrop-blur-md shadow-glow-sm"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Terminal style */}
          <a
            href="#"
            className="group flex items-center gap-2 focus-outline rounded-sm"
          >
            <span className="text-primary font-mono text-lg font-bold tracking-wider uppercase">
              <span className="text-neon-cyan">&gt;</span>_
              <span className="neon-text">
                {PERSONAL_INFO.name.split(" ")[0]}
              </span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-2">
            <Navigation />
            <div className="w-px h-6 bg-primary/30" />
            <DegradationSelector />
            <NarrationToggle />
            <XRayToggle />
            <ThemeToggle />
            {isAuthenticated && (
              <Link
                href="/admin"
                className="text-neon-cyan hover:text-neon-green transition-colors"
              >
                <Lock size={18} />
              </Link>
            )}
          </div>

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </div>

      {/* Bottom neon line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent shadow-glow-sm" />
    </header>
  );
}
