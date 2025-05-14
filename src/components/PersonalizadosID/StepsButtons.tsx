// src/components/PersonalizadosID/StepsButtons.tsx
import usePersonalizadoStore from "@/components/PersonalizadosID/store/usePersonalizadoStore";
import FileUploader from "./Actions/FileUploader";

const StepsButtons: React.FC = () => {
  const toggleShowMarca = usePersonalizadoStore((s) => s.toggleShowMarca);
  const toggleStep2 = usePersonalizadoStore((s) => s.toggleStep2);
  const toggleShowColors = usePersonalizadoStore((s) => s.toggleShowColors);
  const product = usePersonalizadoStore((s) => s.product);

  const isPersonalizadoConImagen =
    product?.tipo === "PERSONALIZADO_CON_IMAGEN";

  return (
    <div className="flex w-full flex-col gap-3 md:flex-row">
      {/* Paso 1 */}
      <div className="flex flex-1 flex-col gap-2">
        <button
          onClick={toggleShowMarca}
          className="flex w-full items-center justify-start rounded-md border border-black bg-white p-1 font-dharmaGothicM text-xl font-bold uppercase italic text-black transition-colors hover:bg-red-600 hover:text-white md:justify-center md:text-4xl"
        >
          <span
            className="mr-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-black font-dharmaGothicM font-bold italic text-white md:h-12 md:w-12"
          >
            1
          </span>
          <span className="text-left font-dharmaGothicM font-bold italic leading-none tracking-wide md:text-center">
            Elegir Modelo
          </span>
        </button>
        {isPersonalizadoConImagen && <FileUploader />}
      </div>

      {/* Paso 2 */}
      {!isPersonalizadoConImagen && (
        <button
          onClick={toggleStep2}
          className="flex w-full items-center justify-start rounded-md border border-black bg-white p-2 font-dharmaGothicM text-2xl font-bold uppercase italic text-black transition-colors hover:bg-red-600 hover:text-white md:justify-center md:text-4xl"
        >
          <span
            className="mr-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-black font-dharmaGothicM font-bold italic text-white md:h-12 md:w-12"
          >
            2
          </span>
          <span className="text-left font-dharmaGothicM font-bold italic leading-none tracking-wide md:text-center">
            Nombre, Número y
            <br className="hidden md:block" />
            Tipografía
          </span>
        </button>
      )}

      {/* Paso 3 */}
      {!isPersonalizadoConImagen && (
        <button
          onClick={toggleShowColors}
          className="flex w-full items-center justify-start rounded-md border border-black bg-white p-2 font-dharmaGothicM text-2xl font-bold uppercase italic text-black transition-colors hover:bg-red-600 hover:text-white md:justify-center md:text-4xl"
        >
          <span
            className="mr-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-black font-dharmaGothicM font-bold italic text-white md:h-12 md:w-12"
          >
            3
          </span>
          <span className="text-left font-dharmaGothicM font-bold italic leading-none tracking-wide md:text-center">
            Colores
          </span>
        </button>
      )}
    </div>
  );
};

export default StepsButtons;
