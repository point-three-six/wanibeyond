/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        red: colors.red,
      },
      backgroundColor: {
        red: colors.red
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
