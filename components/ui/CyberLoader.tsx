"use client";

import { motion } from "framer-motion";

export function CyberLoader({
  text = "PROCESSING",
  size = "md",
}: {
  text?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  const textSize = {
    sm: "text-[10px]",
    md: "text-xs",
    lg: "text-sm",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={`relative ${sizeClasses[size]} flex items-center justify-center`}
      >
        {/* Outer Ring */}
        <motion.div
          className="absolute inset-0 border-2 border-transparent border-t-neon-cyan border-b-neon-purple rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        {/* Inner Ring */}
        <motion.div
          className="absolute inset-2 border-2 border-transparent border-l-neon-lime border-r-neon-electric rounded-full"
          animate={{ rotate: -180 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        {/* Core Pulse */}
        <motion.div
          className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff]"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </div>

      {text && (
        <div
          className={`${textSize[size]} font-mono text-neon-cyan tracking-[0.2em] animate-pulse`}
        >
          {text}
          <span className="animate-bounce">_</span>
        </div>
      )}
    </div>
  );
}
