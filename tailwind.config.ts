import plugin from "tailwindcss/plugin";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      fg: "#1A1A2E",
      bg: "#FEFCF6",
      accent: "#E07A5F",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem",
        "2xl": "5rem",
      },
    },
    fontFamily: {
      mono: ["JetBrains Mono", "monospace"],
      hand: ["var(--font-caveat)", "cursive"],
    },
    animation: {
      spin: "spin 5s linear infinite",
      blink: "blink 1s step-end infinite",
      pulse: "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      draw: "draw 500ms linear forwards",
      "draw-long": "draw 300ms ease-on-out forwards",
    },
    keyframes: {
      spin: {
        to: { transform: "rotate(360deg)" },
      },
      blink: {
        "0%, 100%": { opacity: "1" },
        "50%": { opacity: "0" },
      },
      pulse: {
        "0%, 100%": { opacity: "1" },
        "50%": { opacity: ".5" },
      },
      draw: {
        to: { strokeDashoffset: "0" },
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animation-delay": (value) => ({
            "animation-delay": value,
          }),
        },
        {
          values: theme("transitionDelay"),
        },
      );
    }),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          duration: (value) => ({
            "animation-duration": value,
          }),
        },
        {
          values: theme("transitionDuration"),
        },
      );
    }),
  ],
};
export default config;
