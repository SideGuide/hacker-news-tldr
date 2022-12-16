const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Manrope', ...defaultTheme.fontFamily.sans],
      },
      
      colors:{
        'primary': '#8559F4',
        'secondary': '#F57C8A',
        'background': '#04062A',
        'hnorange': "#ff6600"
      },
      'border-pulse':{
        '0% ' : { 'border-color': 'rgba(255, 106,0, 1)' },
        '50%' : { 'border-color': 'rgba(255, 106,0, 0)' },
        '100%': { 'border-color': 'rgba(255, 106,0, 1)' }
      },
      boxShadow: {
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.01)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.01)',

      },
      cursor: {
        'fancy': 'url(cursor.cur), pointer',
      },
      keyframes: {
        
        'fade-in-down': {
            '0%': {
                opacity: '0',
                transform: 'translateY(-10px)'
            },
            '100%': {
                opacity: '1',
                transform: 'translateY(0)'
            },
        },
        'go-in-right': {
          '0%': {
              transform: 'translateX(-10px)'
          },
          '100%': {
              opacity: '1',
              transform: 'translateX(0)'
          },
      },
      'fade-out': {
        '0%': {
          opacity: '1',
      },
      '100%': {
          opacity: '0',
      },
    },
    'text': {
      '0%, 100%': {
         'background-size':'300% 300%',
          'background-position': 'left center'
      },
      '50%': {
         'background-size':'300% 300%',
          'background-position': 'right center'
      }
  },
    },
    animation: {
        'fade-out': 'fade-out 3s  ease-out',
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'go-in-right': 'go-in-right 0.5s ease-out',
        'text':'text 5s ease infinite',
    },

    boxShadow:{
      inverted: '-2px -49px 71px -26px rgba(0,0,0,0.5)',

    },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),

  ],
}
