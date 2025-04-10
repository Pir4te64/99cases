import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs"; // Ajusta la ruta si es necesario
import useCartStore from "../../store/cartStore";
import ResumenCompra from "./PagosProductos"; // Ajusta la ruta según tu estructura
import usePaymentFormStore from "../../store/pagoStore";
import DatosContacto from "./DatosContacto";
import DatosDestinatario from "./DatosDestinatario";
import axios from "axios";
import { API } from "../../utils/Api";
import Swal from "sweetalert2"; // Importación de SweetAlert2
import useDeliveryStore from "./useDeliveryStore";

const Pagos = () => {
  const { cartItems, subtotal, total, idOrdenCompra } = useCartStore();
  const setDeliveryResponse = useDeliveryStore(
    (state) => state.setDeliveryResponse
  );
  const navigate = useNavigate();

  useEffect(() => {
    // Opcional: redirigir si el carrito está vacío
    if (cartItems.length === 0) {
      // navigate("/");
    }
  }, [cartItems, navigate]);

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

  // handleSubmit usa SweetAlert2 para mostrar confirmación y loading
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      // Se arma el objeto para el delivery con la estructura requerida
      const deliveryData = {
        destino: {
          calle: calle,
          numero: numero,
          piso: "", // No tenemos campo para piso, se deja vacío o se puede agregar uno
          departamento: departamento,
          codigoPostal: codigoPostal,
          localidad: ciudad, // Se usa el valor de "ciudad"
          provincia: "Provincia Ejemplo", // Puedes ajustar este valor
        },
        destinatario: {
          nombre: nombre,
          apellido: apellido,
          telefono: "1234567890", // Valor por defecto, ajustar si se tiene campo correspondiente
          email: email,
        },
      };
      console.log("Delivery Data:", deliveryData);

      // Mostrar modal de confirmación
      const { isConfirmed } = await Swal.fire({
        title: "¿Desea continuar?",
        text: "Se va a procesar el delivery",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, continuar",
        cancelButtonText: "Cancelar",
      });

      if (isConfirmed) {
        // Mostrar modal de loading
        Swal.fire({
          title: "Procesando...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        try {
          const token = localStorage.getItem("token");
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          // Se envía la petición PUT (o POST) a API.delivery con idOrdenCompra como parámetro en la URL
          const response = await axios.put(
            `${API.delivery}?orderId=${idOrdenCompra}`,
            deliveryData,
            config
          );
          console.log("Response Delivery:", response.data);
          setDeliveryResponse(response.data);
          // Cerramos el modal de loading
          Swal.close();

          // Una vez que la promesa se cumple sin errores, se arma el paymentData y se redirige
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
            idOrdenCompra,
            ...formData,
          };

          navigate("/medios-pagos", { state: paymentData });
        } catch (error) {
          console.error("Error en API.delivery:", error);
          // Cerramos el modal de loading en caso de error
          Swal.close();
          await Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error en el servidor, intente nuevamente",
          });
          // No se redirige en caso de error
        }
      }
    }
  };

  return (
    <div className='min-h-screen bg-white text-black'>
      <div className='container mx-auto px-4 py-6'>
        <Breadcrumbs items={breadcrumbItems} />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* En móvil, el resumen se muestra primero (order-1) y el formulario después (order-2).
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
