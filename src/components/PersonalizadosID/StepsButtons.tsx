// StepsButtons.jsx
import usePersonalizadoStore from "./usePersonalizadoStore";

const StepsButtons = () => {
  const toggleShowMarca = usePersonalizadoStore(
    (state: any) => state.toggleShowMarca
  );
  const toggleStep2 = usePersonalizadoStore((state: any) => state.toggleStep2);
  const toggleShowColors = usePersonalizadoStore(
    (state: any) => state.toggleShowColors
  );

  return (
    // Grid: 1 columna en móvil, 3 columnas en md+
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
      {/* Paso 1 */}
      <button
        onClick={toggleShowMarca}
        className="
          flex items-center 
          justify-start md:justify-center
          bg-white text-black border border-black rounded-md
          text-2xl md:text-4xl uppercase font-dharmaGothicM font-bold italic
          transition-colors p-4 hover:bg-red-600 hover:text-white
        "
      >
        <span
          className="
            inline-flex items-center justify-center
            w-10 h-10 md:w-12 md:h-12 mr-3
            bg-black text-white rounded-md font-dharmaGothicM font-bold italic
          "
        >
          1
        </span>
        {/* Usamos text-left en móviles, text-center en md+ */}
        <span className="leading-none text-left md:text-center font-dharmaGothicM font-bold italic tracking-wide">
          Elegir Modelo
        </span>
      </button>

      {/* Paso 2 */}
      <button
        onClick={toggleStep2}
        className="
          flex items-center 
          justify-start md:justify-center 
          bg-white text-black border border-black rounded-md
          text-2xl md:text-4xl uppercase font-dharmaGothicM font-bold italic
          transition-colors p-4 hover:bg-red-600 hover:text-white
        "
      >
        <span
          className="
            inline-flex items-center justify-center
            w-10 h-10 md:w-12 md:h-12 mr-3
            bg-black text-white rounded-md font-dharmaGothicM font-bold italic 
          "
        >
          2
        </span>
        <span className="leading-none text-left md:text-center font-dharmaGothicM italic font-bold tracking-wide">
          Nombre, Número y
          <br className="hidden md:block" />
          Tipografía
        </span>
      </button>

      {/* Paso 3 */}
      <button
        onClick={toggleShowColors}
        className="
          flex items-center 
          justify-start md:justify-center
          bg-white text-black border border-black rounded-md
          text-2xl md:text-4xl uppercase font-dharmaGothicM font-bold italic
          transition-colors p-4 hover:bg-red-600 hover:text-white
        "
      >
        <span
          className="
            inline-flex items-center justify-center
            w-10 h-10 md:w-12 md:h-12 mr-3
            bg-black text-white rounded-md font-dharmaGothicM font-bold italic
          "
        >
          3
        </span>
        <span className="leading-none text-left md:text-center font-dharmaGothicM italic font-bold tracking-wide">
          Colores
        </span>
      </button>
    </div>
  );
};

export default StepsButtons;
