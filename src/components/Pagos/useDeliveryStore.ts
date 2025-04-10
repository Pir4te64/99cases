import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface DeliveryResponse {
  id: number;
  // Otros campos que tu API devuelve, por ejemplo:
  numeroOrden?: string;
  origen?: {
    codigoPostal: string;
    calle: string;
    numero: string;
    localidad: string;
    pais: string;
  };
  destino?: {
    calle: string;
    numero: string;
    piso: string;
    departamento: string;
    codigoPostal: string;
    localidad: string;
    provincia: string;
  };
  remitente?: {
    nombre: string;
    email: string;
    tipoDocumento: string;
    numeroDocumento: string;
  };
  destinatario?: {
    nombre: string;
    email?: string;
    telefono?: string;
  };
  remito?: any;
  bultos?: any[];
  fechaEnvio?: string;
  // Agrega otros campos según sea necesario.
}

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
