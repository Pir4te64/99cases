import { Props } from "@/components/Pagos/store/types";

export default function DeliverySummary({
  deliveryResponse,
  selectedOption,
  onSelectOption,
}: Props) {
  return (
    <div className="mb-6 rounded bg-[#EEEEEE] p-4 shadow-lg">
      <h2 className="mb-2 font-favoritExpanded text-xl text-[#000000]">Resumen de Envío</h2>

      <p className="font-favoritExpanded text-[#000000]">
        <strong className="font-favoritExpanded text-[#000000]">Destino:</strong> {deliveryResponse.destino}
      </p>
      <p className="font-favoritExpanded text-[#000000]">
        <strong className="font-favoritExpanded text-[#000000]">Contacto:</strong> {deliveryResponse.datosDeContacto}
      </p>
      <p className="font-favoritExpanded text-[#000000]">
        <strong className="font-favoritExpanded text-[#000000]">Costo de Orden:</strong>{" "}
        ${deliveryResponse.costoOrden.toLocaleString("es-AR", {
          minimumFractionDigits: 2,
        })}
      </p>

      <div className="mt-4">
        <p className="mb-2 font-favoritExpanded text-[#000000]">Opciones de Entrega:</p>
        <ul>
          {deliveryResponse.deliveryOptions.map((opt) => (
            <li key={opt.modoDeEntregaId} className="mb-2 flex items-center font-favoritExpanded text-[#000000]">
              <input
                type="radio"
                id={opt.modoDeEntregaId}
                name="deliveryOption"
                value={opt.modoDeEntrega}
                checked={selectedOption === opt.modoDeEntrega}
                onChange={() => onSelectOption(opt.modoDeEntrega)}
                className="mr-2"
              />
              <label htmlFor={opt.modoDeEntregaId} className="font-favoritExpanded text-[#000000]">
                {opt.modoDeEntrega} — $
                {opt.tarifaConIva.toLocaleString("es-AR", {
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
