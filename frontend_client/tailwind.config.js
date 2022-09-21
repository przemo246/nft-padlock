/* eslint-disable */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        logo: "Rubik, sans-serif"
      },
      colors: {
        red: {
          600: "#F24333"
        },
        violet: {
          300: "#CBC7FE"
        }
      }
    }
  },
  plugins: []
};
