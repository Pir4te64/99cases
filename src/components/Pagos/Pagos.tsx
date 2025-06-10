// src/pages/Pagos.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import useCartStore from "@/store/cartStore";
import ResumenCompra from "@/components/Pagos/PagosProductos";
import usePaymentFormStore from "@/store/pagoStore";
import DatosDestinatario from "@/components/Pagos/DatosDestinatario";
import useDeliveryStore from "@/components/Pagos/store/useDeliveryStore";
import {
  submitDelivery,
  SubmitParams,
} from "@/components/Pagos/SubmitDelivery";

const Pagos = () => {
  const { cartItems, subtotal, total, idOrdenCompra } = useCartStore();
  const setDeliveryResponse = useDeliveryStore((s) => s.setDeliveryResponse);
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) {
      // navigate("/");
    }
  }, [cartItems, navigate]);

  const {
    email,
    nombre,
    apellido,
    codigoPostal,
    calle,
    numero,
    sinNumero,
    departamento,
    mismaFacturacion,
    telefono,
    localidad,
    provincia,
    tipoDocumento,
    numeroDocumento,
    setMismaFacturacion,
  } = usePaymentFormStore();

  // Empaqueta todo en un solo objeto para pasar a submitDelivery
  const submitParams: Omit<SubmitParams, "e"> = {
    form: {
      nombre,
      apellido,
      email,
      telefono,
      codigoPostal,
      calle,
      numero,
      sinNumero,
      departamento,
      localidad,
      provincia,
      mismaFacturacion,
      tipoDocumento,
      numeroDocumento,
    },
    cart: { cartItems, subtotal, total, idOrdenCompra },
    actions: { setDeliveryResponse, navigate },
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-4 py-6">
        <Breadcrumbs
          items={[{ label: "Entrega", link: "/" }, { label: "Pago" }]}
        />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[3fr_2fr] my-4">
          <div className="order-1 md:order-2">
            <ResumenCompra cartItems={cartItems} total={total} />
          </div>
          <div className="order-2 md:order-1">
            <DatosDestinatario />

            <form
              onSubmit={(e) => submitDelivery({ e, ...submitParams })}
              className="space-y-8 ml-6"
            >
              <section className="mt-4 space-y-4">
                <h2 className="mb-2 font-favoritExpanded text-lg font-bold md:text-xl">
                  DATOS DE FACTURACIÓN
                </h2>
                <div className="flex items-center">
                  <div className="relative mr-3">
                    <input
                      id="mismaFacturacion"
                      type="checkbox"
                      className="sr-only"
                      checked={mismaFacturacion}
                      onChange={(e) => setMismaFacturacion(e.target.checked)}
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 transition-colors cursor-pointer ${
                        mismaFacturacion
                          ? "bg-gray-600 border-gray-600"
                          : "bg-white border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => setMismaFacturacion(!mismaFacturacion)}
                    >
                      {mismaFacturacion && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <label
                    htmlFor="mismaFacturacion"
                    className="font-favoritExpanded text-sm md:text-base cursor-pointer"
                  >
                    Mis datos de facturación y entrega son los mismos.
                  </label>
                </div>
              </section>

              <button
                type="submit"
                className="w-full rounded bg-black px-6 py-3 font-favoritExpandedBook text-white transition-colors hover:bg-gray-800"
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
