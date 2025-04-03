// DatosContacto.tsx
import React from "react";

interface DatosContactoProps {
  email: string;
  aceptaNovedades: boolean;
  setEmail: (email: string) => void;
  setAceptaNovedades: (value: boolean) => void;
}

const DatosContacto: React.FC<DatosContactoProps> = ({
  email,
  aceptaNovedades,
  setEmail,
  setAceptaNovedades,
}) => {
  return (
    <section>
      <h2 className='text-lg md:text-xl font-bold mb-2 font-favoritExpandedBook'>
        DATOS DE CONTACTO
      </h2>
      <div className='mb-4'>
        <label
          htmlFor='email'
          className='block text-sm md:text-base font-medium mb-1 font-favoritExpandedBook'>
          E-mail
        </label>
        <input
          id='email'
          type='email'
          placeholder='nombre@ejemplo.com'
          className='w-full border border-gray-300 rounded px-3 py-2 text-sm md:text-base focus:outline-none focus:ring focus:border-black font-favoritExpandedBook'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='flex items-center'>
        <input
          id='ofertas'
          type='checkbox'
          className='mr-2'
          checked={aceptaNovedades}
          onChange={(e) => setAceptaNovedades(e.target.checked)}
        />
        <label
          htmlFor='ofertas'
          className='text-sm md:text-base font-favoritExpandedBook'>
          Quiero recibir ofertas y novedades por e-mail.
        </label>
      </div>
      <section className='mt-8'>
        <h2 className='text-lg md:text-xl font-bold mb-2 font-favoritExpandedBook'>
          ENTREGA
        </h2>
        <p className='bg-gray-200 text-sm md:text-base p-3 rounded font-favoritExpandedBook'>
          Gestionar el envío directamente con la página de Andreani.
        </p>
      </section>
    </section>
  );
};

export default DatosContacto;
