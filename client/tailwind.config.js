/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      light: '#F9F9F9',
      highlight: '#BC002D',
      dark: '#070C0D'
    },
    fontFamily: {
      main: ['poppins', 'sans-serif']
    },
    fontSize: {
      'head-1': [
        '3rem',
        {
          fontWeight: 'bold'
        }
      ],
      'head-2': [
        '2.25rem',
        {
          fontWeight: 'bold'
        }
      ],
      'head-3': [
        '1.5rem',
        {
          fontWeight: 'bold'
        }
      ],
      'head-4': [
        '1.25rem',
        {
          fontWeight: 'bold'
        }
      ]
    },
    maxWidth: {
      container: '86.5rem'
    }
  },
  plugins: []
}
