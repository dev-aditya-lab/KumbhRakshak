/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}','./Components/**/*.{js,jsx,ts,tsx}', './screens/**/*.{js,jsx,ts,tsx}','./Screens/**/*.{js,jsx,ts,tsx}','*/screens/**/*.{js,jsx,ts,tsx}','./*./app/**/*.{js,jsx,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        kumbhblue: '#204B72',
      },
    },
  },
  plugins: [],
};
