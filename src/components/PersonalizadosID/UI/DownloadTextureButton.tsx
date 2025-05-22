// src/components/PersonalizadosID/UI/DownloadTextureButton.tsx

import React from "react";
import html2canvas from "html2canvas";

interface Props {
    previewRef: React.RefObject<HTMLDivElement>;
}

export default function DownloadTextureButton({ previewRef }: Props) {
    const handleClick = async () => {
        if (!previewRef.current) return;

        const { width, height } = previewRef.current.getBoundingClientRect();
        const canvas = await html2canvas(previewRef.current, {
            useCORS: true,
            backgroundColor: null,
            width,
            height,
        });

        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "funda_personalizada.png";
        link.click();
    };

    return (
        <button
            onClick={handleClick}
            className="rounded bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
        >
            Descargar funda + texto
        </button>
    );
}
