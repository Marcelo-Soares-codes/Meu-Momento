/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      error: '#EF665B',
      greenWeak: '#2BA84A',
      green: '#248232',
      greenDark: '#040F0F',
      gray: '#2D3A3A',
      white: '#FCFFFC',
      black: '#000',
      red: 'red',
    },
    fontFamily: {
      luckiestGuy: ['Luckiest Guy', 'cursive', 'Graphik', 'sans-serif'],
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
};
