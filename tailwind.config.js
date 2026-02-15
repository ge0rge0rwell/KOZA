/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#8ECAE6', // Sky Blue (Light)
          500: '#219EBC', // Blue Green
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#023047', // Deep Space Blue
          950: '#082f49',
        },
        secondary: {
          400: '#FFB703', // Amber Flame
          500: '#FB8500', // Tiger Orange
        },
        accent: {
          sky: '#8ECAE6',
          ocean: '#219EBC',
          deep: '#023047',
          amber: '#FFB703',
          tiger: '#FB8500',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
