import { Props } from "@/components/Pagos/store/types";
import { useEffect, useRef } from "react";

export default function DeliverySummary({
  deliveryResponse,
  selectedOption,
  onSelectOption,
}: Props) {
  const hasSetDefault = useRef(false);

  if (!deliveryResponse?.deliveryOptions) {
    return null;
  }

  // Ordenar para que "A domicilio" esté primero
  const sortedOptions = [...deliveryResponse.deliveryOptions].sort((a, b) => {
    if (a.modoDeEntrega === "A domicilio") return -1;
    if (b.modoDeEntrega === "A domicilio") return 1;
    return 0;
  });

  useEffect(() => {
    // Establecer "A domicilio" por defecto solo la primera vez
    if (!hasSetDefault.current && deliveryResponse.deliveryOptions) {
      const domicilioOption = deliveryResponse.deliveryOptions.find(
        opt => opt.modoDeEntrega === "A domicilio"
      );

      if (domicilioOption) {
        onSelectOption("A domicilio");
        hasSetDefault.current = true;
      }
    }
  }, [deliveryResponse.deliveryOptions, onSelectOption]);

  return (
    <div className="mb-6 rounded bg-[#EEEEEE] p-4 shadow-lg">
      <h2 className="mb-2 font-favoritExpanded text-xl text-[#000000]">
        Resumen de Envío
      </h2>

      <p className="font-favoritExpanded text-[#000000]">
        <strong>Destino:</strong> {deliveryResponse.destino || "No especificado"}
      </p>
      <p className="font-favoritExpanded text-[#000000]">
        <strong>Contacto:</strong> {deliveryResponse.datosDeContacto || "No especificado"}
      </p>
      <p className="font-favoritExpanded text-[#000000]">
        <strong>Costo de Orden:</strong> $
        {(deliveryResponse.costoOrden || 0).toLocaleString("es-AR", {
          minimumFractionDigits: 2,
        })}
      </p>

      <div className="mt-4">
        <p className="mb-2 font-favoritExpanded text-[#000000]">Opciones de Entrega:</p>
        <ul>
          {sortedOptions.map((opt) => (
            <li
              key={opt.modoDeEntregaId}
              className="mb-2 flex items-center font-favoritExpanded text-[#000000]"
            >
              <input
                type="radio"
                id={`delivery-option-${opt.modoDeEntregaId}`}
                name="deliveryOption"
                value={opt.modoDeEntrega}
                checked={selectedOption === opt.modoDeEntrega}
                onChange={() => onSelectOption(opt.modoDeEntrega)}
                className="mr-2"
              />
              <label
                htmlFor={`delivery-option-${opt.modoDeEntregaId}`}
                className="font-favoritExpanded text-[#000000]"
              >
                {opt.modoDeEntrega} — $
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
