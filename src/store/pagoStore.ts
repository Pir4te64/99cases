// pagoStore.ts
import { create } from "zustand";

interface PaymentFormState {
  email: string;
  aceptaNovedades: boolean;
  nombre: string;
  apellido: string;
  codigoPostal: string;
  calle: string;
  numero: string;
  sinNumero: boolean;
  departamento: string;
  barrio: string;
  ciudad: string;
  mismaFacturacion: boolean;
  // Setters
  setEmail: (email: string) => void;
  setAceptaNovedades: (value: boolean) => void;
  setNombre: (value: string) => void;
  setApellido: (value: string) => void;
  setCodigoPostal: (value: string) => void;
  setCalle: (value: string) => void;
  setNumero: (value: string) => void;
  setSinNumero: (value: boolean) => void;
  setDepartamento: (value: string) => void;
  setBarrio: (value: string) => void;
  setCiudad: (value: string) => void;
  setMismaFacturacion: (value: boolean) => void;
}

const usePaymentFormStore = create<PaymentFormState>((set) => ({
  email: "",
  aceptaNovedades: false,
  nombre: "",
  apellido: "",
  codigoPostal: "",
  calle: "",
  numero: "",
  sinNumero: false,
  departamento: "",
  barrio: "",
  ciudad: "",
  mismaFacturacion: false,
  setEmail: (email) => set({ email }),
  setAceptaNovedades: (value) => set({ aceptaNovedades: value }),
  setNombre: (value) => set({ nombre: value }),
  setApellido: (value) => set({ apellido: value }),
  setCodigoPostal: (value) => set({ codigoPostal: value }),
  setCalle: (value) => set({ calle: value }),
  setNumero: (value) => set({ numero: value }),
  setSinNumero: (value) => set({ sinNumero: value }),
  setDepartamento: (value) => set({ departamento: value }),
  setBarrio: (value) => set({ barrio: value }),
  setCiudad: (value) => set({ ciudad: value }),
  setMismaFacturacion: (value) => set({ mismaFacturacion: value }),
}));

export default usePaymentFormStore;
