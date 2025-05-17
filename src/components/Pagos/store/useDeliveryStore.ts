import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DeliveryResponse } from "@/components/Pagos/store/types";

interface DeliveryState {
  deliveryResponse: DeliveryResponse | null;
}

interface DeliveryActions {
  setDeliveryResponse: (response: DeliveryResponse | null) => void;
  clearDeliveryResponse: () => void;
}

const useDeliveryStore = create<
  DeliveryState & DeliveryActions,
  [["zustand/persist", { deliveryResponse: DeliveryResponse | null }]]
>(
  persist(
    (set) => ({
      deliveryResponse: null,
      setDeliveryResponse: (response) => set({ deliveryResponse: response }),
      clearDeliveryResponse: () => set({ deliveryResponse: null }),
    }),
    {
      name: "delivery-storage",
      partialize: (state) => ({
        deliveryResponse: state.deliveryResponse,
      }),
    }
  )
);

export default useDeliveryStore;
