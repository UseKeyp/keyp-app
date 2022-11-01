/** @type {import('tailwindcss').Config} */
// const { softUi } = require('@nifty-chess/tailwind-presets')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  // presets: [softUi],
  theme: {
    extend: {
      colors: {
        // 'page-ios-light': '#fff',
        // 'page-ios-dark': '#000',
        primary: {
          light: '#fff',
          DEFAULT: '#272522',
          dark: '#11100f',
        },
      },
    },
    colors: {

    },
  },
  plugins: [],
}
