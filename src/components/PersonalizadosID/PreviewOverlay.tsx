// src/components/PersonalizadosID/PreviewOverlay.tsx
import { useEffect } from "react";
import usePersonalizadoStore from "@/components/PersonalizadosID/store/usePersonalizadoStore";
import { customNameStyles, customNumberStyles } from "@/utils/textStyles";

const PreviewOverlay: React.FC = () => {
  // ─── Hooks ───
  const product = usePersonalizadoStore(s => s.product);
  const userName = usePersonalizadoStore(s => s.userName);
  const userNumber = usePersonalizadoStore(s => s.userNumber);
  const nameStyleIndex = usePersonalizadoStore(s => s.selectedNameStyle);
  const numberStyleIndex = usePersonalizadoStore(s => s.selectedNumberStyle);
  const sel = usePersonalizadoStore(s => s.selectedColors);

  if (!product) return null;
  const isConCaracteres = product.tipo === "PERSONALIZADO_CON_CARACTERES";

  // ─── Desempaquetar colores con valor por defecto blanco ───
  const [
    nFill, nBorder, nBorder2,
    numFill, numBorder, numBorder2
  ] = [
      sel[0] || "#ffffff",
      sel[1] || "transparent",
      sel[2] || "transparent",
      sel[3] || "#ffffff",
      sel[4] || "transparent",
      sel[5] || "transparent",
    ];
  const makeShadow = (color: string, off = 2) =>
    color === "transparent"
      ? "none"
      : [
        `${-off}px ${-off}px ${color}`,
        `${off}px ${-off}px ${color}`,
        `${-off}px ${off}px ${color}`,
        `${off}px ${off}px ${color}`,
      ].join(",");

  // ─── (Opcional) debug SVG ───
  useEffect(() => {
    if (!product.imageSrc?.toLowerCase().endsWith(".svg")) return;
    (async () => {
      try {
        const resp = await fetch(product.imageSrc, { mode: "cors" });
        await resp.text();
      } catch { }
    })();
  }, [product.imageSrc]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-white">
      {/* imagen de fondo */}
      <img
        loading="lazy"
        src={product.imageSrc}
        alt={product.title || "Producto"}
        onContextMenu={e => e.preventDefault()}
        onError={() =>
          console.error("❌ Error cargando imagen:", product.imageSrc)
        }
        className="h-[calc(100vh-200px)] w-full object-contain"
      />

      {/* overlay solo para PERSONALIZADO_CON_CARACTERES */}
      {isConCaracteres && (
        <div className="pointer-events-none absolute inset-0 mt-12 flex flex-col items-center justify-center">
          {/* número arriba */}
          <span
            style={{
              color: numFill,
              WebkitTextStroke: `1px ${numBorder}`,
              textShadow: makeShadow(numBorder2, 1),
            }}
            className={`text-[6rem]  text-center ${numberStyleIndex != null
              ? `font-${customNumberStyles[numberStyleIndex]}`
              : "font-cmxShift2"
              }`}
          >
            {userNumber || "15"}
          </span>
          {/* nombre abajo */}
          <span
            style={{
              color: nFill,
              WebkitTextStroke: `1px ${nBorder}`,
              textShadow: makeShadow(nBorder2, 2),
            }}
            className={`text-[2rem] stext-center ${nameStyleIndex != null
              ? `font-${customNameStyles[nameStyleIndex]}`
              : "font-cmxShift2"
              }`}
          >
            {userName || "TU NOMBRE"}
          </span>
        </div>
      )}
    </div>
  );
};

export default PreviewOverlay;
