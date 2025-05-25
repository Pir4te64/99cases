// src/components/PersonalizadosID/PreviewOverlay.tsx
import { useMemo, forwardRef } from "react";
import usePersonalizadoStore from "@/components/PersonalizadosID/store/usePersonalizadoStore";
import { customNameStyles, customNumberStyles } from "@/utils/textStyles";
import premiumCase from "@/assets/marcas/premiumcase.svg";

// Crea un "segundo trazo" usando text-shadow
const makeShadow = (color: string, radius = 3) => {
  if (color === "transparent") return "none";
  const shadows: string[] = [];
  for (let x = -radius; x <= radius; x++) {
    for (let y = -radius; y <= radius; y++) {
      if (x === 0 && y === 0) continue;
      shadows.push(`${x}px ${y}px 0 ${color}`);
    }
  }
  return shadows.join(", ");
};

const PreviewOverlay = forwardRef<HTMLDivElement>((_, ref) => {
  const product = usePersonalizadoStore((s) => s.product);
  const userName = usePersonalizadoStore((s) => s.userName);
  const userNumber = usePersonalizadoStore((s) => s.userNumber);
  const selectedNameStyle = usePersonalizadoStore((s) => s.selectedNameStyle);
  const selectedNumberStyle = usePersonalizadoStore(
    (s) => s.selectedNumberStyle
  );
  const selectedColors = usePersonalizadoStore((s) => s.selectedColors);

  if (!product) return null;
  const isConCaracteres = product.tipo === "PERSONALIZADO_CON_CARACTERES";

  // [rellenoNombre, borde1Nombre, borde2Nombre, rellenoNum, borde1Num, borde2Num]
  const [nFill, nBorder, nBorder2, numFill, numBorder, numBorder2] = [
    selectedColors[0] || "#ffffff",
    selectedColors[1] || "transparent",
    selectedColors[2] || "transparent",
    selectedColors[3] || "#ffffff",
    selectedColors[4] || "transparent",
    selectedColors[5] || "transparent",
  ];

  const numTextShadow = useMemo(() => makeShadow(numBorder2, 5), [numBorder2]);
  const nameTextShadow = useMemo(() => makeShadow(nBorder2, 4), [nBorder2]);

  return (
    <div
      ref={ref}
      className="relative mt-28 h-[40vh] w-full overflow-hidden md:mt-0 md:h-full"
    >
      {/* Imagen base */}
      <img
        loading="lazy"
        src={product.imageSrc}
        alt={product.title || "Producto"}
        onContextMenu={(e) => e.preventDefault()}
        className="h-full w-full object-contain md:max-w-full"
      />

      {/* Banner “Premium Case” superpuesto */}
      <img
        src={premiumCase}
        alt="Premium Case"
        onContextMenu={(e) => e.preventDefault()}
        className="pointer-events-none absolute bottom-0 right-4 w-24 sm:w-32"
      />

      {isConCaracteres && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span
            style={{
              color: numFill,
              WebkitTextStroke: `4px ${numBorder}`,
              textShadow: numTextShadow,
            }}
            className={`text-[3rem] sm:text-[4rem] md:text-[6rem] text-center ${selectedNumberStyle != null
              ? `font-${customNumberStyles[selectedNumberStyle]}`
              : "font-cmxShift2"
              }`}
          >
            {userNumber || "15"}
          </span>
          <span
            style={{
              color: nFill,
              WebkitTextStroke: `3px ${nBorder}`,
              textShadow: nameTextShadow,
            }}
            className={`text-[1.25rem] sm:text-[1.5rem] md:text-[2rem] text-center ${selectedNameStyle != null
              ? `font-${customNameStyles[selectedNameStyle]}`
              : "font-cmxShift2"
              }`}
          >
            {userName || "TU NOMBRE"}
          </span>
        </div>
      )}
    </div>
  );
});

export default PreviewOverlay;
