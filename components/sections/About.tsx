"use client";

import Image from "next/image";

import { PERSONAL_INFO } from "@/lib/constants/portfolio";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { SectionDivider } from "@/components/ui/SectionDivider";

export function About() {
  return (
    <Section id="about" className="relative cyber-grid">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <p className="text-primary font-mono text-xs mb-2 uppercase tracking-wider">
            <span className="text-neon-cyan">&gt;</span> Section_01
          </p>
          <Heading as="h2" className="neon-text-purple">
            [About_Me]
          </Heading>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left column - Text */}
          <div className="space-y-4">
            <div className="border-l-2 border-primary/50 pl-4 space-y-4">
              <p className="font-mono text-sm text-foreground leading-relaxed">
                <span className="text-primary">&gt; </span>
                {PERSONAL_INFO.bio}
              </p>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                <span className="text-primary">&gt; </span>I specialize in
                building scalable web applications with modern technologies,
                focusing on clean architecture, performance optimization, and
                delivering production-grade solutions that solve real problems.
              </p>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                <span className="text-primary">&gt; </span>
                Located in{" "}
                <span className="text-neon-cyan">{PERSONAL_INFO.location}</span>
              </p>
            </div>
          </div>

          {/* Right column - Profile visual */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Profile container with corner brackets */}
              <div className="relative w-64 h-64 sharp border-2 border-primary/50 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center corner-brackets overflow-hidden group">
                <Image
                  src="/profile-pic.png"
                  alt={PERSONAL_INFO.name}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                />

                {/* Scanline overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-20 z-10"
                  style={{
                    backgroundImage: `repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 2px,
                      hsl(var(--primary) / 0.2) 2px,
                      hsl(var(--primary) / 0.2) 4px
                    )`,
                  }}
                />
              </div>

              {/* Corner accents */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-neon-cyan" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-neon-magenta" />
            </div>
          </div>
        </div>
      </div>

      <SectionDivider className="mt-12" />
    </Section>
  );
}
