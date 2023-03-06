/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login': "url('./src/assets/img/bg-login.png')",
        'home': "url('./src/assets/img/person.png')",
      },
      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
        'dynamic-50': '50vw',
        '16': '4rem',
      },
      boxShadow: {
        'home': 'rgba(83,68,255, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset'
      },
      keyframes: {
        customSpinner: {
          '50%': { transform: 'rotatez(180deg)', 'border-radius': '55%'},
          '100%': {
          transform: 'rotatez(360deg)'
          }
        }
      },
      animation: {
        customSpinner: 'customSpinner 1s ease-in-out infinite',
      },
      colors: {
        'primary': '#5344FF',
        'error': '#ef4444',
        'success': '#10b981',
        'info': '#3b82f6',
        'warning': '#eab308'
      },
      fontSize: {
        'title': '2rem',
        'subtitle': '1.5rem'
      }
    },
  },
  plugins: [],
}
