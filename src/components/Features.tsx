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
    <div className="grid w-full grid-cols-4 gap-0 space-x-4 lg:grid-cols-1 lg:gap-4">
      {features.map(({ icon, title }, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center space-y-0 text-center lg:space-y-6"
        >
          <div className="">
            <img
              src={icon}
              alt={title}
              className="h-16 w-16 object-cover p-0 sm:h-16 sm:w-16 lg:h-20 lg:w-20"
              style={{ imageRendering: 'crisp-edges' }}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
          <span className="lg:text-md max-w-[80px] break-words text-center font-favoritExpanded text-[8px] font-bold sm:max-w-none sm:text-sm">
            {title}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Features;
