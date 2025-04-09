// phoneSelectionStore.ts
import { create } from "zustand";
import { PhoneModel } from "./Peticiones/MarcaCelularesGET"; // Asegúrate de que la ruta sea la correcta

interface PhoneSelectionState {
  selectedBrand: string | null;
  selectedModel: PhoneModel | null;
  setSelectedBrand: (brand: string | null) => void;
  setSelectedModel: (model: PhoneModel | null) => void;
}

export const usePhoneSelectionStore = create<PhoneSelectionState>((set) => ({
  selectedBrand: null,
  selectedModel: null,
  setSelectedBrand: (brand) => {
    console.log("Marca seleccionada:", brand);
    set({ selectedBrand: brand });
  },
  setSelectedModel: (model) => {
    console.log("Modelo seleccionado:", model);
    set({ selectedModel: model });
  },
}));
