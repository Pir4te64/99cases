import React from "react";
import usePersonalizadoStore from "@/components/PersonalizadosID/store/usePersonalizadoStore";

const StepsButtons: React.FC = () => {
  const product = usePersonalizadoStore((s) => s.product);
  const activeStep = usePersonalizadoStore((s) => s.activeStep);
  const setActiveStep = usePersonalizadoStore((s) => s.setActiveStep);

  const isPersonalizadoConImagen = product?.tipo === "PERSONALIZADO_CON_IMAGEN";

  const steps = [
    { key: 1, label: "Elegir Modelo", always: true },
    {
      key: 2,
      label: (
        <>
          Nombre, Número y<br className="hidden md:inline" /> Tipografía
        </>
      ),
      always: !isPersonalizadoConImagen,
    },
    { key: 3, label: "Colores", always: !isPersonalizadoConImagen },
  ];

  return (
    <div className="flex flex-row gap-1 overflow-x-auto md:grid md:grid-cols-3 md:gap-3 md:overflow-visible">
      {steps.map(({ key, label, always }) =>
        always ? (
          <button
            key={key}
            onClick={() => setActiveStep(key)}
            className={`flex w-full items-center justify-start gap-1 rounded-md border transition-colors p-1 md:gap-3 md:p-2 ${activeStep === key
                ? "border-red-600 bg-red-600 text-white"
                : "border-black bg-white text-black hover:bg-red-600 hover:text-white"
              }`}
          >
            <div
              className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full font-dharmaGothicM font-bold italic md:h-12 md:w-12 md:text-2xl ${activeStep === key ? "bg-white text-red-600" : "bg-black text-white"
                }`}
            >
              {key}
            </div>
            <span
              className={`text-md text-left font-dharmaGothicM font-bold uppercase italic tracking-wide sm:text-3xl md:text-4xl ${activeStep === key ? "text-white" : "text-black"
                }`}
            >
              {label}
            </span>
          </button>
        ) : null
      )}
    </div>
  );
};

export default StepsButtons;
