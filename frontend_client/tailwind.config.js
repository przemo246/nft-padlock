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
          600: "#F55D3E"
        },
        violet: {
          300: "#CBC7FE"
        }
      },
      boxShadow: {
        "3xl":
          "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px"
      }
    }
  },
  plugins: []
};
