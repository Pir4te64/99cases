// ProductDetails.jsx

const ProductDetails = () => {
  return (
    <div className="px-4 sm:px-6 md:px-8">
      <details className="my-3 sm:my-4" open>
        <summary className="mb-2 cursor-pointer text-base sm:text-lg md:text-xl font-bold">
          Descripción del producto
        </summary>
        <p className="mb-2 text-sm sm:text-base">
          Nuestras fundas combinan diseño único y materiales premium:
        </p>
        <ul className="mb-2 list-inside list-disc text-sm sm:text-base space-y-1">
          <li>Parte trasera de aluminio.</li>
          <li>Bordes de silicona reforzada.</li>
          <li>Agarre antideslizante.</li>
          <li>No se rayan</li>
          <li>No se despintan</li>
        </ul>
      </details>

      <details className="my-3 sm:my-4" open>
        <summary className="mb-2 cursor-pointer text-base sm:text-lg md:text-xl font-bold">
          Información del envío
        </summary>
        <div className="space-y-2 text-sm sm:text-base">
          <p>🏭 Tiempo de producción: 1-3 días hábiles</p>
          <p>
            ✈️ Tiempo de envío: Nuestros productos se fabrican y envían desde
            nuestra oficina en Santa Fe (Arg) y la entrega demora entre 1 y 5
            días.
          </p>
        </div>
      </details>
    </div>
  );
};

export default ProductDetails;
