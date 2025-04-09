// MediosDePago.tsx
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import tarjeta from "../../assets/Pagos/tarjetas.png";
// import tarjeta2 from "../../assets/Pagos/tarjetas2.png"; // Tarjetas de débito comentadas

const MediosDePago = () => {
  const location = useLocation();
  const paymentData = location.state;

  useEffect(() => {
    console.log("Datos de pago recibidos:", paymentData);
  }, [paymentData]);

  // Si location.state no existe o no trae la propiedad total, usamos 0 como fallback
  const total = paymentData?.total ?? 0;

  return (
    <div className='min-h-screen bg-white text-black px-4 py-6'>
      <h1 className='text-2xl md:text-3xl font-bold text-center mb-6 font-favoritExpandedBook'>
        MEDIOS DE PAGO
      </h1>

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
            con todas las tarjetas.
          </p>
          <button className='bg-blue-500 text-white px-4 py-2 rounded font-favoritExpandedBook'>
            Pagar con Mercado Pago
          </button>
        </div>
        <img
          src={tarjeta}
          alt='Tarjetas de crédito'
          className='max-w-full mx-auto'
        />
      </div>

      {/*
      // Sección de Tarjetas de Débito (comentada)
      <div className='max-w-3xl mx-auto mb-8'>
        <h2 className='text-lg md:text-xl font-semibold mb-2 font-favoritExpandedBook'>
          TARJETAS DE DÉBITO
        </h2>
        <div className='bg-gray-100 p-4 rounded-md mb-4'>
          <p className='text-sm md:text-base font-favoritExpandedBook'>
            Aquí irán los detalles de pago con tarjeta de débito.
          </p>
        </div>
        <img
          src={tarjeta2}
          alt='Tarjetas de débito'
          className='max-w-full mx-auto'
        />
      </div>
      */}

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
