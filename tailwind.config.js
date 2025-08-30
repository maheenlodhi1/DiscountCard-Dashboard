/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#249369",
        "primary-light": "#65CFA7",
      },
      boxShadow: {
        "custom-sm": "0px 0px 3px #90a4ae",
        "custom-md": "0px 0px 6px #90a4ae",
        "custom-lg": "0px 0px 9px #90a4ae",
        "custom-xl": "0px 0px 12px #90a4ae",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
