import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/components/PersonalizadosID/utils/cropUtils";
import { FaTimes, FaArrowsAltH, FaArrowsAltV } from "react-icons/fa";

interface CropModalProps {
    imageSrc: string;
    onCancel: () => void;
    onApply: (croppedUrl: string) => void;
}

const CropModal: React.FC<CropModalProps> = ({
    imageSrc,
    onCancel,
    onApply,
}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedPixels, setCroppedPixels] = useState<{ width: number; height: number; x: number; y: number; } | null>(null);

    const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
        setCroppedPixels(croppedAreaPixels);
    }, []);

    const handleApply = useCallback(async () => {
        if (!croppedPixels) return;
        const croppedUrl = await getCroppedImg(imageSrc, croppedPixels, rotation);
        onApply(croppedUrl);
    }, [croppedPixels, imageSrc, rotation, onApply]);

    // Close modal on Escape key press
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onCancel(); };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onCancel]);

    // Orientation helpers: set image to landscape (0°) or portrait (90°)
    const setLandscape = () => setRotation(0);
    const setPortrait = () => setRotation(90);

    return (
        <div role="dialog" aria-modal="true" aria-labelledby="crop-modal-title" className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-32">
            <div className="w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h2 id="crop-modal-title" className="text-xl font-semibold text-gray-800">Recortar imagen</h2>
                    <button onClick={onCancel} aria-label="Cerrar" className="text-gray-500 hover:text-gray-700"><FaTimes size={20} /></button>
                </div>

                {/* Crop area */}
                <div className="relative h-64 bg-gray-100">
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        rotation={rotation}
                        aspect={1}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        onRotationChange={setRotation}
                    />
                </div>

                {/* Controls */}
                <div className="space-y-4 px-6 py-5">
                    <div className="flex items-center space-x-3">
                        <label htmlFor="zoom-slider" className="text-sm font-medium">Zoom</label>
                        <input id="zoom-slider" type="range" min={1} max={3} step={0.1} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="flex-1" />
                    </div>
                    <div className="flex items-center space-x-3">
                        <label htmlFor="rotation-slider" className="text-sm font-medium">Rotación</label>
                        <input id="rotation-slider" type="range" min={0} max={360} step={1} value={rotation} onChange={(e) => setRotation(Number(e.target.value))} className="flex-1" />
                    </div>
                </div>

                {/* Orientation Actions */}
                <div className="flex justify-center space-x-4 border-t bg-gray-50 px-6 py-3">
                    <button onClick={setLandscape} className="flex items-center space-x-1 rounded-md bg-gray-200 px-3 py-2 text-gray-700 hover:bg-gray-300">
                        <FaArrowsAltH size={16} /><span className="text-sm">Horizontal</span>
                    </button>
                    <button onClick={setPortrait} className="flex items-center space-x-1 rounded-md bg-gray-200 px-3 py-2 text-gray-700 hover:bg-gray-300">
                        <FaArrowsAltV size={16} /><span className="text-sm">Vertical</span>
                    </button>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3 bg-gray-50 px-6 py-4">
                    <button onClick={onCancel} className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300">Cancelar</button>
                    <button onClick={handleApply} className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Aplicar</button>
                </div>
            </div>
        </div>
    );
};

export default CropModal;
