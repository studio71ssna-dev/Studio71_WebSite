/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        's71-dark': '#111',
        's71-green': '#006D44',
        's71-bright': '#00ff9d',
        's71-text': '#FDF7DD',
        's71-muted': '#a0a0a0',
      }
    },
  },
  plugins: [],
}