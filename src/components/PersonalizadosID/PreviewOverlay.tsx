// src/components/PersonalizadosID/PreviewOverlay.tsx
import { useEffect } from "react";
import usePersonalizadoStore from "@/components/PersonalizadosID/store/usePersonalizadoStore";
import { customNameStyles, customNumberStyles } from "@/utils/textStyles";

const PreviewOverlay: React.FC = () => {
  const product = usePersonalizadoStore((s) => s.product);
  const userName = usePersonalizadoStore((s) => s.userName);
  const userNumber = usePersonalizadoStore((s) => s.userNumber);
  const nameStyleIndex = usePersonalizadoStore((s) => s.selectedNameStyle);
  const numberStyleIndex = usePersonalizadoStore((s) => s.selectedNumberStyle);
  const sel = usePersonalizadoStore((s) => s.selectedColors);

  // Ocultar texto para PERSONALIZADO_CON_IMAGEN
  const hideTextAndNumber = product?.tipo === "PERSONALIZADO_CON_IMAGEN" ;

  /* ───────────── Mostrar XML del SVG en consola ───────────── */
  useEffect(() => {
    if (!product?.imageSrc?.toLowerCase().endsWith(".svg")) return;

    (async () => {
      try {
        const resp = await fetch(product.imageSrc, { mode: "cors" });
        const svgText = await resp.text();
        console.log("🔎 Contenido SVG:\n", svgText);
      } catch (err) {
        console.error("Error al obtener SVG:", err);
      }
    })();
  }, [product?.imageSrc]);

  /* ───────────── Colores y helpers ───────────── */
  const [nFill, nBorder, nBorder2, numFill, numBorder, numBorder2] = [
    sel[0] || "#000",
    sel[1] || "transparent",
    sel[2] || "transparent",
    sel[3] || "#000",
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

  return (
    <div className="relative h-full w-full overflow-hidden bg-white">
      {/* Imagen de fondo */}
      <img
        loading="lazy"
        src={product?.imageSrc}
        alt={product?.title || "Producto"}
        onContextMenu={(e) => e.preventDefault()}
        //onLoad={() => console.log("✅ Imagen cargada:", product?.imageSrc)}
        onError={() => console.error("❌ Error cargando imagen:", product?.imageSrc)}
        className="h-full w-full object-contain"
      />

      {!hideTextAndNumber && (
        <>
          {/* Nombre */}
          <span
            style={{
              color: nFill,
              WebkitTextStroke: `1px ${nBorder}`,
              textShadow: makeShadow(nBorder2, 3),
            }}
            className={`
              absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform
              pointer-events-none text-4xl sm:text-8xl
              ${
                nameStyleIndex !== null
                  ? `font-${customNameStyles[nameStyleIndex]}`
                  : "font-cmxShift2"
              }
            `}
          >
            {userName || "TU NOMBRE"}
          </span>

          {/* Número */}
          <span
            style={{
              color: numFill,
              WebkitTextStroke: `1px ${numBorder}`,
              textShadow: makeShadow(numBorder2, 2),
            }}
            className={`
              absolute bottom-10 left-1/2 -translate-x-1/2 transform
              pointer-events-none text-3xl sm:text-9xl
              ${
                numberStyleIndex !== null
                  ? `font-${customNumberStyles[numberStyleIndex]}`
                  : "font-cmxShift2"
              }
            `}
          >
            {userNumber || "15"}
          </span>
        </>
      )}
    </div>
  );
};

export default PreviewOverlay;
