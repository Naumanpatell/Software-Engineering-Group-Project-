/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#12130F',
        secondary: '#5B9279',
        accent: '#8FCB9B',
        light: '#EAE6E5',
        rose: '#E0AFA0',
      },
      fontFamily: {
        display: ['Righteous', 'cursive'],
        body: ['Quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [],
}