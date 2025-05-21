// src/components/Colores.jsx
import React from "react";
import usePersonalizadoStore from "@/components/PersonalizadosID/store/usePersonalizadoStore";
import { colorSections } from "@/components/PersonalizadosID/ColorSectionsProvider";
import transparentIcon from "@/assets/transparent.svg";

const Colores = () => {
  const selectedColors = usePersonalizadoStore((s) => s.selectedColors);
  const setSelectedColor = usePersonalizadoStore((s) => s.setSelectedColor);

  return (
    <div className="space-y-8">
      {colorSections.map((section, index) => (
        <ColorSection
          key={index}
          index={index}
          label={section.label}
          colors={section.colors}
          selectedColor={selectedColors[index]}
          onSelectColor={setSelectedColor}
        />
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
    <h2 className="mb-2 font-bold">{label}</h2>
    <div className="mx-2 flex flex-wrap gap-2">
      {colors.map((color, colorIndex) => {
        const isSelected = selectedColor === color;

        // Si es transparent, renderizamos el icono SVG
        if (color === "transparent") {
          return (
            <button
              key={colorIndex}
              onClick={() => onSelectColor(index, color)}
              title="Transparente"
              className={`w-8 h-8 p-0 rounded-full border-2 transition-transform
                ${isSelected ? "border-black scale-110" : "border-gray-300 hover:scale-105"}`}
              aria-label="Color transparente"
            >
              <img
                src={transparentIcon}
                alt="Transparente"
                className="h-full w-full rounded-full object-cover"
              />
            </button>
          );
        }

        // Caso normal: color de fondo sólido
        return (
          <button
            key={colorIndex}
            onClick={() => onSelectColor(index, color)}
            title={color}
            className={`w-8 h-8 rounded-full border-2 transition-transform
              ${isSelected ? "border-black scale-110" : "border-gray-300 hover:scale-105"}`}
            style={{ backgroundColor: color }}
            aria-label={`Color ${color}`}
          />
        );
      })}
    </div>
  </div>
);

export default Colores;
