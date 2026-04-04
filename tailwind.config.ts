import type { Config } from "tailwindcss";

const config: Config = {
  // 1. Tell Tailwind where to look for your classes
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  // 2. Enable class-based dark mode (crucial for our setup)
  darkMode: 'class', 
  
  // 3. Map our semantic names to the CSS variables
  theme: {
    extend: {
      colors: {
        main: "var(--bg-main)",
        card: "var(--bg-card)",
        textMain: "var(--text-main)",
        muted: "var(--text-muted)",
        borderMain: "var(--border-main)",
      },
    },
  },
  plugins: [],
};

export default config;
