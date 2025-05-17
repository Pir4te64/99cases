// src/components/PersonalizadosID/StepsButtons.tsx
import React from "react";
import usePersonalizadoStore from "@/components/PersonalizadosID/store/usePersonalizadoStore";
import FileUploader from "@/components/PersonalizadosID/Actions/FileUploader";

const StepsButtons: React.FC = () => {
  const toggleShowMarca = usePersonalizadoStore((s) => s.toggleShowMarca);
  const toggleStep2 = usePersonalizadoStore((s) => s.toggleStep2);
  const toggleShowColors = usePersonalizadoStore((s) => s.toggleShowColors);
  const product = usePersonalizadoStore((s) => s.product);

  const isPersonalizadoConImagen =
    product?.tipo === "PERSONALIZADO_CON_IMAGEN";

  const steps = [
    {
      key: "1",
      label: "Elegir Modelo",
      onClick: toggleShowMarca,
      always: true,
    },
    {
      key: "2",
      label: (
        <>
          Nombre, Número y<br className="hidden md:inline" /> Tipografía
        </>
      ),
      onClick: toggleStep2,
      always: !isPersonalizadoConImagen,
    },
    {
      key: "3",
      label: "Colores",
      onClick: toggleShowColors,
      always: !isPersonalizadoConImagen,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {steps.map(({ key, label, onClick, always }) =>
        always ? (
          <button
            key={key}
            onClick={onClick}
            className="flex items-center justify-center gap-3 rounded-md border border-black bg-white p-4 text-black transition-colors hover:bg-red-600 hover:text-white md:justify-start"
          >
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-black font-favoritExpandedBook text-lg font-bold text-white md:h-12 md:w-12 md:text-xl"
            >
              {key}
            </div>
            <span className="text-center font-favoritExpandedBook text-xl font-bold uppercase md:text-left">
              {label}
            </span>
          </button>
        ) : null
      )}
      {isPersonalizadoConImagen && (
        <div className="md:col-span-3">
          <FileUploader />
        </div>
      )}
    </div>
  );
};

export default StepsButtons;
