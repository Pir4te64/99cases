// StepsButtons.tsx
import React from "react";
import usePersonalizadoStore from "@/components/PersonalizadosID/store/usePersonalizadoStore";

const StepsButtons: React.FC = () => {
  const product = usePersonalizadoStore((s) => s.product);
  const setActiveStep = usePersonalizadoStore((s) => s.setActiveStep);

  const isPersonalizadoConImagen = product?.tipo === "PERSONALIZADO_CON_IMAGEN";

  const steps = [
    {
      key: 1,
      label: "Elegir Modelo",
      always: true,
    },
    {
      key: 2,
      label: (
        <>
          Nombre, Número y<br className="hidden md:inline" /> Tipografía
        </>
      ),
      always: !isPersonalizadoConImagen,
    },
    {
      key: 3,
      label: "Colores",
      always: !isPersonalizadoConImagen,
    },
  ];

  return (
    <div className="flex flex-row gap-1 overflow-x-auto md:grid md:grid-cols-3 md:gap-3 md:overflow-visible">
      {steps.map(({ key, label, always }) =>
        always ? (
          <button
            key={key}
            onClick={() => setActiveStep(key)}
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
