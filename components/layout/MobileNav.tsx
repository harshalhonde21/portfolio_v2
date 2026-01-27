"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants/siteConfig";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { XRayToggle } from "@/components/xray/XRayToggle";
import { DegradationSelector } from "@/components/performance/DegradationSelector";
import { NarrationToggle } from "@/components/narration/NarrationToggle";
import { cn } from "@/lib/utils/cn";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
        setActiveSection(href);
      }, 300); // Wait for menu close animation
    }
  };

  return (
    <div className="md:hidden">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-primary hover:text-neon-cyan transition-colors group"
        aria-label="Open Menu"
      >
        <Menu className="w-6 h-6" />
        <span className="absolute inset-0 bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 pointer-events-none"
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 h-[100dvh] right-0 w-full max-w-xs bg-background/95 border-l border-primary/30 z-50 flex flex-col shadow-2xl"
            >
              {/* Scanlines Effect */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] bg-[length:100%_4px,6px_100%] opacity-20" />

              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-primary/20 z-10">
                <span className="text-primary font-mono text-sm tracking-wider uppercase">
                  <span className="text-neon-cyan">&gt;</span> System_Menu
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-primary hover:text-danger transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8 z-10">
                {/* Navigation Links */}
                <nav className="flex flex-col space-y-4">
                  {NAV_ITEMS.map((item, index) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                      className={cn(
                        "text-xl font-mono uppercase tracking-widest py-2 border-l-2 pl-4 transition-all duration-300",
                        activeSection === item.href
                          ? "border-neon-cyan text-neon-cyan bg-neon-cyan/5"
                          : "border-primary/20 text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5",
                      )}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </nav>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                {/* System Controls */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <p className="text-xs font-mono text-primary/60 uppercase tracking-widest mb-4">
                      {/* System_Visuals */}
                      [Config]
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2 p-3 bg-black/20 rounded border border-primary/10">
                        <span className="text-xs text-muted-foreground font-mono">
                          Theme
                        </span>
                        <ThemeToggle />
                      </div>
                      <div className="flex flex-col gap-2 p-2 bg-black/20 rounded border border-primary/10">
                        <span className="text-xs text-muted-foreground font-mono">
                          X-Ray
                        </span>
                        <XRayToggle />
                      </div>
                    </div>

                    <div className="space-y-2 p-3 bg-black/20 rounded border border-primary/10">
                      <span className="text-xs text-muted-foreground font-mono block mb-2">
                        Performance
                      </span>
                      <div className="flex justify-center">
                        <DegradationSelector />
                      </div>
                    </div>

                    <div className="space-y-2 p-3 bg-black/20 rounded border border-primary/10">
                      <span className="text-xs text-muted-foreground font-mono block mb-2">
                        Narration
                      </span>
                      <div className="flex justify-center">
                        <NarrationToggle />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Footer Decoration */}
              <div className="p-4 text-xs font-mono text-primary/30 text-center border-t border-primary/20 bg-black/20 z-10">
                SYSTEM VER. 2.5 // ONLINE
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
