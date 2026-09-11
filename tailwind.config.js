/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      colors: {
        stone: {
          50: '#fafaf9',
          100: '#f5f3f0',
          200: '#e7e5e0',
          300: '#d6d3ce',
          400: '#a8a3a0',
          500: '#78736e',
          600: '#5a5652',
          700: '#464240',
          800: '#3d3834',
          900: '#2a2825',
        },
      },
    },
  },
  plugins: [],
}
