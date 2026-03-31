import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        // Precise colors extracted from your screenshots
        background: "#0b1121", // Deep navy background
        panel: "#151e32",      // Slightly lighter panel background
        card: "#1e293b",       // Inner card/graph backgrounds
        border: {
          DEFAULT: "#2a364a",  // Subtle borders
          bright: "#3b4a6b",   // Active/hover borders
        },
        brand: {
          cyan: "#22d3ee",     // The primary Aegis text/icon color
          blue: "#3b82f6",     // Secondary accent
        },
        threat: {
          critical: "#fb7185", // The soft red from your "CRITICAL" badges
          warning: "#fbbf24",  // Yellow/Amber
          safe: "#34d399",     // Emerald/Green
        },
        text: {
          primary: "#f8fafc",  // Bright white
          secondary: "#94a3b8",// Muted gray/blue for descriptions
        }
      },
    },
  },
  plugins: [],
};

export default config;