import { create } from "zustand";

const usePersonalizadoStore = create((set) => ({
  product: null,
  quantity: 1,
  showMarca: false,
  step2Active: false,
  showColors: false, // <-- Nuevo estado para el botón 3

  // Acciones
  setProduct: (product: any) => set({ product }),
  increment: () => set((state: any) => ({ quantity: state.quantity + 1 })),
  decrement: () =>
    set((state: any) => ({
      quantity: state.quantity > 1 ? state.quantity - 1 : 1,
    })),
  toggleShowMarca: () =>
    set((state: any) => ({ showMarca: !state.showMarca })),
  setShowMarca: (flag: any) => set({ showMarca: flag }),
  toggleStep2: () =>
    set((state: any) => ({ step2Active: !state.step2Active })),

  // Acción para el botón 3
  toggleShowColors: () =>
    set((state: any) => ({ showColors: !state.showColors })),

  windowWidth: window.innerWidth,
  setWindowWidth: (width: any) => set({ windowWidth: width }),
}));

export default usePersonalizadoStore;
