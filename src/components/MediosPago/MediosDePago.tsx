import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import tarjeta from "../../assets/Pagos/tarjetas.png";
import useDeliveryStore from "../Pagos/useDeliveryStore";
import DeliverySummary from "./DeliverySummary";
import { handleMercadoPago } from "./handleMercadoPago";

const MediosDePago = () => {
  const location = useLocation();
  const paymentData = location.state;
  const { deliveryResponse } = useDeliveryStore();
  interface PaymentLinks {
    paymentLink: string;
    paymentLinkSandbox: string;
  }

  const [paymentLinks, setPaymentLinks] = useState<PaymentLinks | null>(null);

  // Si location.state no existe o no trae la propiedad total, usamos 0 como fallback
  const total = paymentData?.total ?? 0;

  // Función para manejar el pago con Mercado Pago
  const onPagarMercadoPago = async () => {
    await handleMercadoPago(deliveryResponse, setPaymentLinks);
  };

  return (
    <div className='min-h-screen bg-white text-black px-4 py-6'>
      <h1 className='text-2xl md:text-3xl font-bold text-center mb-6 font-favoritExpandedBook'>
        MEDIOS DE PAGO
      </h1>

      {/* Componente con la información de la entrega */}
      {deliveryResponse && (
        <DeliverySummary deliveryResponse={deliveryResponse} />
      )}

      {/* Sección de Tarjetas de Crédito */}
      <div className='max-w-3xl mx-auto mb-8'>
        <h2 className='text-lg md:text-xl font-semibold mb-2 font-favoritExpandedBook'>
          TARJETAS DE CRÉDITO
        </h2>
        <div className='bg-gray-100 p-4 rounded-md mb-4 flex items-center justify-between'>
          <p className='text-sm md:text-base font-favoritExpandedBook'>
            Total de 1 pago:
            <span className='font-bold'>
              {" "}
              ${total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
            </span>{" "}
          </p>
          <button
            onClick={onPagarMercadoPago}
            className='bg-blue-500 text-white px-4 py-2 rounded font-favoritExpandedBook'>
            Pagar con Mercado Pago
          </button>
        </div>

        {/* Renderizamos dos botones si tenemos la respuesta de la API */}
        {paymentLinks && (
          <div className='flex flex-col md:flex-row justify-around gap-4 mb-4'>
            <button
              onClick={() => window.open(paymentLinks.paymentLink, "_blank")}
              className='bg-green-500 text-white px-4 py-2 rounded font-favoritExpandedBook'>
              Pagar (Producción)
            </button>
            <button
              onClick={() =>
                window.open(paymentLinks.paymentLinkSandbox, "_blank")
              }
              className='bg-orange-500 text-white px-4 py-2 rounded font-favoritExpandedBook'>
              Pagar (Sandbox)
            </button>
          </div>
        )}

        <img
          src={tarjeta}
          alt='Tarjetas de crédito'
          className='max-w-full mx-auto'
        />
      </div>

      {/* Link para volver al producto */}
      <div className='text-center mt-6'>
        <Link
          to='/'
          className='underline text-sm md:text-base hover:text-gray-600 font-favoritExpandedBook'>
          VOLVER AL INICIO
        </Link>
      </div>
    </div>
  );
};

export default MediosDePago;
