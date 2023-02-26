/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login': "url('./src/assets/img/bg-login.png')",
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
