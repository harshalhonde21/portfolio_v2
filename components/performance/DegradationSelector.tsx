"use client";

/**
 * Degradation Selector
 * Compact dropdown for performance mode selection
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gauge,
  Zap,
  Smartphone,
  WifiOff,
  EyeOff,
  ChevronDown,
} from "lucide-react";
import {
  usePerformance,
  PerformanceMode,
  MODE_CONFIGS,
} from "@/lib/performance";

const ICONS = {
  zap: Zap,
  smartphone: Smartphone,
  "wifi-off": WifiOff,
  "eye-off": EyeOff,
};

export function DegradationSelector() {
  const { mode, setMode, config } = usePerformance();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const modes: PerformanceMode[] = [
    "normal",
    "low-end",
    "slow-network",
    "reduced-motion",
  ];
  const CurrentIcon = ICONS[config.icon];

  return (
    <div ref={ref} className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-1.5 p-2 font-mono text-xs uppercase tracking-wider
          border transition-all duration-200
          ${
            mode !== "normal"
              ? "bg-neon-yellow/10 border-neon-yellow/50 text-neon-yellow"
              : "bg-transparent border-primary/30 text-muted-foreground hover:border-primary hover:text-primary"
          }
        `}
        title="Performance Mode"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Gauge className="w-4 h-4" />
        <ChevronDown
          className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />

        {/* Active mode indicator */}
        {mode !== "normal" && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-2 h-2 bg-neon-yellow rounded-full"
          />
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 z-50"
          >
            <div className="bg-black/95 border border-primary/30 backdrop-blur-md min-w-[180px]">
              <div className="px-3 py-2 border-b border-primary/20">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Performance Mode
                </span>
              </div>

              <ul role="listbox" className="py-1">
                {modes.map((m) => {
                  const modeConfig = MODE_CONFIGS[m];
                  const Icon = ICONS[modeConfig.icon];
                  const isActive = mode === m;

                  return (
                    <li key={m}>
                      <button
                        role="option"
                        aria-selected={isActive}
                        onClick={() => {
                          setMode(m);
                          setIsOpen(false);
                        }}
                        className={`
                          w-full flex items-center gap-2 px-3 py-2 text-left
                          font-mono text-xs transition-colors
                          ${
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                          }
                        `}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{modeConfig.label}</span>
                        {isActive && (
                          <span className="ml-auto text-neon-cyan">●</span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
