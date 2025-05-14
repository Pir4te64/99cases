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

  const hideTextAndNumber = product?.tipo === "PERSONALIZADO_CON_IMAGEN";
  const isConCaracteres = product?.tipo === "PERSONALIZADO";

  /* ───── colores ───── */
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

  /* ───── log SVG en consola ───── */
  useEffect(() => {
    if (!product?.imageSrc?.toLowerCase().endsWith(".svg")) return;
    (async () => {
      try {
        const resp = await fetch(product.imageSrc, { mode: "cors" });
        const svgText = await resp.text();
        //console.log("🔎 Contenido SVG:\n", svgText);
      } catch (err) {
        console.error("Error al obtener SVG:", err);
      }
    })();
  }, [product?.imageSrc]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-white">
      {/* imagen de fondo */}
      <img
        loading="lazy"
        src={product?.imageSrc}
        alt={product?.title || "Producto"}
        onContextMenu={(e) => e.preventDefault()}
        onError={() => console.error("❌ Error cargando imagen:", product?.imageSrc)}
        className="h-full w-full object-contain"
      />

      {/* texto/número */}
      {!hideTextAndNumber && (
        isConCaracteres ? (
          // para PERSONALIZADO_CON_CARACTERES: texto + número más pequeños, centrados juntos
          <div className="pointer-events-none absolute inset-0 -left-3 mt-12 flex flex-col items-center justify-center">
            <span
              style={{
                color: nFill,
                WebkitTextStroke: `1px ${nBorder}`,
                textShadow: makeShadow(nBorder2, 2),
              }}
              className={`text-[8px]  ${nameStyleIndex !== null
                ? `font-${customNameStyles[nameStyleIndex]}`
                : "font-cmxShift2"
                }`}
            >
              {userName || "TU NOMBRE"}
            </span>
            <span
              style={{
                color: numFill,
                WebkitTextStroke: `1px ${numBorder}`,
                textShadow: makeShadow(numBorder2, 1),
              }}
              className={`mt-2 text-[15px] ${numberStyleIndex !== null
                ? `font-${customNumberStyles[numberStyleIndex]}`
                : "font-cmxShift2"
                }`}
            >
              {userNumber || "15"}
            </span>
          </div>
        ) : (
          // com портamiento original
          <>
            <span
              style={{
                color: nFill,
                WebkitTextStroke: `1px ${nBorder}`,
                textShadow: makeShadow(nBorder2, 3),
              }}
              className={`
                absolute top-1/2 left-1/2 transform 
                -translate-x-1/2 -translate-y-1/2
                pointer-events-none
                text-4xl sm:text-8xl
                ${nameStyleIndex !== null
                  ? `font-${customNameStyles[nameStyleIndex]}`
                  : "font-cmxShift2"
                }
              `}
            >
              {userName || "TU NOMBRE"}
            </span>
            <span
              style={{
                color: numFill,
                WebkitTextStroke: `1px ${numBorder}`,
                textShadow: makeShadow(numBorder2, 2),
              }}
              className={`
                absolute bottom-10 left-1/2 transform
                -translate-x-1/2
                pointer-events-none
                text-3xl sm:text-9xl
                ${numberStyleIndex !== null
                  ? `font-${customNumberStyles[numberStyleIndex]}`
                  : "font-cmxShift2"
                }
              `}
            >
              {userNumber || "15"}
            </span>
          </>
        )
      )}
    </div>
  );
};

export default PreviewOverlay;
