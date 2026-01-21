"use client";

/**
 * Narration Toggle
 * Small toggle button for narration mode
 */

import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { useNarration } from "@/lib/narration";

export function NarrationToggle() {
  const { enabled, toggle } = useNarration();

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
            ? "bg-neon-purple/20 border-neon-purple/50 text-neon-purple"
            : "bg-transparent border-primary/30 text-muted-foreground hover:border-primary hover:text-primary"
        }
      `}
      title="Narrated Scroll"
      aria-pressed={enabled}
      aria-label="Toggle Narrated Scroll Mode"
    >
      <MessageSquare className="w-4 h-4" />

      {/* Active indicator */}
      {enabled && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-2 h-2 bg-neon-purple rounded-full"
        />
      )}
    </motion.button>
  );
}
