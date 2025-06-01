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

const CaseTextoNumero = forwardRef<HTMLDivElement>((_, ref) => {
  const product = usePersonalizadoStore((s) => s.product);
  const userName = usePersonalizadoStore((s) => s.userName);
  const userNumber = usePersonalizadoStore((s) => s.userNumber);
  const selectedNameStyle = usePersonalizadoStore((s) => s.selectedNameStyle);
  const selectedNumberStyle = usePersonalizadoStore(
    (s) => s.selectedNumberStyle
  );
  const selectedColors = usePersonalizadoStore((s) => s.selectedColors);

  if (!product) return null;
  const isConCaracteres = product.description === "PERSONALIZADO_CON_CARACTERES_DOWN";

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
      className="relative mt-28 h-[350px] w-full overflow-hidden md:mt-0 lg:h-[600px]"
    >
      {/* Imagen base */}
      <img
        loading="lazy"
        src={product.imageSrc}
        alt={product.title || "Producto"}
        onContextMenu={(e) => e.preventDefault()}
        className="h-full w-full object-contain md:max-w-full md:scale-100"
      />

      {/* Banner "Premium Case" superpuesto */}
      {/*  <img
        src={premiumCase}
        alt="Premium Case"
        onContextMenu={(e) => e.preventDefault()}
        className="pointer-events-none absolute bottom-0 right-4 w-24 scale-75 sm:w-32 sm:scale-100"
      />
 */}
      {isConCaracteres && (
        <div id="texto-numeros-container" className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end pb-8">
          <div className="flex flex-col items-center leading-none">
            <span
              style={{
                color: numFill,
                WebkitTextStroke: `4px ${numBorder}`,
                textShadow: numTextShadow,
              }}
              className={`text-[4rem] sm:text-[5rem] md:text-[7rem] text-center ${selectedNumberStyle != null
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
              className={`text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] text-center -mt-1 ${selectedNameStyle != null
                ? `font-${customNameStyles[selectedNameStyle]}`
                : "font-cmxShift2"
                }`}
            >
              {userName || "TU NOMBRE"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
});

export default CaseTextoNumero;
