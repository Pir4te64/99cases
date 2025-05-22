// src/components/PersonalizadosID/StepsButtons.tsx
import React from "react";
import usePersonalizadoStore from "@/components/PersonalizadosID/store/usePersonalizadoStore";
import FileUploader from "@/components/PersonalizadosID/Actions/FileUploader";

const StepsButtons: React.FC = () => {
  const toggleShowMarca = usePersonalizadoStore((s) => s.toggleShowMarca);
  const toggleStep2 = usePersonalizadoStore((s) => s.toggleStep2);
  const toggleShowColors = usePersonalizadoStore((s) => s.toggleShowColors);
  const product = usePersonalizadoStore((s) => s.product);

  const isPersonalizadoConImagen = product?.tipo === "PERSONALIZADO_CON_IMAGEN";

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
    <div className="flex flex-row gap-1 overflow-x-auto md:grid md:grid-cols-3 md:gap-3 md:overflow-visible">
      {steps.map(({ key, label, onClick, always }) =>
        always ? (
          <button
            key={key}
            onClick={onClick}
            className="flex items-center justify-start gap-1 rounded-md border border-black bg-white p-1 text-black transition-colors hover:bg-red-600 hover:text-white md:gap-3 md:p-2"
          >
            <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-black font-dharmaGothicM font-bold italic text-white md:h-12 md:w-12 md:text-2xl">
              {key}
            </div>
            <span className="text-left font-dharmaGothicM text-md font-bold uppercase italic tracking-wide sm:text-3xl md:text-4xl">
              {label}
            </span>
          </button>
        ) : null
      )}
    </div>
  );
};

export default StepsButtons;
