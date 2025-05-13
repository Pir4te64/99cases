// src/hooks/usePersonalizadoStore.ts
import { create } from "zustand";

export interface PersonalizadoState {
  // Datos del producto
  product: any | null;
  setProduct: (product: any) => void;

  // Cantidad seleccionada
  quantity: number;
  increment: () => void;
  decrement: () => void;

  // Flags para pasos y opciones
  showMarca: boolean;
  toggleShowMarca: () => void;
  setShowMarca: (flag: boolean) => void;

  step2Active: boolean;
  toggleStep2: () => void;

  showColors: boolean;
  toggleShowColors: () => void;

  // Ancho de la ventana para manejo de responsive
  windowWidth: number;
  setWindowWidth: (width: number) => void;

  // Texto y número personalizados
  userName: string;
  setUserName: (name: string) => void;

  selectedNameStyle: number | null;
  setSelectedNameStyle: (style: number) => void;

  userNumber: string;
  setUserNumber: (number: string) => void;

  selectedNumberStyle: number | null;
  setSelectedNumberStyle: (style: number) => void;

  // Colores de sección
  selectedColors: Record<number, string>;
  setSelectedColor: (sectionIndex: number, color: string) => void;

  // Foto subida y transformaciones
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
}

const usePersonalizadoStore = create<PersonalizadoState>((set) => ({
  // --- Valores iniciales ---
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

  // --- Acciones ---
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
      selectedColors: {
        ...s.selectedColors,
        [sectionIndex]: color,
      },
    })),

  setPhoto: (src) => set({ photo: src }),

  setScale: (v) => set({ scale: v }),
  setRotation: (deg) => set({ rotation: deg }),

  toggleFlipH: () => set((s) => ({ flipH: !s.flipH })),
  toggleFlipV: () => set((s) => ({ flipV: !s.flipV })),
}));

export default usePersonalizadoStore;
