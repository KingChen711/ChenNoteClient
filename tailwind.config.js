/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "yellow-primary":"#fedb39",
        "blue-primary":"#293462",
        "red-primary":"#d61c4e"
      },
      fontFamily:{
        "Poppins":`${'Poppins'}, sans-serif`
      }
    },
  },
  plugins: [],
}