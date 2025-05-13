// phoneSelectionStore.ts
import { create } from "zustand";
import { PhoneModel } from "@/components/PersonalizadosID/Peticiones/MarcaCelularesGET"; // Asegúrate de que la ruta sea la correcta

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
    set({ selectedBrand: brand });
  },
  setSelectedModel: (model) => {
    set({ selectedModel: model });
  },
}));
