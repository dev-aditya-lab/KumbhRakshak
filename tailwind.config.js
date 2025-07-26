/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}','./Components/**/*.{js,jsx,ts,tsx}', './screens/**/*.{js,jsx,ts,tsx}','./Screens/**/*.{js,jsx,ts,tsx}','*/screens/**/*.{js,jsx,ts,tsx}','./*./app/**/*.{js,jsx,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        kumbhblue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#204B72', // Primary
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#1e293b',
        },
        kumbhgold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        kumbhgreen: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(32, 75, 114, 0.1), 0 4px 6px -2px rgba(32, 75, 114, 0.05)',
        'medium': '0 4px 25px -3px rgba(32, 75, 114, 0.15), 0 8px 10px -6px rgba(32, 75, 114, 0.1)',
        'strong': '0 10px 40px -3px rgba(32, 75, 114, 0.2), 0 4px 14px -2px rgba(32, 75, 114, 0.1)',
      }
    },
  },
  plugins: [],
};
