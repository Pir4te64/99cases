import { DeliveryResponse } from "@/components/Pagos/useDeliveryStore";

interface DeliverySummaryProps {
  deliveryResponse: DeliveryResponse;
}

const DeliverySummary: React.FC<DeliverySummaryProps> = ({
  deliveryResponse,
}) => {
  return (
    <div className='border rounded p-4 mb-6 text-black'>
      <h2 className='text-xl font-bold mb-2'>Resumen de Envío</h2>
      {deliveryResponse.origen && (
        <div className='mt-2'>
          <p className='font-favoritExpandedBook'>
            <strong>Origen:</strong>
          </p>
          <p className='font-favoritExpandedBook'>
            {deliveryResponse.origen.calle} {deliveryResponse.origen.numero},{" "}
            {deliveryResponse.origen.localidad} (CP:{" "}
            {deliveryResponse.origen.codigoPostal}) -{" "}
            {deliveryResponse.origen.pais}
          </p>
        </div>
      )}
      {deliveryResponse.destino && (
        <div className='mt-2'>
          <p className='font-favoritExpandedBook'>
            <strong>Destino:</strong>
          </p>
          <p className='font-favoritExpandedBook'>
            {deliveryResponse.destino.calle} {deliveryResponse.destino.numero},{" "}
            {deliveryResponse.destino.localidad} (CP:{" "}
            {deliveryResponse.destino.codigoPostal}) -{" "}
          </p>
        </div>
      )}
      {deliveryResponse.remitente && (
        <div className='mt-2'>
          <p className='font-favoritExpandedBook'>
            <strong>Remitente:</strong>
          </p>
          <p className='font-favoritExpandedBook'>
            {deliveryResponse.remitente.nombre} (
            {deliveryResponse.remitente.tipoDocumento}:{" "}
            {deliveryResponse.remitente.numeroDocumento})
          </p>
        </div>
      )}
      {deliveryResponse.destinatario && (
        <div className='mt-2'>
          <p className='font-favoritExpandedBook'>
            <strong>Destinatario:</strong>
          </p>
          <p className='font-favoritExpandedBook'>
            {deliveryResponse.destinatario.nombre}
          </p>
        </div>
      )}
      {deliveryResponse.fechaEnvio && (
        <p className='mt-2 font-favoritExpandedBook'>
          <strong>Fecha de Envío:</strong>{" "}
          {new Date(deliveryResponse.fechaEnvio).toLocaleString()}
        </p>
      )}
    </div>
  );
};

export default DeliverySummary;
