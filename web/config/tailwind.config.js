/** @type {import('tailwindcss').Config} */
const { softUi } = require('@usekeyp/tailwind-presets')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@usekeyp/components-soft-ui/**/*.js",
  ],
  presets: [softUi],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        blue: '#47A7FF',
        rarity: {
          good: '#8a8886',
          great: '#7ea650',
          ultra: '#c1a35a',
          mythic: '#0096C6',
        },
        blueLink: '#147DDD',
        blueDark: '#125BF5',
        chessBlack: {
          100: '#312E2B',
          200: '#272522',
          300: '#21201D',
        },
        greenDark: '#6C9D41',
        greenLight: '#9DBA5B',
        grey: '#ABB6B9',
        greyLight: '#47433F', //Background color
        greyDark: '#4F4F4F',
        // red: '#B23330',
        errorYellow: '#FFBB0D',
        white: '#FFFFFF',
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
