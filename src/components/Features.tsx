// src/components/PersonalizadosID/UI/Features.tsx
import React from "react";
import terminacionBrillante from "@/assets/Caracteristicas/p1.svg";
import bordesProteccion from "@/assets/Caracteristicas/p2.svg";
import resistenciaGolpes from "@/assets/Caracteristicas/p3.svg";
import resistenciaRayaduras from "@/assets/Caracteristicas/p4.svg";

const features = [
  {
    icon: terminacionBrillante,
    title: "Terminación brillante",
  },
  {
    icon: bordesProteccion,
    title: "Bordes con protección para cámara y pantalla",
  },
  {
    icon: resistenciaGolpes,
    title: "Resistencia a golpes",
  },
  {
    icon: resistenciaRayaduras,
    title: "Resistencia al desgaste",
  },
];

const Features: React.FC = () => {
  return (
    <div className="grid w-full grid-cols-4 gap-4 sm:flex sm:flex-row sm:flex-wrap sm:justify-start lg:w-1/12 lg:flex-col lg:gap-6">
      {features.map(({ icon, title }, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center space-y-2 text-center sm:flex-row sm:space-x-2 sm:space-y-0 sm:text-left lg:flex-col lg:space-x-0 lg:space-y-2"
        >
          <div className="h-24 w-24 flex-shrink-0 p-2 sm:h-12 sm:w-12 lg:h-16 lg:w-16">
            <img
              src={icon}
              alt={title}
              className="max-h-full max-w-full"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
          <span className="text-center font-favoritExpanded text-[8px] font-bold sm:text-sm lg:text-base">
            {title}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Features;
