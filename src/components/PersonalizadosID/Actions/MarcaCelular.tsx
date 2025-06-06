// src/components/PersonalizadosID/UI/MarcaCelularGET.tsx
import React, { useState, useEffect, useMemo } from "react";
import {
  fetchPhoneModels,
  PhoneModel,
} from "@/components/PersonalizadosID/Peticiones/MarcaCelularesGET";
import { usePhoneSelectionStore } from "@/components/PersonalizadosID/store/phoneSelectionStore";
import ModelSelectionModal from "@/components/PersonalizadosID/Actions/ModelSelectionModal";
import usePersonalizadoStore from "@/components/PersonalizadosID/store/usePersonalizadoStore";   /* ⬅️ nuevo */

const MarcaCelularGET: React.FC = () => {
  const [phoneModels, setPhoneModels] = useState<PhoneModel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* store que ya usabas */
  const {
    selectedBrand,
    setSelectedBrand,
    selectedModel,
    setSelectedModel: setStoreSelectedModel,
  } = usePhoneSelectionStore();

  /* NUEVO: setters del store principal */
  const setPhoneBrand = usePersonalizadoStore((s) => s.setPhoneBrand);
  const setPhoneModel = usePersonalizadoStore((s) => s.setPhoneModel);

  /* --------------------------- */
  useEffect(() => {
    (async () => {
      try {
        const models = await fetchPhoneModels();
        setPhoneModels(models);
      } catch (error) {
        console.error("Error al obtener modelos:", error);
      }
    })();
  }, []);

  const uniqueBrands = useMemo(
    () => Array.from(new Set(phoneModels.map((m) => m.marca))).sort(),
    [phoneModels]
  );
  const filteredModels = useMemo(
    () =>
      selectedBrand
        ? phoneModels.filter((m) => m.marca === selectedBrand)
        : [],
    [phoneModels, selectedBrand]
  );

  /* --------- handlers ---------- */
  const handleBrandSelect = (brand: string) => {
    setSelectedBrand(brand);      // store de selección
    setPhoneBrand(brand);         // store global
    setStoreSelectedModel(null);
    setPhoneModel(null);          // reinicia modelo global
  };

  const handleModelSelect = (model: PhoneModel) => {
    setStoreSelectedModel(model); // store de selección
    setPhoneModel(model.modelo);  // store global
    setIsModalOpen(false);
  };

  /* --------- UI ---------- */
  return (
    <div className="my-6 w-full">
      {/* Selección de Marca */}
      <fieldset className="mb-4">
        <legend className="mb-2 font-favoritExpanded text-xs">
          ¿Cuál es la marca de tu celular?
        </legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {uniqueBrands.map((brand) => (
            <button
              key={brand}
              type="button"
              onClick={() => handleBrandSelect(brand)}
              className={`border rounded-md py-1 font-favoritExpanded sm:py-2 text-sm sm:text-base uppercase transition-colors ${selectedBrand === brand
                ? "bg-gray-400 border-gray-400 text-red-700 font-bold"
                : "bg-white border-black hover:bg-gray-400 hover:border-gray-400 hover:text-white"
                }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="my-4 h-px bg-gray-300" />

      {/* Botón que abre el modal */}
      <button
        type="button"
        disabled={!selectedBrand}
        onClick={() => setIsModalOpen(true)}
        className={`w-full p-2 border font-favoritExpanded text-sm rounded text-left bg-white disabled:opacity-50 ${selectedBrand ? "hover:bg-gray-100" : "cursor-not-allowed"
          }`}
      >
        {selectedModel
          ? selectedModel.modelo
          : selectedBrand
            ? "Selecciona tu modelo"
            : "Primero selecciona una marca"}
      </button>

      {/* Modal de selección de modelo */}
      <ModelSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        models={filteredModels}
        onModelSelect={handleModelSelect}
      />
    </div>
  );
};

export default MarcaCelularGET;
