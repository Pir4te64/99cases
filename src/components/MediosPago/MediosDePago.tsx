// src/components/MediosPago/MediosDePago.tsx
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { SiMercadopago } from "react-icons/si";
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
      text: `Vas a pagar $${total.toLocaleString("es-AR", {
        minimumFractionDigits: 2,
      })}`,
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
      "payment",                 // tipo de Brick
      "paymentBrick_container",  // ID del div (sin '#')
      {
        initialization: { amount: total },
        customization: {
          visual: { style: { theme: "default" } },
          paymentMethods: {
            creditCard: "all",
            debitCard: "all",
            ticket: "all",
            bankTransfer: "all",
            mercadoPago: "all",
            maxInstallments: 12,
          },
        },
        callbacks: {
          onReady: () => {
            // Se llama cuando el Brick termina de cargar
          },

          onSubmit: async (formData: any) => {
            try {
              const token = localStorage.getItem("token");
              if (!token) throw new Error("No hay token de usuario");

              // Armamos la URL con el orderId como query param
              const url = `${API.createPayment}?orderId=${deliveryResponse.numeroOrden}`;

              // Llamada POST con axios
              const { data } = await axios.post(url, formData, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              });

              // Backend puede devolver { details: "...", ... } en caso de error
              if (data.details) {
                console.error("Error del servidor:", data);
                return Swal.fire({
                  icon: "error",
                  title: "Error al procesar el pago",
                  text: data.details,
                });
              }

              console.log("Pago creado:", data);
              return Swal.fire({
                icon: "success",
                title: "Pago iniciado",
                text: "Redirigiendo al formulario de MercadoPago...",
              });
            } catch (err: any) {
              console.error("Excepción en onSubmit:", err);
              Swal.fire({
                icon: "error",
                title: "Error al iniciar el pago",
                text:
                  err.response?.data?.details ||
                  err.message ||
                  "Ocurrió un problema inesperado.",
              });
            }
          },

          onError: (err: any) => {
            console.error("Error Payment Brick:", err);
            Swal.fire({
              icon: "error",
              title: "Error en MercadoPago",
              text: "No se pudieron cargar las formas de pago.",
            });
          },
        },
      }
    );
  }, [brickReady, total, deliveryResponse]);

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
            onClick={onIniciarPago}
            className="flex items-center space-x-2 rounded bg-blue-600 px-4 py-2 text-white"
            disabled={brickReady}
          >
            <SiMercadopago className="h-5 w-5" />
            <span>
              {brickReady ? "Formas de pago cargadas…" : "Iniciar Pago"}
            </span>
          </button>
        </div>

        {/* 4) Aquí se renderiza el formulario embebido */}
        {brickReady && (
          <div id="paymentBrick_container" className="mb-6"></div>
        )}

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
