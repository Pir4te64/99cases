// src/components/PersonalizadosID/UI/CropModal.tsx

import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../utils/cropUtils";

interface CropModalProps {
    imageSrc: string;
    onCancel: () => void;
    onApply: (croppedUrl: string) => void;
}

export const CropModal: React.FC<CropModalProps> = ({
    imageSrc,
    onCancel,
    onApply,
}) => {
    // estado interno para la posición y zoom
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, _] = useState(0);
    // guardamos los píxeles calculados, pero NO disparamos el crop aquí
    const [croppedPixels, setCroppedPixels] = useState<{ width: number; height: number; x: number; y: number } | null>(null);

    // Sólo guardamos el área recortada cuando cambie
    const onCropComplete = useCallback(
        (_: any, croppedAreaPixels: any) => {
            setCroppedPixels(croppedAreaPixels);
        },
        []
    );

    // Al pulsar “Aplicar” ejecutamos el recorte real
    const handleApply = useCallback(async () => {
        if (!croppedPixels) return;
        const croppedUrl = await getCroppedImg(imageSrc, croppedPixels, rotation);
        onApply(croppedUrl);
    }, [croppedPixels, imageSrc, rotation, onApply]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-11/12 max-w-lg rounded-lg bg-white p-4 shadow-lg">
                <div className="relative h-64 bg-gray-200">
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    />

                </div>
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        onClick={onCancel}
                        className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleApply}
                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        Aplicar
                    </button>
                </div>
            </div>
        </div>
    );
};
