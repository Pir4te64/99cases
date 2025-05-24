// src/components/PersonalizadosID/UI/ModelSelectionModal.tsx
import React from "react";
import { Dialog } from "@headlessui/react";
import { FiX } from "react-icons/fi";

interface Model {
    id: number;
    modelo: string;
    value: string;
    label: string;
    marca: string;
}

interface ModelSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    models: Model[];
    onModelSelect: (model: Model) => void;
}

const ModelSelectionModal: React.FC<ModelSelectionModalProps> = ({
    isOpen,
    onClose,
    models,
    onModelSelect,
}) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
            {/* Fondo semitransparente con blur */}
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />

            {/* Panel centrado */}
            <div className="relative max-h-[60vh] w-full max-w-sm overflow-auto rounded-2xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5">
                {/* Cabecera */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <Dialog.Title className="text-xl font-semibold text-gray-900">
                        Elige tu modelo
                    </Dialog.Title>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        aria-label="Cerrar modal"
                    >
                        <FiX className="h-4 w-4" />
                    </button>
                </div>

                {/* Lista de opciones */}
                <ul className="divide-y divide-gray-200">
                    {models.length > 0 ? (
                        models.map((model) => (
                            <li key={model.id}>
                                <button
                                    onClick={() => onModelSelect(model)}
                                    className="w-full px-6 py-3 text-left text-gray-700 transition-colors hover:bg-gray-50"
                                >
                                    {model.modelo}
                                </button>
                            </li>
                        ))
                    ) : (
                        <li>
                            <p className="p-6 text-center text-sm text-gray-500">
                                No hay modelos disponibles
                            </p>
                        </li>
                    )}
                </ul>
            </div>
        </Dialog>
    );
};

export default ModelSelectionModal;
