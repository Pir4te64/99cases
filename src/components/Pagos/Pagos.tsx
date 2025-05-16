// src/pages/Pagos.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@/components/Breadcrumbs"; // Ajusta la ruta si es necesario
import useCartStore from "@/store/cartStore";
import ResumenCompra from "@/components/Pagos/PagosProductos"; // Ajusta la ruta según tu estructura
import usePaymentFormStore from "@/store/pagoStore";
import DatosDestinatario from "@/components/Pagos/DatosDestinatario";
import axios from "axios";
import { API } from "@/utils/Api";
import Swal from "sweetalert2"; // Importación de SweetAlert2
import useDeliveryStore from "@/components/Pagos/useDeliveryStore";

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

  // Extraemos los valores y setters del store de formulario, incluyendo los nuevos estados:
  const {
    email,
    nombre,
    apellido,
    codigoPostal,
    calle,
    numero,
    sinNumero,
    departamento,
    barrio,
    mismaFacturacion,
    // Nuevos estados de ubicación y teléfono
    telefono,
    localidad,
    provincia,
    // 🔹 Nuevos estados de documento
    tipoDocumento,
    numeroDocumento,
    // Setters existentes...
    setEmail,
    setNombre,
    setApellido,
    setCodigoPostal,
    setCalle,
    setNumero,
    setSinNumero,
    setDepartamento,
    setBarrio,
    setMismaFacturacion,
    setTelefono,
    setLocalidad,
    setProvincia,
    // 🔹 Nuevos setters de documento
    setTipoDocumento,
    setNumeroDocumento,
  } = usePaymentFormStore();

  // Actualizamos la validación del formulario para incluir los nuevos campos.
  const isFormValid =
    nombre.trim() !== "" &&
    apellido.trim() !== "" &&
    codigoPostal.trim() !== "" &&
    calle.trim() !== "" &&
    (sinNumero ? true : numero.trim() !== "") &&
    telefono.trim() !== "" &&   // validar teléfono
    localidad.trim() !== "" &&  // validar localidad
    provincia.trim() !== "" &&  // validar provincia
    mismaFacturacion &&
    // 🔹 validaciones de documento
    tipoDocumento.trim() !== "" &&
    numeroDocumento.trim() !== "";

  // handleSubmit usa SweetAlert2 para mostrar confirmación y loading
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    // Se arma el objeto para el delivery con la estructura requerida.
    const deliveryData = {
      destino: {
        calle: calle,
        piso: numero,
        numero: telefono,
        codigoPostal: codigoPostal,
        localidad: localidad,
        provincia: provincia,
      },
      destinatario: {
        nombre: nombre,
        email: email,
        // 🔹 agregamos tipo y número de documento
        tipoDocumento: tipoDocumento,
        numeroDocumento: numeroDocumento,
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
        // Se envía la petición PUT a API.delivery con idOrdenCompra
        const response = await axios.put(
          `${API.delivery}?orderId=${idOrdenCompra}`,
          deliveryData,
          config
        );
        console.log("Response Delivery:", response.data);
        setDeliveryResponse(response.data);
        Swal.close();

        // Armar y navegar al paymentData
        const formData = {
          nombre,
          apellido,
          codigoPostal,
          calle,
          numero,
          sinNumero,
          departamento,
          barrio,
          telefono,
          localidad,
          provincia,
          mismaFacturacion,
          // 🔹 incluir en el paymentData si lo necesitas
          tipoDocumento,
          numeroDocumento,
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
        Swal.close();
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error en el servidor, intente nuevamente",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-4 py-6">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="order-1 md:order-2">
            <ResumenCompra
              cartItems={cartItems}
              subtotal={subtotal}
              total={total}
            />
          </div>

          <div className="order-2 md:order-1">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Sección de Datos del Destinatario */}
              <DatosDestinatario
                nombre={nombre}
                apellido={apellido}
                email={email}
                telefono={telefono}
                codigoPostal={codigoPostal}
                calle={calle}
                numero={numero}
                sinNumero={sinNumero}
                departamento={departamento}
                barrio={barrio}
                localidad={localidad}
                provincia={provincia}
                // 🔹 nuevos props de documento
                tipoDocumento={tipoDocumento}
                numeroDocumento={numeroDocumento}
                setNombre={setNombre}
                setApellido={setApellido}
                setEmail={setEmail}
                setTelefono={setTelefono}
                setLocalidad={setLocalidad}
                setProvincia={setProvincia}
                setCodigoPostal={setCodigoPostal}
                setCalle={setCalle}
                setNumero={setNumero}
                setSinNumero={setSinNumero}
                setDepartamento={setDepartamento}
                setBarrio={setBarrio}
                setTipoDocumento={setTipoDocumento}
                setNumeroDocumento={setNumeroDocumento}
              />
              {/* Sección de Datos de Facturación */}
              <section>
                <h2 className="mb-2 font-favoritExpandedBook text-lg font-bold md:text-xl">
                  DATOS DE FACTURACIÓN
                </h2>
                <div className="flex items-center">
                  <input
                    id="mismaFacturacion"
                    type="checkbox"
                    className="mr-2"
                    checked={mismaFacturacion}
                    onChange={(e) => setMismaFacturacion(e.target.checked)}
                  />
                  <label
                    htmlFor="mismaFacturacion"
                    className="font-favoritExpandedBook text-sm md:text-base"
                  >
                    Mis datos de facturación y entrega son los mismos.
                  </label>
                </div>
              </section>

              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full px-6 py-3 rounded transition-colors font-favoritExpandedBook ${isFormValid
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-500 text-white cursor-not-allowed"
                  }`}
              >
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
