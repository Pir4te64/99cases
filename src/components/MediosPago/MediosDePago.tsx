// src/components/MediosPago/MediosDePago.tsx
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { SiMercadopago } from "react-icons/si";
import tarjeta from "@/assets/Pagos/tarjetas.png";
import useDeliveryStore from "@/components/Pagos/store/useDeliveryStore";
import DeliverySummary from "@/components/MediosPago/DeliverySummary";
import { API } from "@/utils/Api";

export default function MediosDePago() {
  const { state: paymentData } = useLocation() as { state: { total: number } };
  const { deliveryResponse } = useDeliveryStore();
  const total = paymentData?.total ?? 0;

  const [loading, setLoading] = useState(false);

  const iniciarPago = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Confirmar Pago",
      text: `Vas a pagar $${total.toLocaleString("es-AR", {
        minimumFractionDigits: 2,
      })}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, pagar",
      cancelButtonText: "Cancelar",
    });
    if (!isConfirmed) return;

    try {
      setLoading(true);
      Swal.fire({
        title: "Generando link de pago…",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const token = localStorage.getItem("token");
      if (!token) throw new Error("Sesión expirada, vuelve a iniciar sesión.");

      // POST → /api/payments/create?orderId=...
      const { data } = await axios.post(
        `${API.createPayment}?orderId=${deliveryResponse.numeroOrden}`,
        {}, // sin body; tu backend ya sabe el monto
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Swal.close();

      if (!data.paymentLink) {
        throw new Error(data.details || "No se obtuvo el link de pago.");
      }

      // Redirigimos en nueva pestaña:
      window.open(data.paymentLink, "_blank");

      await Swal.fire({
        icon: "success",
        title: "Redirigido a Mercado Pago",
        text: "Completa el pago en la página que se abrió.",
      });
    } catch (err: unknown) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error al iniciar el pago",
        text:
          err instanceof Error
            ? err.message
            : (err as { response?: { data?: { details?: string } } })?.response
                ?.data?.details || "Ocurrió un problema.",
      });
    } finally {
      setLoading(false);
    }
  };
  console.log(deliveryResponse);
  return (
    <div className="min-h-screen bg-white px-4 py-6">
      <h1 className="mb-6 text-center text-3xl font-bold">MEDIOS DE PAGO</h1>

      {deliveryResponse && (
        <DeliverySummary deliveryResponse={deliveryResponse} />
      )}

      <div className="mx-auto mb-8 max-w-3xl">
        <div className="mb-4 flex items-center justify-between rounded bg-gray-300 p-4">
          <span className="text-black">Total:</span>
          <span className="font-bold text-black">
            ${total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
          </span>
          <button
            onClick={iniciarPago}
            className="flex items-center space-x-2 rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
            disabled={loading}
          >
            <SiMercadopago className="h-5 w-5" />
            <span>{loading ? "Procesando…" : "Pagar con Mercado Pago"}</span>
          </button>
        </div>

        <img
          src={tarjeta}
          alt="Métodos de pago"
          className="mx-auto max-w-full"
        />
      </div>

      <div className="text-center">
        <Link to="/" className="underline hover:text-gray-600">
          VOLVER AL INICIO
        </Link>
      </div>
    </div>
  );
}
