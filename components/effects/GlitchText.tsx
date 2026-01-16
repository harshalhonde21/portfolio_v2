"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlitchTextProps {
  children: ReactNode;
  className?: string;
}

export function GlitchText({ children, className = "" }: GlitchTextProps) {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      whileHover={{
        x: [0, -2, 2, -2, 2, 0],
        transition: { duration: 0.3 },
      }}
    >
      {children}
    </motion.span>
  );
}
