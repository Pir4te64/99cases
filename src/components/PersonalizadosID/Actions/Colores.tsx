// src/components/Colores.jsx
import React from "react";
import usePersonalizadoStore from "@/components/PersonalizadosID/store/usePersonalizadoStore";
import { colorSections } from "@/components/PersonalizadosID/ColorSectionsProvider";
import transparentIcon from "@/assets/transparent.svg";

const colorNames: { [key: string]: string } = {
  "#FFFFFF": "Blanco",
  "#000000": "Negro",
  "#26ACE3": "Azul Cielo",
  "#54AF32": "Verde Manzana",
  "#FCDC03": "Amarillo",
  "#EC661B": "Naranja",
  "#E62F89": "Rosa",
  "#A1398D": "Morado",
  "#E20A1A": "Rojo",
  "#164395": "Azul Marino",
  "#F2E500": "Amarillo Limón",
  "#119338": "Verde Esmeralda",
  "#22274E": "Azul Oscuro",
  "#4FA69F": "Turquesa",
  "#4B4B4D": "Gris Oscuro",
  "#A3A2A2": "Gris Claro",
  "#FF4136": "Rojo Intenso",
  "transparent": "Transparente"
};

const Colores = () => {
  const selectedColors = usePersonalizadoStore((s) => s.selectedColors);
  const setSelectedColor = usePersonalizadoStore((s) => s.setSelectedColor);

  return (
    <div className="space-y-8">
      {colorSections.map((section, index) => (
        <div key={index}>
          <ColorSection
            index={index}
            label={section.label}
            colors={section.colors}
            selectedColor={selectedColors[index]}
            onSelectColor={setSelectedColor}
          />
          {index !== colorSections.length - 1 && (
            <hr className="my-8 border-gray-400 md:w-[80%]" />
          )}
        </div>
      ))}
    </div>
  );
};

interface ColorSectionProps {
  index: number;
  label: string;
  colors: string[];
  selectedColor: string;
  onSelectColor: (index: number, color: string) => void;
}

const ColorSection: React.FC<ColorSectionProps> = ({
  index,
  label,
  colors,
  selectedColor,
  onSelectColor,
}) => (
  <div>
    <h2 className="mb-2 font-favoritExpanded text-sm font-bold">{label}</h2>
    <div className="mx-2 flex flex-wrap gap-2">
      {colors.map((color, colorIndex) => {
        const isSelected = selectedColor === color;
        const colorName = colorNames[color] || color;

        // Si es transparent, renderizamos el icono SVG
        if (color === "transparent") {
          return (
            <div key={colorIndex} className="group relative">
              <button
                onClick={() => onSelectColor(index, color)}
                title={colorName}
                className={`w-8 h-8 p-0 rounded-full border-2 transition-transform
                  ${isSelected ? "border-black scale-110" : "border-gray-300 hover:scale-105"}`}
                aria-label={`Color ${colorName}`}
              >
                <img
                  src={transparentIcon}
                  alt={colorName}
                  className="h-full w-full rounded-full object-cover"
                />
              </button>
              <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                {colorName}
              </div>
            </div>
          );
        }

        // Caso normal: color de fondo sólido
        return (
          <div key={colorIndex} className="group relative">
            <button
              onClick={() => onSelectColor(index, color)}
              title={colorName}
              className={`w-8 h-8 rounded-full border-2 transition-transform
                ${isSelected ? "border-black scale-110" : "border-gray-300 hover:scale-105"}`}
              style={{ backgroundColor: color }}
              aria-label={`Color ${colorName}`}
            />
            <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              {colorName}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default Colores;
