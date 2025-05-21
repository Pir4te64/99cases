import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentError = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4'>
      {/* Icono de error */}
      <div className='text-red-500'>
        <XCircle size={80} />
      </div>
      {/* Mensaje de error */}
      <h1 className='mt-6 text-3xl font-bold text-gray-800'>
        ¡Error en el Pago!
      </h1>
      <p className='mt-2 text-lg text-gray-600 text-center'>
        Hubo un problema al procesar tu pago. Por favor, intenta nuevamente o
        contacta al soporte.
      </p>
      {/* Botón para volver al inicio */}
      <button
        onClick={() => navigate("/")}
        className='mt-8 px-6 py-3 bg-black text-white rounded transition-colors font-medium hover:bg-gray-800'>
        Ir al inicio
      </button>
    </div>
  );
};

export default PaymentError;
