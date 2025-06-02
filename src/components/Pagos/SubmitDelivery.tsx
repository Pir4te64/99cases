// src/utils/submitDelivery.ts
import axios from "axios";
import Swal from "sweetalert2";
import { API } from "@/utils/Api";
import { NavigateFunction } from "react-router-dom";

export type SubmitParams = {
  e: React.FormEvent;
  form: {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    codigoPostal: string;
    calle: string;
    numero: string;
    sinNumero: boolean;
    departamento: string;
    localidad: string;
    provincia: string;
    mismaFacturacion: boolean;
    tipoDocumento: string;
    numeroDocumento: string;
  };
  cart: {
    cartItems: any[];
    subtotal: number;
    total: number;
    idOrdenCompra: string | number;
  };
  actions: {
    setDeliveryResponse: (data: any) => void;
    navigate: NavigateFunction;
  };
};

export async function submitDelivery({
  e,
  form: {
    nombre,
    apellido,
    email,
    telefono,
    codigoPostal,
    calle,
    numero,
    sinNumero,
    departamento,
    localidad,
    provincia,
    mismaFacturacion,
    tipoDocumento,
    numeroDocumento,
  },
  cart: { cartItems, subtotal, total, idOrdenCompra },
  actions: { setDeliveryResponse, navigate },
}: SubmitParams) {
  e.preventDefault();

  // Validación básica
  if (
    !nombre.trim() ||
    !apellido.trim() ||
    !codigoPostal.trim() ||
    !calle.trim() ||
    (!sinNumero && !numero.trim()) ||
    !telefono.trim() ||
    !localidad.trim() ||
    !provincia.trim() ||
    !tipoDocumento.trim() ||
    !numeroDocumento.trim() ||
    !localidad.trim() ||
    !provincia.trim() ||
    !codigoPostal.trim()
  ) {
    await Swal.fire({
      icon: "warning",
      title: "Completa todos los campos obligatorios",
      text: "Por favor, completa todos los campos obligatorios antes de continuar.",
    });
    return;
  }

  const deliveryData = {
    destino: {
      calle,
      numero: sinNumero ? "" : numero,
      piso: departamento,
      codigoPostal,
      localidad,
      provincia,
    },
    destinatario: {
      nombre,
      apellido,
      email,
      tipoDocumento,
      numeroDocumento,
      numeroDeTelefono: telefono,
    },
  };
  console.log(deliveryData);

  const { isConfirmed } = await Swal.fire({
    title: "¿Desea continuar?",
    text: "Se va a procesar el delivery",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí, continuar",
    cancelButtonText: "Cancelar",
  });
  if (!isConfirmed) return;

  Swal.fire({
    title: "Procesando...",
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
  });

  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.put(
      `${API.delivery}?orderId=${idOrdenCompra}`,
      deliveryData,
      config
    );
    setDeliveryResponse(response.data);
    Swal.close();

    const paymentData = {
      cartItems,
      subtotal,
      total,
      idOrdenCompra,
      nombre,
      apellido,
      codigoPostal,
      calle,
      numero,
      sinNumero,
      departamento,
      telefono,
      localidad,
      provincia,
      mismaFacturacion,
      tipoDocumento,
      numeroDocumento,
    };
    navigate("/medios-pagos", { state: paymentData });
  } catch (error) {
    console.error("Error en API.delivery:", error);
    Swal.close();
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "Error en el servidor, intente nuevamente",
    });
  }
}
