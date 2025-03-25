import { create } from "zustand";

const usePersonalizadoStore = create((set) => ({
  product: null,
  quantity: 1,
  showMarca: false,
  step2Active: false,
  showColors: false, // <-- Estado para el botón 3
  windowWidth: window.innerWidth,

  // Estados para nombre y número
  userName: "",
  selectedNameStyle: null,
  userNumber: "",
  selectedNumberStyle: null,

  // Acciones existentes
  setProduct: (product: any) => set({ product }),
  increment: () => set((state: any) => ({ quantity: state.quantity + 1 })),
  decrement: () =>
    set((state: any) => ({
      quantity: state.quantity > 1 ? state.quantity - 1 : 1,
    })),
  toggleShowMarca: () => set((state: any) => ({ showMarca: !state.showMarca })),
  setShowMarca: (flag: any) => set({ showMarca: flag }),
  toggleStep2: () => set((state: any) => ({ step2Active: !state.step2Active })),
  toggleShowColors: () =>
    set((state: any) => ({ showColors: !state.showColors })),
  setWindowWidth: (width: any) => set({ windowWidth: width }),

  // Nuevas acciones para nombre y número
  setUserName: (name: any) => set({ userName: name }),
  setSelectedNameStyle: (style: any) => set({ selectedNameStyle: style }),
  setUserNumber: (number: any) => set({ userNumber: number }),
  setSelectedNumberStyle: (style: any) => set({ selectedNumberStyle: style }),
}));

export default usePersonalizadoStore;
