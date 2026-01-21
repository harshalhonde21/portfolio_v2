"use client";

/**
 * Narration HUD
 * Displays scroll-triggered engineering insights
 */

import { motion, AnimatePresence } from "framer-motion";
import { useNarration } from "@/lib/narration";
import { NARRATION_FADE_DURATION } from "@/lib/narration/config";

export function NarrationHUD() {
  const { currentMessage, enabled } = useNarration();

  if (!enabled) return null;

  return (
    <AnimatePresence>
      {currentMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: NARRATION_FADE_DURATION / 1000 }}
          className="narration-hud"
        >
          <div className="narration-indicator">
            <span className="narration-dot" />
          </div>
          <span className="narration-message">{currentMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
