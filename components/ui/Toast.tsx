"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle,
  AlertTriangle,
  Info,
  AlertOctagon,
} from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  onDismiss: (id: string) => void;
}

const icons = {
  success: <CheckCircle className="text-neon-lime" size={20} />,
  error: <AlertOctagon className="text-danger" size={20} />,
  warning: <AlertTriangle className="text-neon-yellow" size={20} />, // neon-yellow might need definition or use generic yellow
  info: <Info className="text-neon-cyan" size={20} />,
};

const borderColors = {
  success: "border-neon-lime",
  error: "border-danger",
  warning: "border-yellow-500",
  info: "border-neon-cyan",
};

const bgColors = {
  success: "bg-neon-lime/10",
  error: "bg-danger/10",
  warning: "bg-yellow-500/10",
  info: "bg-neon-cyan/10",
};

export function Toast({
  id,
  type,
  message,
  duration = 4000,
  onDismiss,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.9 }}
      className={`relative w-80 p-4 border-l-4 ${borderColors[type]} ${bgColors[type]} backdrop-blur-md shadow-lg mb-3 flex items-start gap-3 overflow-hidden group`}
    >
      {/* Glitch overlay effect */}
      <div className="absolute inset-0 bg-scan-lines opacity-10 pointer-events-none"></div>

      {/* Icon */}
      <div className="shrink-0 mt-0.5">{icons[type]}</div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground/90">
          {type === "error"
            ? "SYSTEM_ALERT"
            : type === "success"
              ? "SUCCESS"
              : "NOTIFICATION"}
        </h4>
        <p className="text-sm font-mono text-foreground/80 break-words leading-tight mt-1">
          {message}
        </p>
      </div>

      {/* Dismiss Button */}
      <button
        onClick={() => onDismiss(id)}
        className="shrink-0 text-foreground/50 hover:text-foreground transition-colors"
      >
        <X size={16} />
      </button>

      {/* Progress Bar */}
      <motion.div
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: duration / 1000, ease: "linear" }}
        className={`absolute bottom-0 left-0 h-[2px] ${borderColors[type].replace("border-", "bg-")}`}
      />
    </motion.div>
  );
}
