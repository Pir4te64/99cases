// ProductDetails.jsx

const ProductDetails = () => {
  return (
    <div>
      <details className="mb-4">
        <summary className="cursor-pointer font-bold mb-2">
          Descripción del producto
        </summary>
        <p className="mb-2">
          Nuestras fundas combinan diseño único y materiales premium:
        </p>
        <ul className="mb-2 list-disc list-inside">
          <li>Parte trasera de aluminio.</li>
          <li>Bordes de silicona reforzada.</li>
          <li>Agarre antideslizante.</li>
          <li>No se rayan</li>
          <li>No se despintan</li>
        </ul>
      </details>

      <details className="mb-4">
        <summary className="cursor-pointer font-bold mb-2">
          Información del envío
        </summary>
        <p className="mb-2">🏭 Tiempo de producción: 1-3 días hábiles</p>
        <p className="mb-2">
          ✈️ Tiempo de envío: Nuestros productos se fabrican y envían desde
          nuestra oficina en Santa Fe (Arg) y la entrega demora entre 1 y 5
          días.
        </p>
      </details>
    </div>
  );
};

export default ProductDetails;
