/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#0098AB',
        accent: '#D4B368',
        secondary: "#FFFFFF",
        darkBlue: '#261C38'
      }
    },
  },
  plugins: [],
}

