// src/components/PersonalizadosID/UploadAndEditImage.tsx
import { useRef, DragEvent, ChangeEvent } from "react";
import usePersonalizadoStore from "@/components/PersonalizadosID/store/usePersonalizadoStore";
import { FaUndo, FaRedo, FaArrowsAltH, FaArrowsAltV } from "react-icons/fa";

const UploadAndEditImage: React.FC = () => {
    const photo = usePersonalizadoStore((s) => s.photo);
    const setPhoto = usePersonalizadoStore((s) => s.setPhoto);
    const scale = usePersonalizadoStore((s) => s.scale);
    const setScale = usePersonalizadoStore((s) => s.setScale);
    const rotation = usePersonalizadoStore((s) => s.rotation);
    const setRotation = usePersonalizadoStore((s) => s.setRotation);
    const toggleFlipH = usePersonalizadoStore((s) => s.toggleFlipH);
    const toggleFlipV = usePersonalizadoStore((s) => s.toggleFlipV);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setPhoto(URL.createObjectURL(file));
    };

    const onDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) setPhoto(URL.createObjectURL(file));
    };

    return (
        <div className="space-y-6">
            {/* 1. Zona de subida */}
            <p className="text-md font-medium text-gray-700">
                ¿Cuál es tu fotografía?
            </p>
            <div
                onDragOver={(e) => e.preventDefault()}
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
                    onChange={handleFile}
                />
            </div>

            {photo && (
                <>
                    {/* 2. Control de tamaño */}
                    <div>
                        <label className="mb-1 block font-medium text-gray-700">
                            Tamaño
                        </label>
                        <div className="flex items-center space-x-4">
                            <input
                                type="range"
                                min="50"
                                max="200"
                                value={scale * 100}
                                onChange={(e) => setScale(Number(e.target.value) / 100)}
                                className="flex-1 accent-gray-400"
                            />
                            <span className="w-12 text-right font-medium">
                                {Math.round(scale * 100)}%
                            </span>
                        </div>
                    </div>

                    {/* 3. Controles (responsive: columna en sm, fila en md+) */}
                    <div className="mt-4">
                        <h3 className="mb-2 font-medium text-gray-700">Controles</h3>
                        <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                            <button
                                onClick={() => setRotation(rotation - 90)}
                                className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-400 px-3 py-2 transition hover:bg-gray-100 md:flex-1"
                            >
                                <FaUndo />
                                <span>Izquierda</span>
                            </button>
                            <button
                                onClick={() => setRotation(rotation + 90)}
                                className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-400 px-3 py-2 transition hover:bg-gray-100 md:flex-1"
                            >
                                <FaRedo />
                                <span>Derecha</span>
                            </button>
                            <button
                                onClick={toggleFlipH}
                                className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-400 px-3 py-2 transition hover:bg-gray-100 md:flex-1"
                            >
                                <FaArrowsAltH />
                                <span>Horizontal</span>
                            </button>
                            <button
                                onClick={toggleFlipV}
                                className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-400 px-3 py-2 transition hover:bg-gray-100 md:flex-1"
                            >
                                <FaArrowsAltV />
                                <span>Vertical</span>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default UploadAndEditImage;
