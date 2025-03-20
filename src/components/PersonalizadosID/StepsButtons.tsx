// StepsButtons.jsx
import usePersonalizadoStore from "./usePersonalizadoStore";

const StepsButtons = () => {
  const toggleShowMarca = usePersonalizadoStore(
    (state: any) => state.toggleShowMarca
  );
  const toggleStep2 = usePersonalizadoStore((state: any) => state.toggleStep2);
  const step2Active = usePersonalizadoStore((state: any) => state.step2Active);

  // Para el botón 3
  const toggleShowColors = usePersonalizadoStore(
    (state: any) => state.toggleShowColors
  );
  const showColors = usePersonalizadoStore((state: any) => state.showColors);

  return (
    <div className="flex flex-col md:flex-row items-start mb-4 gap-3 justify-between">
      {/* Paso 1 */}
      <button
        onClick={toggleShowMarca}
        className="flex md:w-full w-11/12 items-center md:justify-center justify-start bg-transparent text-black border border-black p-3 rounded-md tracking-wide md:text-5xl text-4xl font-normal uppercase font-dharmaGothic hover:bg-red-600 transition-colors hover:text-white"
      >
        <span className="mr-2 md:text-4xl text-xl md:w-12 md:h-12 w-10 h-10 flex items-center justify-center text-white bg-black rounded-md font-dharmaGothic">
          1
        </span>
        Elegir Modelo
      </button>

      {/* Paso 2 */}
      <button
        onClick={toggleStep2}
        className={`h-24 flex md:w-full w-11/12 items-start text-left bg-transparent text-black border border-black p-3 rounded-md tracking-wide text-4xl font-normal uppercase font-dharmaGothic transition-colors ${
          step2Active
            ? "hover:bg-green-500 hover:text-white"
            : "hover:bg-red-500 hover:text-white"
        }`}
      >
        <span className="mr-2 md:text-4xl text-xl md:w-20 md:h-12 w-10 h-10 flex items-center justify-center text-white bg-black rounded-md font-dharmaGothic">
          2
        </span>
        <span className=" md:text-[30px]">
          Nombre, Número y
          <br className="block md:hidden" /> Tipografía
        </span>
      </button>

      {/* Paso 3 */}
      <button
        onClick={toggleShowColors}
        className={`flex md:w-full w-11/12 items-center bg-transparent text-black border border-black p-3 rounded-md tracking-wide md:text-5xl text-4xl font-normal uppercase font-dharmaGothic transition-colors ${
          showColors
            ? "hover:bg-green-500 hover:text-white"
            : "hover:bg-red-500 hover:text-white"
        }`}
      >
        <span className="mr-2 md:text-4xl text-xl md:w-12 md:h-12 w-10 h-10 flex items-center justify-center text-white bg-black rounded-md font-dharmaGothic">
          3
        </span>
        Colores
      </button>
    </div>
  );
};

export default StepsButtons;
