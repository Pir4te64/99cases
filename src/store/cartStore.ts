// cartStore.ts
import { create } from "zustand";

export interface CartItem {
  id: string;
  title: string;
  imageSrc: string;
  price: number; // Asumimos que es un número para facilitar operaciones
  quantity: number;
}

interface CartState {
  isCartOpen: boolean;
  cartItems: CartItem[];
  selectedQuantity: number; // Cantidad que se muestra en el PurchaseActions
}

interface CartActions {
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (item: CartItem) => void;
  incrementSelectedQuantity: () => void;
  decrementSelectedQuantity: () => void;
  setSelectedQuantity: (quantity: number) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
}

const useCartStore = create<CartState & CartActions>((set, get) => ({
  isCartOpen: false,
  cartItems: [],
  selectedQuantity: 1,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  addToCart: (item) => {
    const existingItem = get().cartItems.find(
      (cartItem) => cartItem.id === item.id
    );
    if (existingItem) {
      // Si el producto ya está en el carrito, sumamos la cantidad
      set((state) => ({
        cartItems: state.cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        ),
      }));
    } else {
      set((state) => ({
        cartItems: [...state.cartItems, item],
      }));
    }
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
  updateItemQuantity: (id, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),
  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),
}));

export default useCartStore;
