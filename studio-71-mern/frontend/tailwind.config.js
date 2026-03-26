/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false, // <-- This tells Tailwind to stop resetting your vanilla CSS
  },
  theme: {
    extend: {},
  },
  plugins: [],
}