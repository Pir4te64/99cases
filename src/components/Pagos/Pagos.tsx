// Pagos.tsx
import { useEffect } from "react";
import Breadcrumbs from "../Breadcrumbs"; // Ajusta la ruta si es necesario
import useCartStore from "../../store/cartStore";
import ResumenCompra from "./PagosProductos"; // Ajusta la ruta según tu estructura
import usePaymentFormStore from "../../store/pagoStore"; // Si estás usando el store de formulario
import DatosContacto from "./DatosContacto";

const Pagos = () => {
  const { cartItems, subtotal, total } = useCartStore();

  useEffect(() => {
    // Opcional: redirigir si el carrito está vacío
    if (cartItems.length === 0) {
      // Redirigir a la página principal o a otra ruta
    }
  }, [cartItems]);

  const breadcrumbItems = [{ label: "Inicio", link: "/" }, { label: "Pago" }];

  // Extraemos los valores y setters del store de pago
  const {
    email,
    aceptaNovedades,
    nombre,
    apellido,
    codigoPostal,
    calle,
    numero,
    sinNumero,
    departamento,
    barrio,
    ciudad,
    mismaFacturacion,
    setEmail,
    setAceptaNovedades,
    setNombre,
    setApellido,
    setCodigoPostal,
    setCalle,
    setNumero,
    setSinNumero,
    setDepartamento,
    setBarrio,
    setCiudad,
    setMismaFacturacion,
  } = usePaymentFormStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para procesar el formulario de pago
    console.log({
      email,
      aceptaNovedades,
      nombre,
      apellido,
      codigoPostal,
      calle,
      numero,
      sinNumero,
      departamento,
      barrio,
      ciudad,
      mismaFacturacion,
    });
  };

  const isFormValid =
    email.trim() !== "" &&
    nombre.trim() !== "" &&
    apellido.trim() !== "" &&
    codigoPostal.trim() !== "" &&
    calle.trim() !== "" &&
    (sinNumero ? true : numero.trim() !== "") &&
    barrio.trim() !== "" &&
    ciudad.trim() !== "" &&
    mismaFacturacion;

  return (
    <div className='min-h-screen bg-white text-black'>
      <div className='container mx-auto px-4 py-6'>
        <Breadcrumbs items={breadcrumbItems} />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='order-1 md:order-2'>
            <ResumenCompra
              cartItems={cartItems}
              subtotal={subtotal}
              total={total}
            />
          </div>

          {/* Columna 2: Formulario de Pago */}
          <div className='order-2 md:order-1'>
            <form onSubmit={handleSubmit} className='space-y-8'>
              {/* DATOS DE CONTACTO */}
              <DatosContacto
                email={email}
                aceptaNovedades={aceptaNovedades}
                setEmail={setEmail}
                setAceptaNovedades={setAceptaNovedades}
              />
              {/* ENTREGA */}
              <section>
                <h2 className='text-lg md:text-xl font-bold mb-2 font-favoritExpandedBook'>
                  ENTREGA
                </h2>
                <p className='bg-gray-200 text-sm md:text-base p-3 rounded font-favoritExpandedBook'>
                  Gestionar el envío directamente con la página de Andreani.
                </p>
              </section>

              {/* DATOS DEL DESTINATARIO */}
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
                      type='text'
                      className='w-full border border-gray-300 rounded px-3 py-2 text-sm md:text-base font-favoritExpandedBook'
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='apellido'
                      className='block text-sm md:text-base font-medium mb-1 font-favoritExpandedBook'>
                      Apellido
                    </label>
                    <input
                      id='apellido'
                      type='text'
                      className='w-full border border-gray-300 rounded px-3 py-2 text-sm md:text-base font-favoritExpandedBook'
                      value={apellido}
                      onChange={(e) => setApellido(e.target.value)}
                    />
                  </div>
                </div>

                <div className='mt-4'>
                  <label
                    htmlFor='codigoPostal'
                    className='block text-sm md:text-base font-medium mb-1 font-favoritExpandedBook'>
                    Código Postal
                  </label>
                  <input
                    id='codigoPostal'
                    type='text'
                    className='w-full border border-gray-300 rounded px-3 py-2 text-sm md:text-base font-favoritExpandedBook'
                    value={codigoPostal}
                    onChange={(e) => setCodigoPostal(e.target.value)}
                  />
                </div>

                <div className='mt-4'>
                  <label
                    htmlFor='calle'
                    className='block text-sm md:text-base font-medium mb-1 font-favoritExpandedBook'>
                    Calle
                  </label>
                  <input
                    id='calle'
                    type='text'
                    className='w-full border border-gray-300 rounded px-3 py-2 text-sm md:text-base font-favoritExpandedBook'
                    value={calle}
                    onChange={(e) => setCalle(e.target.value)}
                  />
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
                      type='text'
                      className='w-full border border-gray-300 rounded px-3 py-2 text-sm md:text-base font-favoritExpandedBook'
                      value={numero}
                      onChange={(e) => setNumero(e.target.value)}
                      disabled={sinNumero}
                    />
                    <div className='flex items-center mt-2'>
                      <input
                        id='sinNumero'
                        type='checkbox'
                        className='mr-2'
                        checked={sinNumero}
                        onChange={(e) => setSinNumero(e.target.checked)}
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
                      type='text'
                      className='w-full border border-gray-300 rounded px-3 py-2 text-sm md:text-base font-favoritExpandedBook'
                      value={departamento}
                      onChange={(e) => setDepartamento(e.target.value)}
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
                    type='text'
                    className='w-full border border-gray-300 rounded px-3 py-2 text-sm md:text-base font-favoritExpandedBook'
                    value={barrio}
                    onChange={(e) => setBarrio(e.target.value)}
                  />
                </div>

                <div className='mt-4'>
                  <label
                    htmlFor='ciudad'
                    className='block text-sm md:text-base font-medium mb-1 font-favoritExpandedBook'>
                    Ciudad
                  </label>
                  <input
                    id='ciudad'
                    type='text'
                    className='w-full border border-gray-300 rounded px-3 py-2 text-sm md:text-base font-favoritExpandedBook'
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                  />
                </div>
              </section>

              {/* DATOS DE FACTURACIÓN */}
              <section>
                <h2 className='text-lg md:text-xl font-bold mb-2 font-favoritExpandedBook'>
                  DATOS DE FACTURACIÓN
                </h2>
                <div className='flex items-center'>
                  <input
                    id='mismaFacturacion'
                    type='checkbox'
                    className='mr-2'
                    checked={mismaFacturacion}
                    onChange={(e) => setMismaFacturacion(e.target.checked)}
                  />
                  <label
                    htmlFor='mismaFacturacion'
                    className='text-sm md:text-base font-favoritExpandedBook'>
                    Mis datos de facturación y entrega son los mismos.
                  </label>
                </div>
              </section>

              {/* Botón Final */}
              <button
                type='submit'
                disabled={!isFormValid}
                className={`w-full ${
                  isFormValid
                    ? "bg-black hover:bg-gray-800"
                    : "bg-gray-500 cursor-not-allowed"
                } text-white px-6 py-3 rounded transition-colors font-favoritExpandedBook`}>
                CONTINUAR PARA EL PAGO
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagos;
