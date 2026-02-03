/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="cyberpunk-dark"]'],
  theme: {
    extend: {
      colors: {
        // Cyberpunk color system
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        danger: "hsl(var(--danger) / <alpha-value>)",
        neon: {
          cyan: "hsl(var(--neon-cyan) / <alpha-value>)",
          magenta: "hsl(var(--neon-magenta) / <alpha-value>)",
          purple: "hsl(var(--neon-purple) / <alpha-value>)",
          blue: "hsl(var(--neon-blue) / <alpha-value>)",
          yellow: "hsl(var(--neon-yellow) / <alpha-value>)",
          orange: "hsl(var(--neon-orange) / <alpha-value>)",
          teal: "hsl(var(--neon-teal) / <alpha-value>)",
          lime: "hsl(var(--neon-lime) / <alpha-value>)",
          electric: "hsl(var(--neon-electric) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        border: "hsl(var(--border) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)", "JetBrains Mono", "Fira Code", "monospace"],
        display: ["var(--font-display)", "Orbitron", "system-ui", "sans-serif"],
        sans: ["var(--font-mono)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        none: "0",
        sharp: "0",
        "sharp-sm": "2px",
        sm: "2px",
        DEFAULT: "2px",
        md: "2px",
        lg: "2px",
      },
      boxShadow: {
        "neon-cyan":
          "0 0 10px hsl(var(--neon-cyan) / 0.5), 0 0 20px hsl(var(--neon-cyan) / 0.3)",
        "neon-magenta":
          "0 0 10px hsl(var(--neon-magenta) / 0.5), 0 0 20px hsl(var(--neon-magenta) / 0.3)",
        "neon-purple":
          "0 0 10px hsl(var(--neon-purple) / 0.5), 0 0 20px hsl(var(--neon-purple) / 0.3)",
        "neon-blue":
          "0 0 10px hsl(var(--neon-blue) / 0.5), 0 0 20px hsl(var(--neon-blue) / 0.3)",
        "glow-sm":
          "0 0 5px hsl(var(--primary) / 0.5), 0 0 10px hsl(var(--primary) / 0.3)",
        glow: "0 0 10px hsl(var(--primary) / 0.5), 0 0 20px hsl(var(--primary) / 0.3), 0 0 30px hsl(var(--primary) / 0.2)",
        "glow-lg":
          "0 0 15px hsl(var(--primary) / 0.6), 0 0 30px hsl(var(--primary) / 0.4), 0 0 45px hsl(var(--primary) / 0.2)",
        "neon-teal":
          "0 0 10px hsl(var(--neon-teal) / 0.5), 0 0 20px hsl(var(--neon-teal) / 0.3)",
        "neon-lime":
          "0 0 10px hsl(var(--neon-lime) / 0.5), 0 0 20px hsl(var(--neon-lime) / 0.3)",
        "neon-electric":
          "0 0 10px hsl(var(--neon-electric) / 0.5), 0 0 20px hsl(var(--neon-electric) / 0.3)",
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "cursor-blink": "cursor-blink 1s infinite",
        glitch: "glitch 0.3s infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        flash: "flash 2s ease-in-out forwards",
        "spin-slow": "spin-slow 8s linear infinite",
        "spin-reverse-slow": "spin-reverse-slow 8s linear infinite",
        "pulse-fast": "pulse-fast 1.5s ease-in-out infinite",
        "scan-line": "scan-line 3s linear infinite",
      },
      keyframes: {
        flash: {
          "0%": { opacity: "0" },
          "20%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "glow-pulse": {
          "0%, 100%": {
            boxShadow:
              "0 0 5px hsl(var(--primary) / 0.5), 0 0 10px hsl(var(--primary) / 0.3)",
          },
          "50%": {
            boxShadow:
              "0 0 10px hsl(var(--primary) / 0.8), 0 0 20px hsl(var(--primary) / 0.5), 0 0 30px hsl(var(--primary) / 0.3)",
          },
        },
        "cursor-blink": {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        glitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "spin-reverse-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        "pulse-fast": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
    },
  },
  plugins: [],
};
