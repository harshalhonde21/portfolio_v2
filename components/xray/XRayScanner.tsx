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
              duration: 2.5,
              ease: "linear",
              repeat: Infinity,
              repeatDelay: 0,
            }}
            className="fixed top-0 bottom-0 w-[100px] z-[45] pointer-events-none flex flex-col items-center justify-center overflow-hidden"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.05) 30%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.05) 70%, transparent 100%)",
            }}
          >
            {/* Core Bright Line */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-white shadow-[0_0_20px_rgba(255,255,255,1),0_0_40px_rgba(var(--primary),0.8)]" />

            {/* Electric SVG Animation */}
            <svg
              className="absolute inset-0 w-full h-full opacity-80"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M 50 0 L 45 10 L 55 20 L 48 30 L 52 40 L 46 50 L 54 60 L 48 70 L 52 80 L 45 90 L 55 100 L 48 110 L 52 120 L 45 130 L 55 140 L 48 150 L 52 160 L 45 170 L 55 180 L 48 190 L 52 200 L 45 210 L 55 220 L 48 230 L 52 240 L 46 250 L 54 260 L 48 270 L 52 280 L 45 290 L 55 300 L 48 310 L 52 320 L 45 330 L 55 340 L 48 350 L 52 360 L 45 370 L 55 380 L 48 390 L 52 400 L 45 410 L 55 420 L 48 430 L 52 440 L 46 450 L 54 460 L 48 470 L 52 480 L 45 490 L 55 500 L 48 510 L 52 520 L 45 530 L 55 540 L 48 550 L 52 560 L 45 570 L 55 580 L 48 590 L 52 600 L 45 610 L 55 620 L 48 630 L 52 640 L 46 650 L 54 660 L 48 670 L 52 680 L 45 690 V 2000"
                fill="none"
                stroke="white"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                initial={{ pathOffset: 0 }}
                animate={{
                  d: [
                    "M 50 0 L 45 20 L 55 40 L 45 60 L 55 80 L 45 100 L 55 120 L 45 140 L 55 160 L 45 180 V 1000",
                    "M 50 0 L 55 20 L 45 40 L 55 60 L 45 80 L 55 100 L 45 120 L 55 140 L 45 160 L 55 180 V 1000",
                    "M 50 0 L 45 20 L 55 40 L 45 60 L 55 80 L 45 100 L 55 120 L 45 140 L 55 160 L 45 180 V 1000",
                  ],
                  x: [-2, 2, -2, 1, -1, 0],
                }}
                transition={{
                  d: {
                    duration: 0.1,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                  x: {
                    duration: 0.2,
                    repeat: Infinity,
                    repeatType: "mirror",
                  },
                }}
                style={{ filter: "drop-shadow(0 0 5px white)" }}
              />
            </svg>
          </motion.div>

          {/* Secondary Fast Beam (Glitch Echo) */}
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{
              duration: 1.5,
              ease: "circIn",
              repeat: Infinity,
              repeatDelay: 0.8,
            }}
            className="fixed top-0 bottom-0 w-[2px] z-[44] pointer-events-none bg-neon-cyan/50"
            style={{
              boxShadow: "0 0 20px hsl(var(--neon-cyan))",
            }}
          />

          {/* Random Glitch Horizontal Lines */}
          <motion.div
            className="fixed inset-0 z-[46] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.1, 0, 0.2, 0] }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          >
            <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-white shadow-[0_0_10px_white]" />
            <div className="absolute top-2/3 left-0 right-0 h-[1px] bg-white shadow-[0_0_10px_white]" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
