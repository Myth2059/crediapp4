/** @type {import('tailwindcss').Config} */
module.exports = {
   
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
      ],
  theme: {
    extend: {
        colors: {
            'emerald-green': '#24695c',
            'gray-bgg':'#24695c1a',
            'emerald-green-2':'#125649',
            'arena':'#ba895d',
            'arena-oscura':'#a26d3c'
          },
    },
  },
  plugins: [],
}
