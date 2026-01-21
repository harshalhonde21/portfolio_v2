"use client";

/**
 * X-Ray Annotation
 * Floating label component for sections
 */

import { motion, AnimatePresence } from "framer-motion";
import { useXRay } from "@/lib/xray/XRayContext";
import {
  getSectionMeta,
  COMPONENT_TYPE_LABELS,
  COMPONENT_TYPE_COLORS,
  DATA_SOURCE_LABELS,
} from "@/lib/xray";
import { useState } from "react";

interface XRayAnnotationProps {
  sectionId: string;
  children: React.ReactNode;
}

export function XRayAnnotation({ sectionId, children }: XRayAnnotationProps) {
  const { enabled, hoveredSection, setHoveredSection } = useXRay();
  const [showTooltip, setShowTooltip] = useState(false);
  const meta = getSectionMeta(sectionId);

  if (!meta) {
    return <>{children}</>;
  }

  const isHovered = hoveredSection === sectionId;
  const colorClass = COMPONENT_TYPE_COLORS[meta.componentType];

  const handleMouseEnter = () => {
    setHoveredSection(sectionId);
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setHoveredSection(null);
    setShowTooltip(false);
  };

  // Position classes based on config
  const positionClasses: Record<string, string> = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  };

  const labelPosition = positionClasses[meta.labelPosition || "top-left"];

  return (
    <div
      className="relative"
      onMouseEnter={enabled ? handleMouseEnter : undefined}
      onMouseLeave={enabled ? handleMouseLeave : undefined}
    >
      {children}

      <AnimatePresence>
        {enabled && (
          <>
            {/* Floating label */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{
                opacity: isHovered ? 1 : 0.8,
                y: 0,
                scale: isHovered ? 1.05 : 1,
              }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`absolute ${labelPosition} z-50 pointer-events-auto`}
            >
              <div
                className={`xray-label xray-label-${colorClass} ${isHovered ? "xray-label-active" : ""}`}
              >
                <span className="xray-label-icon">◈</span>
                <span className="xray-label-text">
                  {COMPONENT_TYPE_LABELS[meta.componentType]}
                </span>
              </div>
            </motion.div>

            {/* Tooltip on hover */}
            <AnimatePresence>
              {showTooltip && isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute ${labelPosition} mt-12 z-50 pointer-events-none`}
                >
                  <div className={`xray-tooltip xray-tooltip-${colorClass}`}>
                    <div className="xray-tooltip-header">[{meta.label}]</div>
                    <div className="xray-tooltip-row">
                      <span className="xray-tooltip-key">Rendering:</span>
                      <span className={`xray-tooltip-value ${colorClass}`}>
                        {COMPONENT_TYPE_LABELS[meta.componentType]}
                      </span>
                    </div>
                    <div className="xray-tooltip-row">
                      <span className="xray-tooltip-key">Data:</span>
                      <span className="xray-tooltip-value">
                        {DATA_SOURCE_LABELS[meta.dataSource]}
                      </span>
                    </div>
                    <div className="xray-tooltip-rationale">
                      <span className="xray-tooltip-icon">▸</span>
                      {meta.rationale}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
