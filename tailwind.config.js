// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        favorit: ["ABCFavorit", "sans-serif"],
        favoritMono: ["ABCFavoritMono", "monospace"],
      },
    },
  },
  plugins: [],
};
