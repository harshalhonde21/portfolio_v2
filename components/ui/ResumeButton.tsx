"use client";

import { Download } from "lucide-react";
import { motion } from "framer-motion";

export function ResumeButton() {
  return (
    <motion.a
      href="https://docs.google.com/document/d/19vr0G5935ud-qIeeRztN-juXTKoVTVedO1atqXMzKa4/edit?usp=sharing"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 sharp-sm font-mono font-medium uppercase tracking-wider transition-all focus-outline bg-transparent border border-primary text-primary hover:bg-primary/10 hover:shadow-glow active:shadow-glow-lg neon-border"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1,
        }}
      >
        <Download className="w-5 h-5" />
      </motion.div>

      <span className="relative">
        [Resume]
        <motion.span
          className="absolute -bottom-0.5 left-0 h-0.5 bg-primary"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      </span>

      {/* Glow effect */}
      <div className="absolute inset-0 -z-10 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity blur-xl bg-primary/20" />
    </motion.a>
  );
}
