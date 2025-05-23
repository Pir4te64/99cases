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
    <div className="flex w-full flex-row flex-wrap justify-start gap-4 lg:w-1/12 lg:flex-col lg:gap-6">
      {features.map(({ icon, title }, idx) => (
        <div
          key={idx}
          className="flex flex-row items-center space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2"
        >
          <div className="h-10 w-10 flex-shrink-0 p-2 sm:h-12 sm:w-12 lg:h-16 lg:w-16">
            <img
              src={icon}
              alt={title}
              className="max-h-full max-w-full"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
          <span className="text-left font-favoritExpanded text-sm font-bold lg:text-center lg:text-base">
            {title}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Features;
