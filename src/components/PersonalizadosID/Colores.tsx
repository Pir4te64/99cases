// src/components/Colores.jsx
import usePersonalizadoStore from "@/components/PersonalizadosID/usePersonalizadoStore";
import { colorSections } from "@/components/PersonalizadosID/ColorSectionsProvider";

const Colores = () => {
  // Leemos y escribimos directamente en el store
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

// Componente sin cambios lógicos, solo recibe onSelectColor del store
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
    <h2 className="font-bold mb-2">{label}</h2>
    <div className="flex flex-wrap gap-2">
      {colors.map((color, colorIndex) => {
        const isSelected = selectedColor === color;
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
            className={`w-8 h-8 rounded-full border-2 transition-transform
              ${isSelected ? "border-black scale-110" : "border-gray-300 hover:scale-105"}`}
            style={style}
            aria-label={`Color ${color}`}
          />
        );
      })}
    </div>
  </div>
);

export default Colores;
