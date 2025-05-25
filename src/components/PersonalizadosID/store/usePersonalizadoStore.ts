// src/hooks/usePersonalizadoStore.ts
import { create } from "zustand";

export interface PersonalizadoState {
  /* Paso activo */
  activeStep: number;
  setActiveStep: (step: number) => void;

  /* Datos del producto */
  product: any | null;
  setProduct: (product: any) => void;

  /* Cantidad seleccionada */
  quantity: number;
  increment: () => void;
  decrement: () => void;

  /* Flags UI */
  showMarca: boolean;
  toggleShowMarca: () => void;
  setShowMarca: (flag: boolean) => void;

  step2Active: boolean;
  toggleStep2: () => void;

  showColors: boolean;
  toggleShowColors: () => void;

  /* Tamaño de ventana */
  windowWidth: number;
  setWindowWidth: (width: number) => void;

  /* Texto/número personalizados */
  userName: string;
  setUserName: (name: string) => void;
  selectedNameStyle: number | null;
  setSelectedNameStyle: (style: number) => void;

  userNumber: string;
  setUserNumber: (number: string) => void;
  selectedNumberStyle: number | null;
  setSelectedNumberStyle: (style: number) => void;

  /* Colores */
  selectedColors: Record<number, string>;
  setSelectedColor: (sectionIndex: number, color: string) => void;

  /* Foto subida y transformaciones */
  photo: string | null;
  setPhoto: (src: string | null) => void;
  scale: number;
  setScale: (v: number) => void;
  rotation: number;
  setRotation: (deg: number) => void;
  flipH: boolean;
  toggleFlipH: () => void;
  flipV: boolean;
  toggleFlipV: () => void;
  originalPhoto: string | null;
  setOriginalPhoto: (src: string | null) => void;

  /* ⬇️ NUEVO: marca y modelo de teléfono */
  phoneBrand: string | null;
  setPhoneBrand: (b: string | null) => void;
  phoneModel: string | null;
  setPhoneModel: (m: string | null) => void;
}

const usePersonalizadoStore = create<PersonalizadoState>((set) => ({
  /* --- Valores iniciales --- */
  activeStep: 1,

  product: null,
  quantity: 1,

  showMarca: false,
  step2Active: false,
  showColors: false,

  windowWidth: window.innerWidth,

  userName: "",
  selectedNameStyle: null,
  userNumber: "",
  selectedNumberStyle: null,

  selectedColors: {},

  photo: null,
  scale: 1,
  rotation: 0,
  flipH: false,
  flipV: false,

  originalPhoto: null,

  phoneBrand: null,
  phoneModel: null,

  /* --- Acciones --- */
  setActiveStep: (step) => set({ activeStep: step }),

  setProduct: (product) => set({ product }),

  increment: () => set((s) => ({ quantity: s.quantity + 1 })),
  decrement: () =>
    set((s) => ({ quantity: s.quantity > 1 ? s.quantity - 1 : 1 })),

  toggleShowMarca: () => set((s) => ({ showMarca: !s.showMarca })),
  setShowMarca: (flag) => set({ showMarca: flag }),

  toggleStep2: () => set((s) => ({ step2Active: !s.step2Active })),

  toggleShowColors: () => set((s) => ({ showColors: !s.showColors })),

  setWindowWidth: (width) => set({ windowWidth: width }),

  setUserName: (name) => set({ userName: name }),
  setSelectedNameStyle: (style) => set({ selectedNameStyle: style }),
  setUserNumber: (number) => set({ userNumber: number }),
  setSelectedNumberStyle: (style) => set({ selectedNumberStyle: style }),

  setSelectedColor: (sectionIndex, color) =>
    set((s) => ({
      selectedColors: { ...s.selectedColors, [sectionIndex]: color },
    })),

  setPhoto: (src) => set({ photo: src }),

  setScale: (v) => set({ scale: v }),
  setRotation: (deg) => set({ rotation: deg }),

  toggleFlipH: () => set((s) => ({ flipH: !s.flipH })),
  toggleFlipV: () => set((s) => ({ flipV: !s.flipV })),

  setOriginalPhoto: (src) => set({ originalPhoto: src }),

  /* --- Nuevas acciones --- */
  setPhoneBrand: (b) => set({ phoneBrand: b }),
  setPhoneModel: (m) => set({ phoneModel: m }),
}));

export default usePersonalizadoStore;
