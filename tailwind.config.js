// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "font-cmxSpeedOfcl",
    "font-cmxShift2",
    "font-cmxFast3",
    "font-cmxRacer",
    "font-cmxHead",
    "font-cmxNationalOfclV2",
    "font-cmxShotV2",
    "font-cmxBlowbrush",
    "font-cmxCowboy",
    "font-backyardShot",
    "font-backyardStencil",
    "font-cmxCleanOfcl",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Fuentes ya existentes
        favorit: ["ABCFavorit", "sans-serif"],
        favoritExpanded: ["ABCFavoritExpanded", "sans-serif"],
        favoritExtended: ["ABCFavoritExtended", "sans-serif"],
        favoritMono: ["ABCFavoritMono", "monospace"],
        dharmaGothicM: ["DharmaGothicM", "sans-serif"],
        // Nuevas fuentes
        cmxSpeedOfcl: ["CmxSpeedOfcl", "sans-serif"],
        cmxShift2: ["CmxShift2", "sans-serif"],
        cmxFast3: ["CmxFast3", "sans-serif"],
        cmxRacer: ["CmxRacer", "sans-serif"],
        cmxHead: ["CmxHead", "sans-serif"],
        cmxNationalOfclV2: ["CmxNationalOfclV2", "sans-serif"],
        cmxShotV2: ["CmxShotV2", "sans-serif"],
        cmxBlowbrush: ["CmxBlowbrush", "cursive"],
        cmxCowboy: ["CmxCowboy", "sans-serif"],
        backyardShot: ["BackyardShot", "sans-serif"],
        backyardStencil: ["BackyardStencil", "sans-serif"],
        cmxCleanOfcl: ["CmxCleanOfcl", "sans-serif"],
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
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
