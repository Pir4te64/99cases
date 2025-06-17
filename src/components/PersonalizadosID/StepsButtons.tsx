import React from "react";
import usePersonalizadoStore from "@/components/PersonalizadosID/store/usePersonalizadoStore";
import icon1 from '@/assets/1.svg';
import icon2 from '@/assets/2.svg';
import icon3 from '@/assets/3.svg';

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

  const stepIcons = {
    1: icon1,
    2: icon2,
    3: icon3,
  };

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
              className={`flex p-0.5 h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-black md:h-12 md:w-12 ${activeStep === key ? "bg-white" : "bg-black"}`}
            >
              <img src={stepIcons[key]} alt={`Paso ${key}`} className="h-5 w-5 md:h-10 md:w-10" />
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
