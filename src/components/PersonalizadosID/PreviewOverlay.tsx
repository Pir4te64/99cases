// src/components/PreviewOverlay.tsx

import usePersonalizadoStore from "@/components/PersonalizadosID/usePersonalizadoStore";
import { customNameStyles, customNumberStyles } from "@/utils/textStyles";

const PreviewOverlay: React.FC = () => {
    const product = usePersonalizadoStore(s => s.product);
    const userName = usePersonalizadoStore(s => s.userName);
    const userNumber = usePersonalizadoStore(s => s.userNumber);
    const nameStyleIndex = usePersonalizadoStore(s => s.selectedNameStyle);
    const numberStyleIndex = usePersonalizadoStore(s => s.selectedNumberStyle);
    const sel = usePersonalizadoStore(s => s.selectedColors);

    // Colores (0–2 nombre, 3–5 número)
    const [nFill, nBorder, nBorder2, numFill, numBorder, numBorder2] = [
        sel[0] || "#000",
        sel[1] || "transparent",
        sel[2] || "transparent",
        sel[3] || "#000",
        sel[4] || "transparent",
        sel[5] || "transparent",
    ];

    // Genera text-shadow múltiple para borde exterior
    const makeShadow = (color: string, offset = 2) =>
        color === "transparent"
            ? "none"
            : [
                `${-offset}px ${-offset}px ${color}`,
                `${offset}px ${-offset}px ${color}`,
                `${-offset}px ${offset}px ${color}`,
                `${offset}px ${offset}px ${color}`,
            ].join(",");

    return (
        <div className="relative h-full w-full overflow-hidden bg-white">
            {/* Imagen como fondo (invisible para conservar espacio) */}
            <img
                loading="lazy"
                src={product?.imageSrc}
                alt={product?.title || "Producto"}
                onContextMenu={e => e.preventDefault()}
                className="h-full w-full object-contain"
            />

            {/* Nombre absolutamente centrado */}
            <span
                style={{
                    color: nFill,
                    WebkitTextStroke: `1px ${nBorder}`,
                    textShadow: makeShadow(nBorder2, 3),
                }}
                className={`
          absolute 
          top-1/2 left-1/2 
          transform -translate-x-1/2 -translate-y-1/2
          text-4xl sm:text-8xl 
          ${nameStyleIndex !== null
                        ? `font-${customNameStyles[nameStyleIndex]}`
                        : "font-cmxShift2"
                    }
          pointer-events-none
        `}
            >
                {userName || "TU NOMBRE"}
            </span>

            {/* Número centrado horizontal y cerca del fondo */}
            <span
                style={{
                    color: numFill,
                    WebkitTextStroke: `1px ${numBorder}`,
                    textShadow: makeShadow(numBorder2, 2),
                }}
                className={`
          absolute 
          bottom-10 left-1/2 transform -translate-x-1/2
          text-3xl sm:text-9xl
          ${numberStyleIndex !== null
                        ? `font-${customNumberStyles[numberStyleIndex]}`
                        : "font-cmxShift2"
                    }
          pointer-events-none
        `}
            >
                {userNumber || "15"}
            </span>
        </div>
    );
};

export default PreviewOverlay;
