import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4'>
      {/* Icono de éxito */}
      <div className='text-green-500'>
        <CheckCircle size={80} />
      </div>
      {/* Mensaje de éxito */}
      <h1 className='mt-6 text-3xl font-bold text-gray-800'>¡Pago Exitoso!</h1>
      <p className='mt-2 text-lg text-gray-600'>
        Gracias por tu compra. Tu transacción se ha realizado correctamente.
      </p>
      <button
        onClick={() => navigate("/")}
        className='mt-8 px-6 py-3 bg-black text-white rounded transition-colors font-medium hover:bg-gray-800'>
        Ir al inicio
      </button>
    </div>
  );
};

export default PaymentSuccess;
