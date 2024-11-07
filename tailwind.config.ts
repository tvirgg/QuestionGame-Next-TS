// tailwind.config.js
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Добавьте другие пользовательские цвета здесь, если необходимо
      },
      fontFamily: {
        mulish: ["var(--font-mulish)", "sans-serif"],
      },
      fontWeight: {
        light: "300",
        regular: "400",
        semibold: "600",
        bold: "700",
        // При необходимости добавьте другие веса
      },
    },
  },
  plugins: [],
};
export default config;
