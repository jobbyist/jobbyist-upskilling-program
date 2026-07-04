import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#0F1115",
          soft: "#15181E",
          raised: "#1B1F27",
          line: "rgba(255,255,255,0.08)",
          "line-strong": "rgba(255,255,255,0.14)",
        },
        electric: {
          DEFAULT: "#3B5BFF",
          soft: "#7C93FF",
          dim: "rgba(59,91,255,0.14)",
          glow: "rgba(59,91,255,0.55)",
        },
        ink: {
          DEFAULT: "#F5F6F8",
          mid: "#A7ACB8",
          faint: "#6B7080",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        heading: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.75rem",
        xl3: "2.25rem",
      },
      boxShadow: {
        glow: "0 0 60px -12px rgba(59,91,255,0.45)",
        "glow-lg": "0 0 120px -20px rgba(59,91,255,0.55)",
        card: "0 8px 40px -12px rgba(0,0,0,0.5)",
      },
      backgroundImage: {
        "mesh-1":
          "radial-gradient(ellipse 60% 50% at 20% 10%, rgba(59,91,255,0.25) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 85% 25%, rgba(124,147,255,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 50% 100%, rgba(59,91,255,0.12) 0%, transparent 70%)",
        "grid-fade":
          "linear-gradient(to bottom, transparent, #0F1115 85%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.85)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2.2s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
