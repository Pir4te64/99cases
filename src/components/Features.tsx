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
    <div className="grid w-full grid-cols-1 gap-2">
      {features.map(({ icon, title }, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center space-y-1 text-center lg:space-y-2"
        >
          <div className="h-10 w-10 flex-shrink-0 p-1 sm:h-12 sm:w-12 lg:h-24 lg:w-24">
            <img
              src={icon}
              alt={title}
              className="max-h-full max-w-full"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
          <span className="max-w-[80px] break-words text-center font-favoritExpanded text-[7px] font-bold sm:max-w-none sm:text-sm lg:text-[8px]">
            {title}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Features;
