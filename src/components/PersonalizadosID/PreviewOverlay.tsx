// src/components/PreviewOverlay.tsx

import React from "react";
import usePersonalizadoStore from "./usePersonalizadoStore";
import { customNameStyles, customNumberStyles } from "../../utils/textStyles";

const PreviewOverlay = () => {
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
        <div className="relative w-full h-full bg-white overflow-hidden">
            {/* Imagen invisible pero que ocupa espacio */}
            <img
                src={product?.imageSrc}
                alt={product?.title || "Producto"}
                className="w-full h-full object-contain opacity-100"
            />

            {/* Texto centrado */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                {/* Nombre */}
                <span
                    style={{
                        color: nFill,
                        WebkitTextStroke: `1px ${nBorder}`,
                        textShadow: makeShadow(nBorder2, 3),
                    }}
                    className={`
            text-4xl sm:text-9xl 
            ${nameStyleIndex !== null
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
            mt-2 text-3xl sm:text-9xl
            ${numberStyleIndex !== null
                            ? `font-${customNumberStyles[numberStyleIndex]}`
                            : "font-cmxShift2"
                        }
          `}
                >
                    {userNumber || "15"}
                </span>
            </div>
        </div>
    );
};

export default PreviewOverlay;
