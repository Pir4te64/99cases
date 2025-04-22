// DatosDestinatario.tsx
import React, { useEffect } from "react";
import { useFormik } from "formik";
import { validationSchema } from "@/components/Pagos/DatosDestinatario.data";

interface DatosDestinatarioProps {
  nombre: string;
  apellido: string;
  codigoPostal: string;
  calle: string;
  numero: string;
  sinNumero: boolean;
  departamento: string;
  barrio: string;
  ciudad: string;
  // Nuevos props:
  telefono: string;
  localidad: string;
  provincia: string;
  setNombre: (value: string) => void;
  setApellido: (value: string) => void;
  setCodigoPostal: (value: string) => void;
  setCalle: (value: string) => void;
  setNumero: (value: string) => void;
  setSinNumero: (value: boolean) => void;
  setDepartamento: (value: string) => void;
  setBarrio: (value: string) => void;
  setCiudad: (value: string) => void;
  // Setters para nuevos campos:
  setTelefono: (value: string) => void;
  setLocalidad: (value: string) => void;
  setProvincia: (value: string) => void;
}

const DatosDestinatario: React.FC<DatosDestinatarioProps> = ({
  nombre,
  apellido,
  codigoPostal,
  calle,
  numero,
  sinNumero,
  departamento,
  barrio,
  ciudad,
  telefono,
  localidad,
  provincia,
  setNombre,
  setApellido,
  setCodigoPostal,
  setCalle,
  setNumero,
  setSinNumero,
  setDepartamento,
  setBarrio,
  setCiudad,
  setTelefono,
  setLocalidad,
  setProvincia,
}) => {
  // Incluimos los nuevos campos en initialValues
  const formik = useFormik({
    initialValues: {
      nombre,
      apellido,
      codigoPostal,
      calle,
      numero,
      sinNumero,
      departamento,
      barrio,
      ciudad,
      telefono, // Nuevo
      localidad, // Nuevo
      provincia, // Nuevo
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      // Este componente no maneja el submit por sí solo
    },
  });

  // Sincronizamos los valores de formik con las props
  useEffect(() => {
    formik.setValues({
      nombre,
      apellido,
      codigoPostal,
      calle,
      numero,
      sinNumero,
      departamento,
      barrio,
      ciudad,
      telefono,
      localidad,
      provincia,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    nombre,
    apellido,
    codigoPostal,
    calle,
    numero,
    sinNumero,
    departamento,
    barrio,
    ciudad,
    telefono,
    localidad,
    provincia,
  ]);

  return (
    <section>
      <h2 className='text-lg md:text-xl font-bold mb-2 font-favoritExpandedBook'>
        DATOS DEL DESTINATARIO
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label
            htmlFor='nombre'
            className='block text-sm md:text-base font-medium mb-1 font-favoritExpandedBook'>
            Nombre
          </label>
          <input
            id='nombre'
            name='nombre'
            type='text'
            className='w-full border border-gray-300 rounded px-3 py-2 text-sm md:text-base font-favoritExpandedBook'
            value={formik.values.nombre}
            onChange={(e) => {
              formik.handleChange(e);
              setNombre(e.target.value);
            }}
            onBlur={formik.handleBlur}
          />
          {formik.touched.nombre && formik.errors.nombre && (
            <div className='text-red-500 text-xs'>{formik.errors.nombre}</div>
          )}
        </div>
        <div>
          <label
            htmlFor='apellido'
            className='block text-sm md:text-base font-medium mb-1 font-favoritExpandedBook'>
            Apellido
          </label>
          <input
            id='apellido'
            name='apellido'
            type='text'
            className='w-full border border-gray-300 rounded px-3 py-2 text-sm md:text-base font-favoritExpandedBook'
            value={formik.values.apellido}
            onChange={(e) => {
              formik.handleChange(e);
              setApellido(e.target.value);
            }}
            onBlur={formik.handleBlur}
          />
          {formik.touched.apellido && formik.errors.apellido && (
            <div className='text-red-500 text-xs'>{formik.errors.apellido}</div>
          )}
        </div>
      </div>

      {/* Campo para teléfono */}
      <div className='mt-4'>
        <label
          htmlFor='telefono'
          className='block text-sm md:text-base font-medium mb-1 font-favoritExpandedBook'>
          Teléfono
        </label>
        <input
          id='telefono'
          name='telefono'
          type='text'
          className='w-full border border-gray-300 rounded px-3 py-2 text-sm md:text-base font-favoritExpandedBook'
          value={formik.values.telefono}
          onChange={(e) => {
            formik.handleChange(e);
            setTelefono(e.target.value);
          }}
          onBlur={formik.handleBlur}
        />
        {formik.touched.telefono && formik.errors.telefono && (
          <div className='text-red-500 text-xs'>{formik.errors.telefono}</div>
        )}
      </div>

      <div className='mt-4'>
        <label
          htmlFor='codigoPostal'
          className='block text-sm md:text-base font-medium mb-1 font-favoritExpandedBook'>
          Código Postal
        </label>
        <input
          id='codigoPostal'
          name='codigoPostal'
          type='text'
          className='w-full border border-gray-300 rounded px-3 py-2 text-sm md:text-base font-favoritExpandedBook'
          value={formik.values.codigoPostal}
          onChange={(e) => {
            formik.handleChange(e);
            setCodigoPostal(e.target.value);
          }}
          onBlur={formik.handleBlur}
        />
        {formik.touched.codigoPostal && formik.errors.codigoPostal && (
          <div className='text-red-500 text-xs'>
            {formik.errors.codigoPostal}
          </div>
        )}
      </div>

      <div className='mt-4'>
        <label
          htmlFor='calle'
          className='block text-sm md:text-base font-medium mb-1 font-favoritExpandedBook'>
          Calle
        </label>
        <input
          id='calle'
          name='calle'
          type='text'
          className='w-full border border-gray-300 rounded px-3 py-2 text-sm md:text-base font-favoritExpandedBook'
          value={formik.values.calle}
          onChange={(e) => {
            formik.handleChange(e);
            setCalle(e.target.value);
          }}
          onBlur={formik.handleBlur}
        />
        {formik.touched.calle && formik.errors.calle && (
          <div className='text-red-500 text-xs'>{formik.errors.calle}</div>
        )}
      </div>

      <div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div>
          <label
            htmlFor='numero'
            className='block text-sm md:text-base font-medium mb-1 font-favoritExpandedBook'>
            Número
          </label>
          <input
            id='numero'
            name='numero'
            type='text'
            className='w-full border border-gray-300 rounded px-3 py-2 text-sm md:text-base font-favoritExpandedBook'
            value={formik.values.numero}
            onChange={(e) => {
              formik.handleChange(e);
              setNumero(e.target.value);
            }}
            onBlur={formik.handleBlur}
            disabled={formik.values.sinNumero}
          />
          {formik.touched.numero && formik.errors.numero && (
            <div className='text-red-500 text-xs'>{formik.errors.numero}</div>
          )}
          <div className='flex items-center mt-2'>
            <input
              id='sinNumero'
              name='sinNumero'
              type='checkbox'
              className='mr-2'
              checked={formik.values.sinNumero}
              onChange={(e) => {
                formik.handleChange(e);
                setSinNumero(e.target.checked);
              }}
            />
            <label
              htmlFor='sinNumero'
              className='text-sm md:text-base font-favoritExpandedBook'>
              Sin Número
            </label>
          </div>
        </div>
        <div className='md:col-span-2'>
          <label
            htmlFor='departamento'
            className='block text-sm md:text-base font-medium mb-1 font-favoritExpandedBook'>
            Departamento (opcional)
          </label>
          <input
            id='departamento'
            name='departamento'
            type='text'
            className='w-full border border-gray-300 rounded px-3 py-2 text-sm md:text-base font-favoritExpandedBook'
            value={formik.values.departamento}
            onChange={(e) => {
              formik.handleChange(e);
              setDepartamento(e.target.value);
            }}
            onBlur={formik.handleBlur}
          />
        </div>
      </div>

      <div className='mt-4'>
        <label
          htmlFor='barrio'
          className='block text-sm md:text-base font-medium mb-1 font-favoritExpandedBook'>
          Barrio
        </label>
        <input
          id='barrio'
          name='barrio'
          type='text'
          className='w-full border border-gray-300 rounded px-3 py-2 text-sm md:text-base font-favoritExpandedBook'
          value={formik.values.barrio}
          onChange={(e) => {
            formik.handleChange(e);
            setBarrio(e.target.value);
          }}
          onBlur={formik.handleBlur}
        />
        {formik.touched.barrio && formik.errors.barrio && (
          <div className='text-red-500 text-xs'>{formik.errors.barrio}</div>
        )}
      </div>

      <div className='mt-4'>
        <label
          htmlFor='ciudad'
          className='block text-sm md:text-base font-medium mb-1 font-favoritExpandedBook'>
          Ciudad
        </label>
        <input
          id='ciudad'
          name='ciudad'
          type='text'
          className='w-full border border-gray-300 rounded px-3 py-2 text-sm md:text-base font-favoritExpandedBook'
          value={formik.values.ciudad}
          onChange={(e) => {
            formik.handleChange(e);
            setCiudad(e.target.value);
          }}
          onBlur={formik.handleBlur}
        />
        {formik.touched.ciudad && formik.errors.ciudad && (
          <div className='text-red-500 text-xs'>{formik.errors.ciudad}</div>
        )}
      </div>

      {/* Sección para Localidad y Provincia */}
      <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label
            htmlFor='localidad'
            className='block text-sm md:text-base font-medium mb-1 font-favoritExpandedBook'>
            Localidad
          </label>
          <input
            id='localidad'
            name='localidad'
            type='text'
            className='w-full border border-gray-300 rounded px-3 py-2 text-sm md:text-base font-favoritExpandedBook'
            value={formik.values.localidad}
            onChange={(e) => {
              formik.handleChange(e);
              setLocalidad(e.target.value);
            }}
            onBlur={formik.handleBlur}
          />
          {formik.touched.localidad && formik.errors.localidad && (
            <div className='text-red-500 text-xs'>
              {formik.errors.localidad}
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor='provincia'
            className='block text-sm md:text-base font-medium mb-1 font-favoritExpandedBook'>
            Provincia
          </label>
          <input
            id='provincia'
            name='provincia'
            type='text'
            className='w-full border border-gray-300 rounded px-3 py-2 text-sm md:text-base font-favoritExpandedBook'
            value={formik.values.provincia}
            onChange={(e) => {
              formik.handleChange(e);
              setProvincia(e.target.value);
            }}
            onBlur={formik.handleBlur}
          />
          {formik.touched.provincia && formik.errors.provincia && (
            <div className='text-red-500 text-xs'>
              {formik.errors.provincia}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DatosDestinatario;
