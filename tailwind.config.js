/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-orange': '#f3670e',
        'brand-orange-dark': '#873807',
        'brand-yellow': '#ffd31e',
        'brand-yellow-light': '#ffe269',
        'brand-red': '#d3222a',
        'brand-red-accent': '#fe0000',
        'brand-blue': '#002af0',
        'brand-blue-light': '#4b6aff',
        'brand-green': '#1fc16b',
        'brand-dark': '#0a0a0c',
      },
      fontFamily: {
        sans: ['Jost', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        display: ['Jost', 'sans-serif'],
      },
      boxShadow: {
        'hard': '4px 4px 0px #000000',
        'hard-sm': '2px 2px 0px #000000',
        'hard-lg': '6px 6px 0px #000000',
        'hard-xl': '8px 8px 0px #000000',
        'hard-dark': '3px 3px 0px #000000',
      }
    },
  },
  plugins: [],
}
