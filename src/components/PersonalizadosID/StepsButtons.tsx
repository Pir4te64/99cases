// src/components/PersonalizadosID/StepsButtons.tsx
import React from "react";
import usePersonalizadoStore from "@/components/PersonalizadosID/store/usePersonalizadoStore";
import FileUploader from "@/components/PersonalizadosID/Actions/FileUploader";

const StepsButtons: React.FC = () => {
  const toggleShowMarca = usePersonalizadoStore((s) => s.toggleShowMarca);
  const toggleStep2 = usePersonalizadoStore((s) => s.toggleStep2);
  const toggleShowColors = usePersonalizadoStore((s) => s.toggleShowColors);
  const product = usePersonalizadoStore((s) => s.product);
  const showMarca = usePersonalizadoStore((s) => s.showMarca);
  const step2Active = usePersonalizadoStore((s) => s.step2Active);
  const showColors = usePersonalizadoStore((s) => s.showColors);

  const isPersonalizadoConImagen =
    product?.tipo === "PERSONALIZADO_CON_IMAGEN";

  const steps = [
    {
      key: "1",
      label: "Elegir Modelo",
      onClick: toggleShowMarca,
      always: true,
      isActive: showMarca,
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
      isActive: step2Active,
    },
    {
      key: "3",
      label: "Colores",
      onClick: toggleShowColors,
      always: !isPersonalizadoConImagen,
      isActive: showColors,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {steps.map(({ key, label, onClick, always, isActive }) =>
        always ? (
          <button
            key={key}
            onClick={onClick}
            className={`flex items-center justify-start gap-2 rounded-md border border-black p-3 transition-colors md:gap-3 md:p-2
              ${isActive
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-white text-black hover:bg-red-600 hover:text-white"
              }`}
          >
            <div
              className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-favoritExpandedBook font-bold md:h-12 md:w-12 md:text-2xl
                ${isActive
                  ? "bg-white text-red-600"
                  : "bg-black text-white"
                }`}
            >
              {key}
            </div>
            <span className="text-left font-favoritExpandedBook text-sm font-bold uppercase">
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
