/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xl: { max: '1359px' },
        lg: { max: '1069px' },
        sm: { max: '530px' },
      },
    },
  },

  plugins: [],
};
