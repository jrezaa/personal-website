/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts, vue}'],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: []
};
