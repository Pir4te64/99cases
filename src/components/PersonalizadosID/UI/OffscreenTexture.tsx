// src/components/PersonalizadosID/OffscreenTexture.tsx
import { useEffect, useState, forwardRef } from "react";
import imgFinal from "@/assets/predetermiandasCases/fondo.svg";
import usePersonalizadoStore from "@/components/PersonalizadosID/store/usePersonalizadoStore";
import { customNameStyles, customNumberStyles } from "@/utils/textStyles";

interface Size { width: number; height: number; }

const OffscreenTexture = forwardRef<HTMLDivElement>((_, ref) => {
    const [size, setSize] = useState<Size>({ width: 600, height: 600 });

    // 1) Al montar, parseamos el SVG para extraer viewBox o width/height
    useEffect(() => {
        fetch(imgFinal)
            .then(r => r.text())
            .then(svgText => {
                const doc = new DOMParser().parseFromString(svgText, "image/svg+xml");
                const svgEl = doc.querySelector("svg");
                if (!svgEl) return;
                let w = 0, h = 0;
                const vb = svgEl.getAttribute("viewBox");
                if (vb) {
                    const parts = vb.split(/\s+|,/).map(Number);
                    if (parts.length === 4) [, , w, h] = parts;
                } else {
                    w = parseFloat(svgEl.getAttribute("width") || "0");
                    h = parseFloat(svgEl.getAttribute("height") || "0");
                }
                if (w && h) setSize({ width: w, height: h });
            })
            .catch(console.error);
    }, []);

    // 2) Obtengo del store todos los valores para el overlay de texto
    const userName = usePersonalizadoStore(s => s.userName);
    const userNumber = usePersonalizadoStore(s => s.userNumber);
    const selectedColors = usePersonalizadoStore(s => s.selectedColors);
    const selectedNameStyle = usePersonalizadoStore(s => s.selectedNameStyle);
    const selectedNumberStyle = usePersonalizadoStore(s => s.selectedNumberStyle);

    const [
        nFill, nBorder, nBorder2,
        numFill, numBorder, numBorder2
    ] = [
            selectedColors[0] || "#ffffff",
            selectedColors[1] || "transparent",
            selectedColors[2] || "transparent",
            selectedColors[3] || "#ffffff",
            selectedColors[4] || "transparent",
            selectedColors[5] || "transparent",
        ];

    const makeShadow = (color: string, off = 2) =>
        color === "transparent"
            ? "none"
            : [
                `${-off}px ${-off}px ${color}`,
                `${off}px ${-off}px ${color}`,
                `${-off}px ${off}px ${color}`,
                `${off}px ${off}px ${color}`
            ].join(",");

    return (
        <div
            ref={ref}
            style={{
                position: "absolute",
                top: -9999,
                left: -9999,
                width: size.width,
                height: size.height,
                backgroundImage: `url(${imgFinal})`,
                backgroundRepeat: "repeat",
                backgroundSize: "auto",
            }}
        >
            <div className="relative flex h-full w-full flex-col items-center justify-center">
                {/* número arriba */}
                <span
                    style={{
                        color: numFill,
                        WebkitTextStroke: `2px ${numBorder}`,
                        textShadow: makeShadow(numBorder2, 2),
                    }}
                    className={`text-[10rem]  text-center ${selectedNumberStyle != null
                        ? `font-${customNumberStyles[selectedNumberStyle]}`
                        : "font-cmxShift2"
                        }`}
                >
                    {userNumber || "15"}
                </span>
                {/* nombre abajo */}
                <span
                    style={{
                        color: nFill,
                        WebkitTextStroke: `2px ${nBorder}`,
                        textShadow: makeShadow(nBorder2, 2),
                    }}
                    className={`text-[4rem]  text-center  ${selectedNameStyle != null
                        ? `font-${customNameStyles[selectedNameStyle]}`
                        : "font-cmxShift2"
                        }`}
                >
                    {userName || "TU NOMBRE"}
                </span>
            </div>
        </div>
    );
});

export default OffscreenTexture;
