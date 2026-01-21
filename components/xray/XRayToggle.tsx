"use client";

/**
 * X-Ray Toggle Button
 * Header button to toggle Architecture X-Ray Mode
 */

import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { useXRay } from "@/lib/xray/XRayContext";

export function XRayToggle() {
  const { enabled, toggle } = useXRay();

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative p-2 font-mono text-xs uppercase tracking-wider
        border transition-all duration-200
        ${
          enabled
            ? "bg-neon-cyan/20 border-neon-cyan text-neon-cyan shadow-neon-cyan"
            : "bg-transparent border-primary/30 text-muted-foreground hover:border-primary hover:text-primary"
        }
      `}
      title="Architecture X-Ray"
      aria-pressed={enabled}
      aria-label="Toggle Architecture X-Ray Mode"
    >
      <Layers className="w-4 h-4" />

      {/* Active indicator */}
      {enabled && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-2 h-2 bg-neon-cyan rounded-full shadow-neon-cyan"
        />
      )}

      {/* Pulse effect when active */}
      {enabled && (
        <motion.div
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute inset-0 border border-neon-cyan rounded-sm pointer-events-none"
        />
      )}
    </motion.button>
  );
}
