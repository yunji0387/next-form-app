import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        white: "#ffffff",
        black: "#000000",
        "light-blue": "#E6F0FF",
        "dark-blue": "#0068FF",
        yellow: "#FCB527",
      },
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        ...defaultTheme.screens,
      },
      width: {
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
      },
    },
  },
  plugins: [],
};
export default config;
