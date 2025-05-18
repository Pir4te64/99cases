// src/components/PersonalizadosID/DownloadTextureButton.tsx
import React from "react";
import html2canvas from "html2canvas";

interface Props {
    offscreenRef: React.RefObject<HTMLDivElement>;
}

export default function DownloadTextureButton({ offscreenRef }: Props) {
    const handleClick = async () => {
        if (!offscreenRef.current) return;
        const { width, height } = offscreenRef.current.getBoundingClientRect();
        const canvas = await html2canvas(offscreenRef.current, {
            useCORS: true,
            backgroundColor: null,
            width,
            height,
        });
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "textura_texto.png";
        link.click();
    };

    return (
        <button
            onClick={handleClick}
            className="rounded bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
        >
            Descargar textura + texto
        </button>
    );
}
