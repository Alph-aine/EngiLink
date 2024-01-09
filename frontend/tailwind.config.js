/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#233E31",
        "bg-primary": "#242424",
        "secondary": "#70988F",
        "bg-secondary": "#D5D8D5",
      }
    },
  },
  plugins: [],
}

