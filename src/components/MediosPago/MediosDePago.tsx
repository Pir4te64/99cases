// src/components/MediosPago/MediosDePago.tsx
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import tarjeta from "@/assets/Pagos/tarjetas.png";
import useDeliveryStore from "@/components/Pagos/useDeliveryStore";
import DeliverySummary from "@/components/MediosPago/DeliverySummary";
import { API } from "@/utils/Api";

declare global {
  interface Window {
    MercadoPago: any;
  }
}

export default function MediosDePago() {
  // 1) Tomamos el total desde location.state
  const { state: paymentData } = useLocation() as { state: { total: number } };
  const { deliveryResponse } = useDeliveryStore();
  const total = paymentData?.total ?? 0;

  const [brickReady, setBrickReady] = useState(false);

  // 2) Confirmamos con SweetAlert y luego activamos el brick
  const onIniciarPago = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Confirmar Pago",
      text: `Vas a pagar $${total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, pagar",
      cancelButtonText: "Cancelar",
    });
    if (!isConfirmed) return;

    Swal.fire({
      title: "Cargando formas de pago…",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    // Aquí podrías llamar a tu endpoint de orden si lo necesitas…
    // await fetch(`${API.createPayment}?orderId=${deliveryResponse.numeroOrden}`, …)

    Swal.close();
    setBrickReady(true);
  };

  // 3) Cuando brickReady=true, montamos el Payment Brick
  useEffect(() => {
    if (!brickReady) return;

    const mp = new window.MercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY, {
      locale: "es-AR",
    });
    mp.bricks().create(
      "payment",                   // Tipo de Brick: Payment :contentReference[oaicite:1]{index=1}
      "paymentBrick_container",    // ID del div (sin '#')
      {
        initialization: { amount: total },
        customization: {
          visual: { style: { theme: "default" } },
          paymentMethods: {
            creditCard: "all",
            debitCard: "all",
            ticket: "all",
            bankTransfer: "all",
            mercadoPago: "all",    // activa Wallet :contentReference[oaicite:2]{index=2}
            maxInstallments: 12,
          },
        },
        callbacks: {
          onReady: () => {
            // Se llama cuando el Brick termina de cargar; aquí puedes ocultar spinners, etc.
          },
          onSubmit: (formData: any) => {
            // Se llama al pulsar "Pagar"
            return fetch(`${API.createPayment}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...formData,
                orderId: deliveryResponse.numeroOrden,
              }),
            }).then((r) => r.json());
          },
          onError: (err: any) => {
            // Se llama ante cualquier error en el Brick
            console.error("Error Payment Brick:", err);
          },
        },
      }
    );
  }, [brickReady, total, deliveryResponse]);

  return (
    <div className="min-h-screen bg-white px-4 py-6">
      <h1 className="text-center text-3xl font-bold mb-6">MEDIOS DE PAGO</h1>

      {deliveryResponse && (
        <DeliverySummary deliveryResponse={deliveryResponse} />
      )}

      <div className="max-w-3xl mx-auto mb-8">
        <div className="bg-gray-100 p-4 rounded mb-4 flex justify-between">
          <span>Total:</span>
          <span className="font-bold">
            ${total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
          </span>
          <button
            onClick={onIniciarPago}
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={brickReady}
          >
            {brickReady ? "Formas de pago cargadas…" : "Iniciar Pago"}
          </button>
        </div>

        {/* 4) Aquí se renderiza el formulario embebido */}
        {brickReady && (
          <div id="paymentBrick_container" className="mb-6"></div>
        )}

        <img
          src={tarjeta}
          alt="Métodos de pago"
          className="max-w-full mx-auto"
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
