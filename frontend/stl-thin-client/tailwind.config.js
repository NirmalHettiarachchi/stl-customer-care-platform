/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366F1", // Indigo 500
          dark: "#4F46E5", // Indigo 600
        },
        secondary: {
          DEFAULT: "#1F2937", // Gray 800
        },
        accent: {
          DEFAULT: "#F59E0B", // Amber 400
        },
        textColor: {
          primary: "#FFFFFF", // White text
          secondary: "#D1D5DB", // Gray 300
        },
        error: {
          DEFAULT: "#EF4444", // Red 500
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
