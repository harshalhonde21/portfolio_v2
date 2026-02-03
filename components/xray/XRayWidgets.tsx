"use client";

import { motion } from "framer-motion";
import { useXRay } from "@/lib/xray/XRayContext";
import { useEffect, useState } from "react";

// --- Biometric Circle Widget ---
export function BiometricCircle({ className = "", delay = 0 }) {
  return (
    <div
      className={`relative w-24 h-24 flex items-center justify-center ${className}`}
    >
      {/* Outer rotating ring */}
      <motion.div
        className="absolute inset-0 border border-neon-cyan/30 rounded-full border-t-neon-cyan border-r-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", delay }}
      />
      {/* Inner counter-rotating ring */}
      <motion.div
        className="absolute inset-2 border border-neon-purple/30 rounded-full border-b-neon-purple border-l-transparent"
        animate={{ rotate: -360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear", delay }}
      />
      {/* Center scan pulsing */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-12 h-12 rounded-full bg-neon-teal/10 border border-neon-teal/40"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay }}
        />
      </div>
      {/* Decorative ticks */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-1 bg-neon-cyan"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-1 bg-neon-cyan"></div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0.5 bg-neon-cyan"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-0.5 bg-neon-cyan"></div>
    </div>
  );
}

// --- Pulse/Signal Graph Widget ---
export function PulseGraph({ className = "" }) {
  return (
    <div
      className={`relative h-16 w-48 overflow-hidden bg-black/20 border-l border-b border-neon-electric/30 ${className}`}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,32 Q10,32 20,32 T40,20 T60,44 T80,32 T100,32 T120,32 T140,10 T160,50 T180,32 L200,32"
          fill="none"
          stroke="hsl(var(--neon-electric))"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        />
        {/* Gradient fill under line */}
        <motion.path
          d="M0,32 Q10,32 20,32 T40,20 T60,44 T80,32 T100,32 T120,32 T140,10 T160,50 T180,32 L200,32 V64 H0 Z"
          fill="hsl(var(--neon-electric))"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
        />
      </svg>
    </div>
  );
}

// --- Skeletal Segment Overlay ---
export function SkeletalOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[6] opacity-30">
      {/* Top Right Shoulder/Ribcage hint */}
      <svg
        className="absolute top-10 right-10 w-64 h-64 opacity-50"
        viewBox="0 0 100 100"
      >
        <motion.path
          d="M20,20 C40,20 50,40 50,60 C50,80 40,90 20,90"
          fill="none"
          stroke="hsl(var(--neon-cyan))"
          strokeWidth="0.5"
          strokeDasharray="5,5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        <motion.path
          d="M30,25 C45,25 55,40 55,60 C55,75 45,85 30,85"
          fill="none"
          stroke="hsl(var(--neon-cyan))"
          strokeWidth="0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.2 }}
        />
        <circle cx="50" cy="60" r="2" fill="hsl(var(--neon-lime))" />
      </svg>

      {/* Bottom Left Pelvis/Hip hint */}
      <svg
        className="absolute bottom-10 left-10 w-64 h-64 opacity-50 rotate-180"
        viewBox="0 0 100 100"
      >
        <path
          d="M20,20 C50,20 60,40 60,60"
          fill="none"
          stroke="hsl(var(--neon-purple))"
          strokeWidth="0.5"
        />
        <path
          d="M25,30 C50,30 55,45 55,60"
          fill="none"
          stroke="hsl(var(--neon-purple))"
          strokeWidth="0.5"
          strokeDasharray="2,4"
        />
      </svg>
    </div>
  );
}

// --- Data Panel with Rolling Numbers ---
export function DataPanel({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVal(Math.floor(Math.random() * 999));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`p-2 border border-neon-cyan/20 bg-black/40 backdrop-blur-sm text-[10px] font-mono select-none ${className}`}
    >
      <div className="text-neon-cyan uppercase tracking-wider mb-1 border-b border-neon-cyan/20 pb-1">
        {title}
      </div>
      <div className="flex justify-between text-neon-teal">
        <span>CPU: {Math.floor(val / 10)}%</span>
        <span>MEM: {Math.floor(val / 5)}MB</span>
      </div>
      <div className="flex justify-between text-neon-purple mt-0.5">
        <span>NET: {Math.floor(val * 1.5)}Mb/s</span>
      </div>
    </div>
  );
}

export function XRayWidgets() {
  const { enabled } = useXRay();

  if (!enabled) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 pointer-events-none z-[20] overflow-hidden"
    >
      {/* Top Left Group */}
      <div className="absolute top-8 left-8 flex flex-col gap-4">
        <BiometricCircle />
        <DataPanel title="System Architecture" className="w-32" />
      </div>

      {/* Top Right Group */}
      <div className="absolute top-24 right-8 flex flex-col items-end gap-2">
        <PulseGraph />
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-neon-lime rounded-full animate-pulse"></div>
          <span className="text-xs text-neon-lime font-mono tracking-widest">
            CODE INTEGRITY: 100%
          </span>
        </div>
        <DataPanel title="Runtime Metrics" className="w-40" />
      </div>

      {/* Bottom Left Group */}
      <div className="absolute bottom-12 left-8">
        <DataPanel title="Tech Stack Sync" className="w-48" />
        <div className="mt-2 flex gap-1">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-4 bg-neon-electric"
              animate={{ height: [4, 16, 4] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>

      {/* Bottom Right Group */}
      <div className="absolute bottom-12 right-12">
        <BiometricCircle delay={1} className="scale-75 origin-bottom-right" />
      </div>

      {/* Center Crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20">
        <div className="w-[400px] h-[1px] bg-neon-cyan/50"></div>
        <div className="h-[400px] w-[1px] bg-neon-cyan/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="w-20 h-20 border border-neon-cyan/30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <SkeletalOverlay />
    </motion.div>
  );
}
