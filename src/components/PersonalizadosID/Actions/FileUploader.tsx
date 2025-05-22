// src/components/PersonalizadosID/UploadAndEditImage.tsx

import React, { useRef, useState, ChangeEvent, DragEvent } from "react";
import usePersonalizadoStore from "@/components/PersonalizadosID/store/usePersonalizadoStore";
import { CropModal } from "@/components/PersonalizadosID/UI/CropModal";

export default function UploadAndEditImage() {
    // Leemos del store originalPhoto, photo, y sus setters
    const originalPhoto = usePersonalizadoStore(s => s.originalPhoto);
    const photo = usePersonalizadoStore(s => s.photo);
    const setOriginal = usePersonalizadoStore(s => s.setOriginalPhoto);
    const setPhoto = usePersonalizadoStore(s => s.setPhoto);

    const inputRef = useRef<HTMLInputElement>(null);
    const [isCropping, setIsCropping] = useState(false);

    // Función que abre el crop modal, guardando la original si aún no existe
    const openCrop = (url: string) => {
        if (!originalPhoto) {
            setOriginal(url);
        }
        setPhoto(url);
        setIsCropping(true);
    };

    // Selección por input
    const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            openCrop(url);
        }
    };

    // Drop
    const onDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            openCrop(url);
        }
    };

    // Botón para recortar de nuevo desde la imagen original
    const handleRecrop = () => {
        if (!originalPhoto) return;
        openCrop(originalPhoto);
    };

    return (
        <div className="space-y-6 text-center">
            {/* Zona de subida */}
            <div
                onDragOver={e => e.preventDefault()}
                onDrop={onDrop}
                className="rounded-lg border-2 border-dashed border-gray-400 p-6 text-center"
            >
                <p className="mb-4 text-gray-600">Arrastrar y soltar foto o</p>
                <button
                    onClick={() => inputRef.current?.click()}
                    className="rounded bg-gray-800 px-6 py-2 text-white transition hover:bg-gray-700"
                >
                    SUBIR ARCHIVO
                </button>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onSelectFile}
                />
            </div>

            {/* Modal de recorte */}
            {isCropping && photo && (
                <CropModal
                    imageSrc={photo}
                    onCancel={() => setIsCropping(false)}
                    onApply={(croppedUrl) => {
                        setPhoto(croppedUrl);
                        setIsCropping(false);
                    }}
                />
            )}

            {/* Botón para recortar de nuevo desde la imagen original */}
            {originalPhoto && !isCropping && (
                <button
                    onClick={handleRecrop}
                    className="mt-4 rounded bg-red-600 px-4 py-2 text-center text-white transition hover:bg-red-700"
                >
                    Recortar de nuevo
                </button>
            )}
        </div>
    );
}
