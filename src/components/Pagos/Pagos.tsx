// Pagos.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs"; // Ajusta la ruta si es necesario
import useCartStore from "../../store/cartStore";
import ResumenCompra from "./PagosProductos"; // Ajusta la ruta según tu estructura
import usePaymentFormStore from "../../store/pagoStore";
import DatosContacto from "./DatosContacto";
import DatosDestinatario from "./DatosDestinatario";

const Pagos = () => {
  const { cartItems, subtotal, total } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Opcional: redirigir si el carrito está vacío
    if (cartItems.length === 0) {
      // Redirigir a la página principal o a otra ruta
    }
  }, [cartItems]);

  const breadcrumbItems = [{ label: "Inicio", link: "/" }, { label: "Pago" }];

  // Extraemos los valores y setters del store de formulario
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

  const isFormValid =
    nombre.trim() !== "" &&
    apellido.trim() !== "" &&
    codigoPostal.trim() !== "" &&
    calle.trim() !== "" &&
    (sinNumero ? true : numero.trim() !== "") &&
    barrio.trim() !== "" &&
    ciudad.trim() !== "" &&
    mismaFacturacion;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      // Aquí puedes procesar la información si lo requieres
      const formData = {
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
      };
      const paymentData = {
        cartItems,
        subtotal,
        total,
        ...formData,
      };

      // Redirigimos a /medios-pago enviando la información en state
      navigate("/medios-pagos", { state: paymentData });
    }
  };

  return (
    <div className='min-h-screen bg-white text-black'>
      <div className='container mx-auto px-4 py-6'>
        <Breadcrumbs items={breadcrumbItems} />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* En móvil, el resumen se muestra primero (order-1) y el formulario después (order-2)
              En md, se invierte el orden */}
          <div className='order-1 md:order-2'>
            <ResumenCompra
              cartItems={cartItems}
              subtotal={subtotal}
              total={total}
            />
          </div>

          <div className='order-2 md:order-1'>
            <form onSubmit={handleSubmit} className='space-y-8'>
              {/* Sección de Datos de Contacto */}
              <DatosContacto
                email={email}
                aceptaNovedades={aceptaNovedades}
                setEmail={setEmail}
                setAceptaNovedades={setAceptaNovedades}
              />
              {/* Sección de Datos del Destinatario */}
              <DatosDestinatario
                nombre={nombre}
                apellido={apellido}
                codigoPostal={codigoPostal}
                calle={calle}
                numero={numero}
                sinNumero={sinNumero}
                departamento={departamento}
                barrio={barrio}
                ciudad={ciudad}
                setNombre={setNombre}
                setApellido={setApellido}
                setCodigoPostal={setCodigoPostal}
                setCalle={setCalle}
                setNumero={setNumero}
                setSinNumero={setSinNumero}
                setDepartamento={setDepartamento}
                setBarrio={setBarrio}
                setCiudad={setCiudad}
              />
              {/* Sección de Datos de Facturación */}
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

              <button
                type='submit'
                disabled={!isFormValid}
                className={`w-full px-6 py-3 rounded transition-colors font-favoritExpandedBook ${
                  isFormValid
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-500 text-white cursor-not-allowed"
                }`}>
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
