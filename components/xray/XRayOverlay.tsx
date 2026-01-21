"use client";

/**
 * X-Ray Overlay
 * Main overlay component that renders dim effect and section outlines
 */

import { motion, AnimatePresence } from "framer-motion";
import { useXRay } from "@/lib/xray/XRayContext";
import { getSectionMeta, COMPONENT_TYPE_COLORS } from "@/lib/xray";
import { useEffect, useState, useCallback } from "react";

interface SectionRect {
  id: string;
  rect: DOMRect;
  color: string;
}

export function XRayOverlay() {
  const { enabled, hoveredSection, setHoveredSection } = useXRay();
  const [sectionRects, setSectionRects] = useState<SectionRect[]>([]);

  // Query DOM for section positions
  const updateRects = useCallback(() => {
    if (!enabled) return;

    const sections = document.querySelectorAll<HTMLElement>(
      "section[id], header, footer",
    );
    const rects: SectionRect[] = [];

    sections.forEach((section) => {
      const id = section.id || section.tagName.toLowerCase();
      const meta = getSectionMeta(id);
      if (!meta) return;

      const rect = section.getBoundingClientRect();
      const color = COMPONENT_TYPE_COLORS[meta.componentType];

      rects.push({ id, rect, color });
    });

    setSectionRects(rects);
  }, [enabled]);

  // Update rects on enable and scroll
  useEffect(() => {
    if (!enabled) {
      setSectionRects([]);
      return;
    }

    updateRects();

    const handleScroll = () => requestAnimationFrame(updateRects);
    const handleResize = () => requestAnimationFrame(updateRects);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [enabled, updateRects]);

  return (
    <AnimatePresence>
      {enabled && (
        <>
          {/* Dim overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 pointer-events-none z-40"
            aria-hidden="true"
          />

          {/* Section outlines */}
          <div className="fixed inset-0 pointer-events-none z-41">
            <svg
              className="absolute inset-0 w-full h-full"
              style={{ overflow: "visible" }}
            >
              {sectionRects.map(({ id, rect, color }) => {
                const meta = getSectionMeta(id);
                const isHovered = hoveredSection === id;

                return (
                  <g key={id}>
                    {/* Outline rect */}
                    <motion.rect
                      initial={{ opacity: 0, pathLength: 0 }}
                      animate={{
                        opacity: isHovered ? 1 : 0.6,
                        pathLength: 1,
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      x={rect.left + 2}
                      y={rect.top + 2}
                      width={rect.width - 4}
                      height={rect.height - 4}
                      fill="none"
                      className={`xray-outline xray-outline-${color}`}
                      strokeWidth={isHovered ? 2 : 1}
                      strokeDasharray={isHovered ? "none" : "8 4"}
                      rx={2}
                    />

                    {/* Corner accents */}
                    {isHovered && (
                      <>
                        <motion.path
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          d={`M ${rect.left + 2} ${rect.top + 20} L ${rect.left + 2} ${rect.top + 2} L ${rect.left + 20} ${rect.top + 2}`}
                          fill="none"
                          className={`xray-corner xray-corner-${color}`}
                          strokeWidth={3}
                        />
                        <motion.path
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          d={`M ${rect.right - 20} ${rect.top + 2} L ${rect.right - 2} ${rect.top + 2} L ${rect.right - 2} ${rect.top + 20}`}
                          fill="none"
                          className={`xray-corner xray-corner-${color}`}
                          strokeWidth={3}
                        />
                      </>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
