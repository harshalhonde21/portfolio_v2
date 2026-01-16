"use client";

import { useState } from "react";
import { PERSONAL_INFO } from "@/lib/constants/portfolio";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { GlitchText } from "@/components/effects/GlitchText";
import { CyberpunkGrid } from "@/components/effects/CyberpunkGrid";
import { Scanlines } from "@/components/effects/Scanlines";
import { TerminalButton } from "@/components/ui/TerminalButton";
import { CyberpunkTerminal } from "@/components/ui/CyberpunkTerminal";
import { motion, AnimatePresence } from "framer-motion";

export function Hero() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const handleScrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <CyberpunkGrid />
      <Scanlines />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center space-y-8"
      >
        {/* Terminal prefix */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-primary font-mono text-sm"
        >
          <span className="text-neon-cyan">&gt;</span> INITIALIZING...
        </motion.div>

        {/* Name with glitch effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Heading as="h1" className="mb-4">
            <GlitchText className="neon-text">{PERSONAL_INFO.name}</GlitchText>
          </Heading>

          <p className="text-xl md:text-2xl font-mono text-neon-purple mb-2 uppercase tracking-wider">
            [{PERSONAL_INFO.title}]
          </p>

          <div className="max-w-2xl mx-auto">
            <p className="text-sm md:text-base font-mono text-muted-foreground leading-relaxed">
              <span className="text-primary">&gt;</span> {PERSONAL_INFO.bio}
            </p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <TerminalButton onClick={() => setIsTerminalOpen(true)} />
        </motion.div>

        {/* System status indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="text-primary font-mono text-xs flex items-center justify-center gap-2"
        >
          <div className="w-2 h-2 bg-neon-cyan rounded-full animate-glow-pulse" />
          <span className="text-muted-foreground uppercase tracking-wider">
            System Online
          </span>
        </motion.div>
      </motion.div>

      {/* Terminal Overlay */}
      <AnimatePresence>
        {isTerminalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTerminalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            {/* Terminal */}
            <CyberpunkTerminal onClose={() => setIsTerminalOpen(false)} />
          </>
        )}
      </AnimatePresence>
    </Section>
  );
}
