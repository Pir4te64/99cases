// Colores.jsx
import React, { useState } from "react";
import { colorSections } from "./ColorSectionsProvider"; // Ajusta la ruta según tu estructura

const Colores = () => {
  const [selectedColors, setSelectedColors] = useState<Record<number, string>>(
    {}
  );

  const handleSelectColor = (sectionIndex: number, color: string) => {
    setSelectedColors((prev) => ({
      ...prev,
      [sectionIndex]: color,
    }));
  };

  return (
    <div className="space-y-8">
      {colorSections.map((section, index) => (
        <ColorSection
          key={index}
          index={index}
          label={section.label}
          colors={section.colors}
          selectedColor={selectedColors[index]}
          onSelectColor={handleSelectColor}
        />
      ))}
    </div>
  );
};

interface ColorSectionProps {
  index: number;
  label: string;
  colors: string[];
  selectedColor?: string;
  onSelectColor: (sectionIndex: number, color: string) => void;
}

const ColorSection: React.FC<ColorSectionProps> = ({
  index,
  label,
  colors,
  selectedColor,
  onSelectColor,
}) => {
  return (
    <div>
      <h2 className="font-bold mb-2">{label}</h2>
      <div className="flex flex-wrap gap-2">
        {colors.map((color, colorIndex) => {
          const isSelected = selectedColor === color;
          // Si el color es "transparent", usamos un patrón de rayas rojas.
          const style =
            color === "transparent"
              ? {
                  backgroundColor: "transparent",
                  backgroundImage:
                    "repeating-linear-gradient(45deg, red 0, red 2px, transparent 2px, transparent 4px)",
                }
              : { backgroundColor: color };

          return (
            <button
              key={colorIndex}
              onClick={() => onSelectColor(index, color)}
              title={color}
              className={`w-8 h-8 rounded-full border-2 transition-colors ${
                isSelected ? "border-black" : "border-black"
              }`}
              style={style}
              aria-label={`Color ${color}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Colores;
