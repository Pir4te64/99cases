// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        favorit: ["ABCFavorit", "sans-serif"],
        favoritMono: ["ABCFavoritMono", "monospace"],
        dharmaGothic: ["DharmaGothicM", "sans-serif"],
      },
    },
    keyframes: {
      scrollText: {
        "0%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(-50%)" },
      },
    },
    animation: {
      scrollText: "scrollText 15s linear infinite",
    },
  },
  plugins: [],
};
