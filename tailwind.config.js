/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        primary: '#d91b5c',
        'gray-1': '#334d6e',
        'gray-text': '#212529'
      }
    }
  },
  plugins: []
}
