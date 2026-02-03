"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useXRay } from "@/lib/xray/XRayContext";

export function XRayScanner() {
  const { enabled } = useXRay();

  return (
    <AnimatePresence>
      {enabled && (
        <>
          {/* Main Scanning Beam */}
          <motion.div
            initial={{ left: "-10%" }}
            animate={{ left: "110%" }}
            transition={{
              duration: 3,
              ease: "linear",
              repeat: Infinity,
              repeatDelay: 0,
            }}
            className="fixed top-0 bottom-0 w-[150px] z-[45] pointer-events-none flex flex-col items-center justify-center overflow-hidden"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(0, 255, 255, 0.02) 20%, rgba(0, 255, 255, 0.1) 50%, rgba(0, 255, 255, 0.02) 80%, transparent 100%)",
            }}
          >
            {/* Core Bright Line */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-neon-cyan shadow-[0_0_20px_rgba(0,255,255,1),0_0_40px_rgba(0,255,255,0.5)]" />

            {/* Vertical Grid Lines trailing */}
            <div className="absolute inset-y-0 left-0 right-1/2 bg-[repeating-linear-gradient(90deg,transparent,transparent_19px,rgba(0,255,255,0.1)_20px)] mix-blend-screen" />

            {/* Electric SVG Animation */}
            <svg
              className="absolute inset-0 w-full h-full opacity-50"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M 75 0 V 2000"
                fill="none"
                stroke="hsl(var(--neon-cyan))"
                strokeWidth="1"
                strokeDasharray="10 20"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: 1000 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </motion.div>

          {/* Secondary Fast Beam (Glitch Echo) - Now Purple */}
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{
              duration: 2,
              ease: "circIn",
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
            className="fixed top-0 bottom-0 w-[1px] z-[44] pointer-events-none bg-neon-purple/70"
            style={{
              boxShadow: "0 0 15px hsl(var(--neon-purple))",
            }}
          />

          {/* Horizontal Scan Lines (Medical Imaging Style) */}
          <motion.div
            className="fixed inset-0 z-[46] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(0,255,255,0.03)_4px)]" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
