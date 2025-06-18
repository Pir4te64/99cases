// src/components/PersonalizadosID/PreviewOverlay.tsx
import { useMemo, forwardRef } from "react";
import usePersonalizadoStore from "@/components/PersonalizadosID/store/usePersonalizadoStore";
import { customNameStyles, customNumberStyles } from "@/utils/textStyles";
import premiumCase from "@/assets/marcas/premiumcase.svg";
import CustomTextNumber from "@/components/PersonalizadosID/CustomTextNumber";

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
    selectedColors[0] || (product.title === "FUNDA 99% CASES - SUZUKI" ? "#CCCCCC" :
      product.title === "FUNDA 99% CASES - FASTHOUSE" ? "#4B4B4D" :
        "#ffffff"),
    selectedColors[1] || "transparent",
    selectedColors[2] || "transparent",
    selectedColors[3] || (product.title === "FUNDA 99% CASES - SUZUKI" ? "#CCCCCC" :
      product.title === "FUNDA 99% CASES - FASTHOUSE" ? "#4B4B4D" :
        "#ffffff"),
    selectedColors[4] || "transparent",
    selectedColors[5] || "transparent",
  ];

  const numTextShadow = useMemo(() => makeShadow(numBorder2, 5), [numBorder2]);
  const nameTextShadow = useMemo(() => makeShadow(nBorder2, 4), [nBorder2]);

  return (
    <div
      ref={ref}
      data-product-title={product.title}
      className="relative h-[340px] w-full overflow-visible md:mt-0 lg:h-[640px]"
      onDragStart={(e) => e.preventDefault()}
      onDrop={(e) => e.preventDefault()}
      onMouseDown={(e) => e.preventDefault()}
      style={{ userSelect: 'none', WebkitUserSelect: 'none', WebkitTouchCallout: 'none' }}
    >
      {/* Imagen base */}
      <img
        loading="lazy"
        src={product.imageSrc}
        alt={product.title || "Producto"}
        onContextMenu={(e) => e.preventDefault()}
        className="h-full w-full object-contain select-none pointer-events-none"
        draggable="false"
        onDragStart={(e) => e.preventDefault()}
        onDrop={(e) => e.preventDefault()}
        onMouseDown={(e) => e.preventDefault()}
        style={{ 
          userSelect: 'none', 
          WebkitUserSelect: 'none', 
          WebkitTouchCallout: 'none',
          KhtmlUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none'
        }}
      />

      {/* Banner "Premium Case" superpuesto solo en mobile */}
      <img
        src={premiumCase}
        alt="Premium Case"
        onContextMenu={(e) => e.preventDefault()}
        className="pointer-events-none absolute -bottom-0 -right-28 z-10 block w-20 select-none sm:hidden"
        draggable="false"
        onDragStart={(e) => e.preventDefault()}
        onDrop={(e) => e.preventDefault()}
        onMouseDown={(e) => e.preventDefault()}
      />
      {/* Banner "Premium Case" superpuesto solo en desktop */}
      <img
        src={premiumCase}
        alt="Premium Case"
        onContextMenu={(e) => e.preventDefault()}
        className="pointer-events-none absolute bottom-0 right-0 z-10 hidden w-28 select-none sm:block sm:scale-100"
        draggable="false"
        onDragStart={(e) => e.preventDefault()}
        onDrop={(e) => e.preventDefault()}
        onMouseDown={(e) => e.preventDefault()}
      />

      {isConCaracteres && (
        <CustomTextNumber
          product={product}
          userNumber={userNumber}
          userName={userName}
          numFill={numFill}
          numBorder={numBorder}
          numTextShadow={numTextShadow}
          nFill={nFill}
          nBorder={nBorder}
          nameTextShadow={nameTextShadow}
          selectedNumberStyle={selectedNumberStyle}
          selectedNameStyle={selectedNameStyle}
        />
      )}
    </div>
  );
});

export default CaseTextoNumero;
