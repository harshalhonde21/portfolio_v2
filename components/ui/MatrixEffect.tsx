"use client";

import { useEffect, useRef } from "react";

export function MatrixEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Matrix characters (hex, binary, katakana-like)
    const chars = "0123456789ABCDEF<>/\\|[]{}+-*=&%$#@!";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Array to track y position of each column
    // Initialize with random negative values so they fall from top
    // BUT user asked for "going upside", so we need to track from bottom
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = canvas.height + Math.random() * canvas.height;
    }

    const draw = () => {
      // Semi-transparent black to create trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0f0"; // Green text
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];

        // Draw text
        ctx.fillText(text, i * fontSize, drops[i]);

        // Move drop UP (decrease y)
        drops[i] -= fontSize;

        // Reset to bottom if it goes off screen (with randomness)
        if (drops[i] < 0 && Math.random() > 0.975) {
          drops[i] = canvas.height;
        }
      }
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-0"
    />
  );
}
