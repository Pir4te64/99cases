import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { SiMercadopago } from "react-icons/si";

import useDeliveryStore from "@/components/Pagos/store/useDeliveryStore";
import DeliverySummary from "@/components/MediosPago/DeliverySummary";
import { API } from "@/utils/Api";

export default function MediosDePago() {
  const { state: paymentData } = useLocation();
  const { deliveryResponse } = useDeliveryStore();
  const total = paymentData?.total ?? 0;

  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(
    deliveryResponse?.deliveryOptions?.[0]?.modoDeEntrega ?? ""
  );

  const shippingCost =
    deliveryResponse?.deliveryOptions.find(
      (opt) => opt.modoDeEntrega === selectedOption
    )?.tarifaConIva ?? 0;

  const totalWithShipping = total + shippingCost;

  const iniciarPago = async () => {
    if (!selectedOption) {
      await Swal.fire({
        icon: "warning",
        title: "Debes elegir un modo de entrega",
      });
      return;
    }

    const { isConfirmed } = await Swal.fire({
      title: "Confirmar Pago",
      text: `Vas a pagar $${Math.floor(totalWithShipping).toLocaleString(
        "es-AR"
      )}`,
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

      const query = `?orderId=${
        deliveryResponse.id
      }&modoEntrega=${encodeURIComponent(selectedOption)}`;
      const { data } = await axios.post(
        `${API.createPayment}${query}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.close();

      if (!data.paymentLink) {
        throw new Error(data.details || "No se obtuvo el link de pago.");
      }

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
            : (err as any)?.response?.data?.details || "Ocurrió un problema.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-center font-favoritExpanded text-black text-3xl font-bold uppercase">
          MEDIOS DE PAGO
        </h1>

        {deliveryResponse && (
          <DeliverySummary
            deliveryResponse={deliveryResponse}
            selectedOption={selectedOption}
            onSelectOption={setSelectedOption}
          />
        )}

        <div className="mb-4 space-y-2 rounded bg-[#EEEEEE] p-4">
          <p className="text-black">
            <strong className="font-favoritExpanded">Envío:</strong>{" "}
            <span className="font-favoritExpanded">
              {selectedOption} ($
              {shippingCost.toLocaleString("es-AR", {
                minimumFractionDigits: 2,
              })}
              )
            </span>
          </p>
          <p className="text-black">
            <strong className="font-favoritExpanded">Subtotal:</strong>{" "}
            <span className="font-favoritExpanded">
              ${Math.floor(total).toLocaleString("es-AR")}
            </span>
          </p>
          <p className="text-black">
            <strong className="font-favoritExpanded">Total con envío:</strong>{" "}
            <span className="font-favoritExpanded">
              ${Math.floor(totalWithShipping).toLocaleString("es-AR")}
            </span>
          </p>
          <button
            onClick={iniciarPago}
            className="flex w-full items-center justify-center space-x-2 rounded bg-blue-600 px-4 py-2 font-favoritExpanded text-white disabled:opacity-50"
            disabled={loading}
          >
            <SiMercadopago className="h-5 w-5" />
            <span className="font-favoritExpanded text-sm">
              {loading ? "Procesando…" : "Pagar con Mercado Pago"}
            </span>
          </button>
        </div>

        <div className="text-right">
          <Link
            to="/"
            className="font-favoritExpanded text-black underline hover:text-gray-600"
          >
            VOLVER AL INICIO
          </Link>
        </div>
      </div>
    </div>
  );
}
