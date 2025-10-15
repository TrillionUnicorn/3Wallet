/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#059669',
          dark: '#047857',
          light: '#10b981',
        },
        secondary: {
          DEFAULT: '#0891b2',
          dark: '#0e7490',
          light: '#06b6d4',
        },
      },
    },
  },
  plugins: [],
};

