"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { SectionDivider } from "@/components/ui/SectionDivider";
import {
  ChevronLeft,
  ChevronRight,
  Trophy,
  Award,
  Star,
  Zap,
} from "lucide-react";
import Image from "next/image";

// Placeholder data - replace with real images later
const ACHIEVEMENTS = [
  {
    id: 1,
    title: "Seminar 2025",
    description: "Keynote Speaker at Global Tech Summit",
    image: "/seminar.png",
    icon: Zap, // Fallback or decorative icon
    color: "text-neon-yellow",
    borderColor: "border-neon-yellow",
    shadowColor: "shadow-neon-yellow",
  },
  {
    id: 2,
    title: "Hackathon Winner 2025",
    description: "First place in Global AI Challenge",
    icon: Trophy,
    color: "text-neon-yellow",
    borderColor: "border-neon-yellow",
    shadowColor: "shadow-neon-yellow",
  },
  {
    id: 3,
    title: "Best UI/UX Design",
    description: "Awarded for Cyberpunk Portfolio Interface",
    icon: Award,
    color: "text-neon-magenta",
    borderColor: "border-neon-magenta",
    shadowColor: "shadow-neon-magenta",
  },
  {
    id: 4,
    title: "Open Source Contributor",
    description: "Top contributor to major React libraries",
    icon: Star,
    color: "text-neon-cyan",
    borderColor: "border-neon-cyan",
    shadowColor: "shadow-neon-cyan",
  },
];

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      y: direction > 0 ? -1000 : 1000, // Top-Right to Bottom-Left diagonal
      opacity: 0,
      scale: 0.5,
    }),
    center: {
      zIndex: 1,
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      y: direction < 0 ? -1000 : 1000, // Top-Right to Bottom-Left diagonal
      opacity: 0,
      scale: 0.5,
    }),
  };

  const swipe = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = ACHIEVEMENTS.length - 1;
      if (nextIndex >= ACHIEVEMENTS.length) nextIndex = 0;
      return nextIndex;
    });
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      swipe(1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentAchievement = ACHIEVEMENTS[currentIndex];
  const Icon = currentAchievement.icon;

  return (
    <Section
      id="gallery"
      className="relative bg-black/40 backdrop-blur-sm overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Section header */}
        <div className="mb-12">
          <p className="text-primary font-mono text-xs mb-2 uppercase tracking-wider">
            <span className="text-neon-cyan">&gt;</span> Section_05
          </p>
          <Heading as="h2" className="neon-text-yellow">
            [Achievements_Log]
          </Heading>
        </div>

        {/* Carousel Container */}
        <div className="relative h-[500px] flex items-center justify-center perspective-1000">
          {/* Navigation Buttons */}
          <button
            className="absolute left-0 z-20 p-2 bg-black/50 border border-primary/30 rounded-full hover:bg-primary/20 hover:border-primary transition-all group"
            onClick={() => swipe(-1)}
          >
            <ChevronLeft className="w-8 h-8 text-primary group-hover:text-neon-cyan transition-colors" />
          </button>

          <button
            className="absolute right-0 z-20 p-2 bg-black/50 border border-primary/30 rounded-full hover:bg-primary/20 hover:border-primary transition-all group"
            onClick={() => swipe(1)}
          >
            <ChevronRight className="w-8 h-8 text-primary group-hover:text-neon-cyan transition-colors" />
          </button>

          {/* Slides */}
          <div className="relative w-full max-w-3xl h-full flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  y: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className={`absolute w-full h-full flex flex-col items-center justify-center p-8 bg-black/80 border-2 ${currentAchievement.borderColor} rounded-lg shadow-lg backdrop-blur-md group overflow-hidden`}
                style={{
                  boxShadow: `0 0 30px ${currentAchievement.color.replace(
                    "text-",
                    "var(--"
                  )})`, // Enhanced glow for Bijlii theme
                }}
              >
                {/* Holo Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-30 pointer-events-none scanlines" />

                {/* Electric/Bijlii Background Effect */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div
                    className={`absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_${currentAchievement.color.replace(
                      "text-",
                      "var(--"
                    )})_0%,_transparent_70%)] animate-pulse`}
                  />
                </div>

                {/* Image or Icon */}
                <div className="relative mb-6 z-10">
                  {currentAchievement.image ? (
                    <div className="relative w-64 h-64 rounded-lg overflow-hidden border-2 border-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.5)] transition-all duration-500 grayscale group-hover:grayscale-0">
                      <Image
                        src={currentAchievement.image}
                        alt={currentAchievement.title}
                        fill
                        className="object-cover"
                      />
                      {/* Overlay for "Bijlii" effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  ) : (
                    <div
                      className={`p-6 rounded-full border-2 ${currentAchievement.borderColor} bg-black/50 relative overflow-hidden`}
                    >
                      <div
                        className={`absolute inset-0 bg-${currentAchievement.color.replace(
                          "text-",
                          ""
                        )}/20 animate-pulse`}
                      />
                      <Icon
                        className={`w-24 h-24 ${currentAchievement.color} relative z-10`}
                      />
                    </div>
                  )}
                </div>

                {/* Text Content */}
                <h3
                  className={`text-3xl font-bold font-display mb-4 ${currentAchievement.color} text-center uppercase tracking-widest relative z-10`}
                >
                  {currentAchievement.title}
                </h3>
                <p className="text-muted-foreground text-center font-mono max-w-lg text-lg relative z-10">
                  {currentAchievement.description}
                </p>

                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-primary/50" />
                <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-primary/50" />

                <div className="absolute bottom-4 left-4 font-mono text-xs text-primary/50">
                  ID: {String(currentAchievement.id).padStart(4, "0")}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {ACHIEVEMENTS.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-primary scale-125 shadow-glow"
                  : "bg-primary/30 hover:bg-primary/50"
              }`}
            />
          ))}
        </div>

        <SectionDivider className="mt-12" />
      </div>
    </Section>
  );
}
