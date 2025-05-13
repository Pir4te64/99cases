// src/components/PersonalizadosID/UploadAndEditImage.tsx
import { useRef, DragEvent, ChangeEvent } from "react";
import usePersonalizadoStore from "@/components/PersonalizadosID/store/usePersonalizadoStore";

const UploadAndEditImage: React.FC = () => {
    const photo = usePersonalizadoStore((s) => s.photo);
    const setPhoto = usePersonalizadoStore((s) => s.setPhoto);
    const scale = usePersonalizadoStore((s) => s.scale);
    const setScale = usePersonalizadoStore((s) => s.setScale);
    const rotation = usePersonalizadoStore((s) => s.rotation);
    const setRotation = usePersonalizadoStore((s) => s.setRotation);
    const flipH = usePersonalizadoStore((s) => s.flipH);
    const toggleFlipH = usePersonalizadoStore((s) => s.toggleFlipH);
    const flipV = usePersonalizadoStore((s) => s.flipV);
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
        <div className="space-y-4">
            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
                className="rounded-lg border-2 border-dashed border-gray-400 p-6 text-center"
            >
                <p className="mb-4 text-gray-600">Arrastrar y soltar foto o</p>
                <button
                    onClick={() => inputRef.current?.click()}
                    className="rounded-md bg-gray-700 px-6 py-2 text-white"
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
                    {/* Control de tamaño */}
                    <div>
                        <label className="mb-1 block font-medium">Tamaño</label>
                        <div className="flex items-center space-x-4">
                            <input
                                type="range"
                                min="50"
                                max="200"
                                value={scale * 100}
                                onChange={(e) => setScale(Number(e.target.value) / 100)}
                                className="flex-1"
                            />
                            <span className="w-12 text-right">{Math.round(scale * 100)}%</span>
                        </div>
                    </div>

                    {/* Botones de rotación y flip */}
                    <div className="grid grid-cols-4 gap-2">
                        <button
                            onClick={() => setRotation(rotation - 90)}
                            className="rounded-md border border-gray-400 py-2"
                        >
                            IZQUIERDA
                        </button>
                        <button
                            onClick={() => setRotation(rotation + 90)}
                            className="rounded-md border border-gray-400 py-2"
                        >
                            DERECHA
                        </button>
                        <button
                            onClick={toggleFlipH}
                            className="rounded-md border border-gray-400 py-2"
                        >
                            HORIZONTAL
                        </button>
                        <button
                            onClick={toggleFlipV}
                            className="rounded-md border border-gray-400 py-2"
                        >
                            VERTICAL
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default UploadAndEditImage;
