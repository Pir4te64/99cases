import { Props } from "@/components/Pagos/store/types";
import { useEffect } from "react";

export default function DeliverySummary({
  deliveryResponse,
  selectedOption,
  onSelectOption,
}: Props) {
  if (!deliveryResponse?.deliveryOptions) {
    return null;
  }
  console.log(deliveryResponse);

  useEffect(() => {
    // Set "A domicilio" as default if no option is selected
    if (!selectedOption) {
      const domicilioOption = deliveryResponse.deliveryOptions.find(
        (opt) => opt.modoDeEntrega === "A domicilio"
      );
      if (domicilioOption) {
        onSelectOption(domicilioOption.modoDeEntrega);
      }
    }
  }, [deliveryResponse.deliveryOptions, selectedOption, onSelectOption]);

  return (
    <div className="mb-6 rounded bg-[#EEEEEE] p-4 shadow-lg">
      <h2 className="mb-2 font-favoritExpanded text-xl text-[#000000]">
        Resumen de Envío
      </h2>

      <p className="font-favoritExpanded text-[#000000]">
        <strong className="font-favoritExpanded text-[#000000]">
          Destino:
        </strong>{" "}
        {deliveryResponse.destino || "No especificado"}
      </p>
      <p className="font-favoritExpanded text-[#000000]">
        <strong className="font-favoritExpanded text-[#000000]">
          Contacto:
        </strong>{" "}
        {deliveryResponse.datosDeContacto || "No especificado"}
      </p>
      <p className="font-favoritExpanded text-[#000000]">
        <strong className="font-favoritExpanded text-[#000000]">
          Costo de Orden:
        </strong>{" "}
        $
        {(deliveryResponse.costoOrden || 0).toLocaleString("es-AR", {
          minimumFractionDigits: 2,
        })}
      </p>

      <div className="mt-4">
        <p className="mb-2 font-favoritExpanded text-[#000000]">
          Opciones de Entrega:
        </p>
        <ul>
          {deliveryResponse.deliveryOptions.map((opt, index) => (
            <li
              key={`${opt.modoDeEntregaId || index}`}
              className="mb-2 flex items-center font-favoritExpanded text-[#000000]"
            >
              <input
                type="radio"
                id={`delivery-option-${opt.modoDeEntregaId || index}`}
                name="deliveryOption"
                value={opt.modoDeEntrega || ""}
                checked={selectedOption === opt.modoDeEntrega}
                onChange={() => onSelectOption(opt.modoDeEntrega || "")}
                className="mr-2"
              />
              <label
                htmlFor={`delivery-option-${opt.modoDeEntregaId || index}`}
                className="font-favoritExpanded text-[#000000]"
              >
                {opt.modoDeEntrega || "Opción no especificada"} — $
                {(opt.tarifaConIva || 0).toLocaleString("es-AR", {
                  minimumFractionDigits: 2,
                })}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
