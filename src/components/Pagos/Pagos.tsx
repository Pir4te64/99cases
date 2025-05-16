// src/pages/Pagos.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@/components/Breadcrumbs";
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
          items={[{ label: "Inicio", link: "/" }, { label: "Pago" }]}
        />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="order-1 md:order-2">
            <ResumenCompra
              cartItems={cartItems}
              subtotal={subtotal}
              total={total}
            />
          </div>
          <div className="order-2 md:order-1">
            <DatosDestinatario />

            <form
              onSubmit={(e) => submitDelivery({ e, ...submitParams })}
              className="space-y-8"
            >
              <section className="mt-4 space-y-4">
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
