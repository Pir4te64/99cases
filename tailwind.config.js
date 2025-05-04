// tailwind.config.js

// Define aquí tus estilos de fuente personalizados para nombre y número
const customNameStyles = [
  "cmxSpeedOfcl",
  "cmxShift2",
  "cmxFast3",
  "cmxRacer",
  "cmxHead",
  "cmxNationalOfclV2",
  "cmxShotV2",
  "cmxBlowbrush",
  "cmxCowboy",
  "backyardShot",
  "backyardStencil",
  "cmxCleanOfcl",
];

module.exports = {
  // Archivos donde Tailwind buscará clases usadas
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],

  // Fuerza la generación de estas clases aunque no aparezcan literalmente en tu código
  safelist: [
    // Genera automáticamente font-<estilo> para cada estilo de tu array
    ...customNameStyles.map(s => `font-${s}`),
    // Si necesitas clases adicionales como italic o font-bold
    "italic",
    "font-bold"
  ],

  theme: {
    extend: {
      fontFamily: {
        // Fuentes base que ya tenías
        favorit: ["ABCFavorit", "sans-serif"],
        favoritExpanded: ["ABCFavoritExpanded", "sans-serif"],
        favoritExpandedBook: ["ABCFavoritExpanded-Book", "sans-serif"],
        favoritExtended: ["ABCFavoritExtended", "sans-serif"],
        favoritMono: ["ABCFavoritMono", "monospace"],
        dharmaGothicM: ["DharmaGothicM", "sans-serif"],

        // Agrega aquí cada fuente personalizada mediante el mismo array
        ...customNameStyles.reduce((acc, key) => {
          acc[key] = [key, "sans-serif"];
          return acc;
        }, {})
      },

      // Animación de scrolling de texto, si la usas en algún lado
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        scroll: 'scroll 20s linear infinite',
      }
    },
  },

  plugins: [
    require("@tailwindcss/line-clamp")
  ],
};
