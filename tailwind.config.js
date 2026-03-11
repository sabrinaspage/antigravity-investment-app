/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        rhGreen: '#00C805',
        rhRed: '#FF5000',
        rhDark: '#000000',
        rhGray: '#1E1E1E',
      }
    },
  },
  plugins: [],
}

