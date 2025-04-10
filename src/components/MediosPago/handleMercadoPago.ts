// paymentUtils.ts
import Swal from "sweetalert2";
import axios from "axios";
import { API } from "../../utils/Api";

// La función recibe deliveryResponse y la función para actualizar el estado (setPaymentLinks)
export const handleMercadoPago = async (
  deliveryResponse: any,
  setPaymentLinks: (links: any) => void
) => {
  const { isConfirmed } = await Swal.fire({
    title: "Confirmar Pago",
    text: "¿Desea proceder con el pago con Mercado Pago?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí, proceder",
    cancelButtonText: "Cancelar",
  });

  if (isConfirmed) {
    // Mostrar modal de loading
    Swal.fire({
      title: "Procesando pago...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      if (deliveryResponse && deliveryResponse.numeroOrden) {
        const orderId = Number(deliveryResponse.numeroOrden);
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };

        const response = await axios.post(
          `${API.createPayment}?orderId=${orderId}`,
          {},
          config
        );
        console.log("Respuesta de API.createOrder:", response.data);
        // Guarda la respuesta en el estado local
        setPaymentLinks(response.data);
      } else {
        console.error("No se encontró deliveryResponse o numeroOrden");
      }
    } catch (error) {
      console.error("Error enviando orderId a API.createOrder:", error);
      Swal.close();
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error en el servidor, intente nuevamente",
      });
      return;
    }
    Swal.close();
  }
};
