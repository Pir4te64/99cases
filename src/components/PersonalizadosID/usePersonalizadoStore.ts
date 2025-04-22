// src/hooks/usePersonalizadoStore.ts
import { create } from "zustand";

export interface PersonalizadoState {
  // Datos del producto
  product: any | null;
  // Cantidad seleccionada
  quantity: number;
  // Flags para pasos y opciones
  showMarca: boolean;
  step2Active: boolean;
  showColors: boolean;
  // Ancho de la ventana para manejo de responsive
  windowWidth: number;
  // Texto y número personalizados
  userName: string;
  selectedNameStyle: number | null;
  userNumber: string;
  selectedNumberStyle: number | null;

  // --- Acciones para actualizar estado ---
  setProduct: (product: any) => void;
  increment: () => void;
  decrement: () => void;
  toggleShowMarca: () => void;
  setShowMarca: (flag: boolean) => void;
  toggleStep2: () => void;
  toggleShowColors: () => void;
  setWindowWidth: (width: number) => void;

  setUserName: (name: string) => void;
  setSelectedNameStyle: (style: number) => void;
  setUserNumber: (number: string) => void;
  setSelectedNumberStyle: (style: number) => void;
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

  // --- Definición de acciones ---
  setProduct: (product) => set({ product }),
  increment: () =>
    set((state) => ({ quantity: state.quantity + 1 })),
  decrement: () =>
    set((state) => ({
      quantity: state.quantity > 1 ? state.quantity - 1 : 1,
    })),
  toggleShowMarca: () =>
    set((state) => ({ showMarca: !state.showMarca })),
  setShowMarca: (flag) => set({ showMarca: flag }),
  toggleStep2: () =>
    set((state) => ({ step2Active: !state.step2Active })),
  toggleShowColors: () =>
    set((state) => ({ showColors: !state.showColors })),
  setWindowWidth: (width) => set({ windowWidth: width }),

  setUserName: (name) => set({ userName: name }),
  setSelectedNameStyle: (style) =>
    set({ selectedNameStyle: style }),
  setUserNumber: (number) => set({ userNumber: number }),
  setSelectedNumberStyle: (style) =>
    set({ selectedNumberStyle: style }),
}));

export default usePersonalizadoStore;
