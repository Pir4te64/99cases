// src/store/pagoStore.ts
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
  telefono: string;
  localidad: string;
  provincia: string;
  mismaFacturacion: boolean;

  // 🔹 Nuevos campos:
  tipoDocumento: string;
  numeroDocumento: string;

  // Setters existentes
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
  setTelefono: (value: string) => void;
  setLocalidad: (value: string) => void;
  setProvincia: (value: string) => void;
  setMismaFacturacion: (value: boolean) => void;

  // 🔹 Nuevos setters:
  setTipoDocumento: (value: string) => void;
  setNumeroDocumento: (value: string) => void;
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
  telefono: "",
  localidad: "",
  provincia: "",
  mismaFacturacion: false,

  // 🔹 Inicialización de nuevos campos
  tipoDocumento: "",
  numeroDocumento: "",

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
  setTelefono: (value) => set({ telefono: value }),
  setLocalidad: (value) => set({ localidad: value }),
  setProvincia: (value) => set({ provincia: value }),
  setMismaFacturacion: (value) => set({ mismaFacturacion: value }),

  // 🔹 Implementación de los nuevos setters
  setTipoDocumento: (value) => set({ tipoDocumento: value }),
  setNumeroDocumento: (value) => set({ numeroDocumento: value }),
}));

export default usePaymentFormStore;
