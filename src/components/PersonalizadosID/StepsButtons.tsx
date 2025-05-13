// src/components/PersonalizadosID/StepsButtons.tsx
import usePersonalizadoStore from "@/components/PersonalizadosID/store/usePersonalizadoStore";

const StepsButtons = () => {
  const toggleShowMarca = usePersonalizadoStore((s) => s.toggleShowMarca);
  const toggleStep2 = usePersonalizadoStore((s) => s.toggleStep2);
  const toggleShowColors = usePersonalizadoStore((s) => s.toggleShowColors);
  const product = usePersonalizadoStore((s) => s.product);

  // ⬇️ Ocultamos los pasos 2 y 3 cuando es PERSONALIZADO_CON_IMAGEN
  const hideExtraSteps = product?.tipo === "PERSONALIZADO_CON_IMAGEN";

  /*  GRID
      – Siempre una columna en mobile.
      – En desktop: 1 col si ocultamos, 3 col si mostramos todo.
  */
  const gridColsDesktop = hideExtraSteps ? "md:grid-cols-1" : "md:grid-cols-3";

  return (
    <div className={`grid grid-cols-1 ${gridColsDesktop} gap-3 w-full`}>
      {/* Paso 1: Elegir modelo */}
      <button
        onClick={toggleShowMarca}
        className="
          flex items-center justify-start md:justify-center
          bg-white text-black border border-black rounded-md
          text-xl md:text-4xl uppercase font-dharmaGothicM font-bold italic
          transition-colors p-1 hover:bg-red-600 hover:text-white
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
        <span className="leading-none text-left md:text-center font-dharmaGothicM font-bold italic tracking-wide">
          Elegir Modelo
        </span>
      </button>

      {/* Paso 2: Nombre / Número / Tipografía */}
      {!hideExtraSteps && (
        <button
          onClick={toggleStep2}
          className="
            flex items-center justify-start md:justify-center
            bg-white text-black border border-black rounded-md
            text-2xl md:text-4xl uppercase font-dharmaGothicM font-bold italic
            transition-colors p-2 hover:bg-red-600 hover:text-white
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
      )}

      {/* Paso 3: Colores */}
      {!hideExtraSteps && (
        <button
          onClick={toggleShowColors}
          className="
            flex items-center justify-start md:justify-center
            bg-white text-black border border-black rounded-md
            text-2xl md:text-4xl uppercase font-dharmaGothicM font-bold italic
            transition-colors p-2 hover:bg-red-600 hover:text-white
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
      )}
    </div>
  );
};

export default StepsButtons;
