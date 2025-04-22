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

    return (
        <div className="relative w-full h-full flex items-center justify-center bg-white">
            {/* 
        Para mantener el espacio de la imagen pero ocultarla visualmente,
        usamos `opacity-0` en lugar de comentar el <img>, así el layout se conserva.
      */}
            <img
                src={product?.imageSrc}
                alt={product?.title || "Producto"}
                className="w-full h-full object-contain opacity-0"
            />

            {/* Texto de Nombre */}
            <span
                className={`
          absolute top-4 left-4
          text-3xl sm:text-5xl
          ${nameStyleIndex !== null
                        ? `font-${customNameStyles[nameStyleIndex]}`
                        : "font-cmxShift2"
                    }
          pointer-events-none
        `}
            >
                {userName || "TU NOMBRE"}
            </span>

            {/* Texto de Número */}
            <span
                className={`
          absolute bottom-4 right-4
          text-2xl sm:text-4xl
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
