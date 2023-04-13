/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
        'warning': '#eab308',
        'background': '#E0DDFF'
      },
      fontSize: {
        'title': '2rem',
        'subtitle': '1.5rem'
      }
    },
  },
  plugins: [],
}
