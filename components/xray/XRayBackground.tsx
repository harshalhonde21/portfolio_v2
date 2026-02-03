"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useXRay } from "@/lib/xray/XRayContext";

export function XRayBackground() {
  const { enabled } = useXRay();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!enabled || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Animation vars
    let animationFrameId: number;
    let t = 0;

    // DNA Helix particles
    const particles: { x: number; y: number; offset: number; speed: number }[] =
      [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: (canvas.height / particleCount) * i,
        offset: i * 0.5,
        speed: 0.02,
      });
    }

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.02;

      // Draw faint grid
      ctx.strokeStyle = "rgba(0, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      const gridSize = 50;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw DNA-like structure
      ctx.lineWidth = 2;

      particles.forEach((p, i) => {
        const xBase = canvas.width * 0.1; // positioned left side
        const amplitude = 40;
        const y = p.y;

        // Strand 1
        const x1 = xBase + Math.sin(t + p.offset) * amplitude;
        // Strand 2
        const x2 = xBase + Math.sin(t + p.offset + Math.PI) * amplitude;

        // Connect strands
        if (i % 5 === 0) {
          ctx.strokeStyle = "rgba(0, 255, 255, 0.1)";
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.stroke();
        }

        // Draw nodes
        ctx.fillStyle = "rgba(0, 255, 255, 0.4)";
        ctx.beginPath();
        ctx.arc(x1, y, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(160, 85, 247, 0.4)"; // purple
        ctx.beginPath();
        ctx.arc(x2, y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Ambient floating particles (Neural dust)
      ctx.fillStyle = "rgba(0, 255, 100, 0.15)";
      for (let k = 0; k < 20; k++) {
        const x = (Math.sin(k * 123 + t * 0.5) * 0.5 + 0.5) * canvas.width;
        const y = (Math.cos(k * 321 + t * 0.3) * 0.5 + 0.5) * canvas.height;
        ctx.beginPath();
        ctx.arc(x, y, Math.abs(Math.sin(t + k)) * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 pointer-events-none z-[5]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Vignette & Color Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/0 via-neon-cyan/5 to-black/20 mix-blend-overlay"
        style={{ backdropFilter: "blur(1px)" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </motion.div>
  );
}
