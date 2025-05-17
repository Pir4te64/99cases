import { Props } from "@/components/Pagos/store/types";

export default function DeliverySummary({
  deliveryResponse,
  selectedOption,
  onSelectOption,
}: Props) {
  return (
    <div className="mb-6 rounded bg-black p-4 shadow-lg">
      <h2 className="mb-2 text-xl font-semibold">Resumen de Envío</h2>

      <p>
        <strong>Destino:</strong> {deliveryResponse.destino}
      </p>
      <p>
        <strong>Contacto:</strong> {deliveryResponse.datosDeContacto}
      </p>
      <p>
        <strong>Costo de Orden:</strong>{" "}
        ${deliveryResponse.costoOrden.toLocaleString("es-AR", {
          minimumFractionDigits: 2,
        })}
      </p>

      <div className="mt-4">
        <p className="mb-2 font-medium">Opciones de Entrega:</p>
        <ul>
          {deliveryResponse.deliveryOptions.map((opt) => (
            <li key={opt.modoDeEntregaId} className="mb-2 flex items-center">
              <input
                type="radio"
                id={opt.modoDeEntregaId}
                name="deliveryOption"
                value={opt.modoDeEntrega}
                checked={selectedOption === opt.modoDeEntrega}
                onChange={() => onSelectOption(opt.modoDeEntrega)}
                className="mr-2"
              />
              <label htmlFor={opt.modoDeEntregaId}>
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
