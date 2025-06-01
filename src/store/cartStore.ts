import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  title: string;
  imageSrc: string;
  price: number | string; // puede venir como string
  quantity: number;
  // Propiedades para datos del celular
  selectedBrand?: string;
  selectedModel?: number;
  imageFinalUrl?: string;
  tipo?: string;
  calcosBlob?: Blob;
}

interface CartState {
  isCartOpen: boolean;
  cartItems: CartItem[];
  selectedQuantity: number;
  subtotal: number;
  total: number;

  idOrdenCompra: number | null; // Estado para guardar el id de la orden de compra
}

interface CartActions {
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (item: CartItem) => void;
  incrementSelectedQuantity: () => void;
  decrementSelectedQuantity: () => void;
  setSelectedQuantity: (quantity: number) => void;
  updateItemQuantity: (id: string, quantity: number, calcosBlob?: Blob) => void;
  removeFromCart: (id: string) => void;
  setIdOrdenCompra: (id: number | null) => void; // Acción para actualizar idOrdenCompra
  clearCart: () => void;
}

// Función para convertir un precio (string con "$") a número
const parsePrice = (priceStr: string | number): number => {
  if (typeof priceStr === "string") {
    const numeric = priceStr.replace(/[^0-9.]/g, "");
    return parseFloat(numeric) || 0;
  }
  return priceStr;
};

// Función que calcula subtotal y total a partir del array de items
const calculateTotals = (items: CartItem[]) => {
  const subtotal = items.reduce(
    (acc, item) => acc + parsePrice(item.price) * item.quantity,
    0
  );
  return { subtotal, total: subtotal };
};

const useCartStore = create<
  CartState & CartActions,
  [
    [
      "zustand/persist",
      {
        cartItems: CartItem[];
        selectedQuantity: number;
        subtotal: number;
        total: number;
        idOrdenCompra: number | null;
      }
    ]
  ]
>(
  persist(
    (set, get) => ({
      // Estado inicial
      isCartOpen: false,
      cartItems: [],
      selectedQuantity: 1,
      subtotal: 0,
      total: 0,
      idOrdenCompra: null, // Inicializamos el idOrdenCompra como null
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      clearCart: () => set({
        cartItems: [],
        subtotal: 0,
        total: 0,
      }),
      addToCart: (item) => {
        const existingItem = get().cartItems.find(
          (cartItem) => cartItem.id === item.id
        );
        let updatedCartItems;
        if (existingItem) {
          updatedCartItems = get().cartItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          );
        } else {
          updatedCartItems = [...get().cartItems, item];
        }
        set({
          cartItems: updatedCartItems,
          ...calculateTotals(updatedCartItems),
        });
      },
      incrementSelectedQuantity: () =>
        set((state) => ({ selectedQuantity: state.selectedQuantity + 1 })),
      decrementSelectedQuantity: () =>
        set((state) => ({
          selectedQuantity:
            state.selectedQuantity > 1 ? state.selectedQuantity - 1 : 1,
        })),
      setSelectedQuantity: (quantity: number) =>
        set({ selectedQuantity: quantity }),
      updateItemQuantity: (id: string, quantity: number, calcosBlob?: Blob) => {
        const updatedCartItems = get().cartItems.map((item) =>
          item.id === id
            ? { ...item, quantity, ...(calcosBlob ? { calcosBlob } : {}) }
            : item
        );
        set({
          cartItems: updatedCartItems,
          ...calculateTotals(updatedCartItems),
        });
      },
      removeFromCart: (id) => {
        const updatedCartItems = get().cartItems.filter(
          (item) => item.id !== id
        );
        set({
          cartItems: updatedCartItems,
          ...calculateTotals(updatedCartItems),
        });
      },
      setIdOrdenCompra: (id: number | null) => set({ idOrdenCompra: id }), // Acción para actualizar idOrdenCompra
    }),
    {
      name: "cart-storage", // clave en localStorage
      partialize: (state) => ({
        cartItems: state.cartItems,
        selectedQuantity: state.selectedQuantity,
        subtotal: state.subtotal,
        total: state.total,
        idOrdenCompra: state.idOrdenCompra, // Persistimos idOrdenCompra también
      }),
    }
  )
);
export default useCartStore;
