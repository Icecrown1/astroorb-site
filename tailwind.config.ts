import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#0B0D14",
        surface: "#12151F",
        raised: "#191D2B",
        hairline: "rgba(233, 236, 248, 0.08)",
        ink: "#E9ECF8",
        muted: "#8D93A8",
        iris: "#8E7BFF",
        "iris-deep": "#5F4BD8",
        stellar: "#EFC26B",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        "out-strong": "cubic-bezier(0.23, 1, 0.32, 1)",
        "inout-strong": "cubic-bezier(0.77, 0, 0.175, 1)",
      },
      borderRadius: {
        shell: "2rem",
        core: "calc(2rem - 0.5rem)",
      },
    },
  },
  plugins: [],
};

export default config;
