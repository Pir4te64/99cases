// ProductDetails.jsx

const ProductDetails = () => {
  return (
    <div className="sm:px-6 md:px-8">
      <details className="my-3 sm:my-4" open>
        <summary className="mb-2 cursor-pointer font-favoritExpanded text-base font-bold sm:text-lg md:text-xl">
          Descripción del producto
        </summary>
        <p className="mb-2 font-favoritExpanded text-sm sm:text-base">
          Nuestras fundas combinan diseño único y materiales premium:
        </p>
        <ul className="mb-2 list-inside list-none space-y-1 font-favoritExpanded text-sm sm:text-base">
          <li className="before:mr-2 before:content-['-']">Parte trasera de aluminio.</li>
          <li className="before:mr-2 before:content-['-']">Bordes de silicona reforzada.</li>
          <li className="before:mr-2 before:content-['-']">Agarre antideslizante.</li>
          <li className="before:mr-2 before:content-['-']">No se rayan</li>
          <li className="before:mr-2 before:content-['-']">No se despintan</li>
        </ul>
      </details>

      <details className="my-3 sm:my-4" open>
        <summary className="mb-2 cursor-pointer font-favoritExpanded text-base font-bold sm:text-lg md:text-xl">
          Información del envío
        </summary>
        <div className="space-y-2 font-favoritExpanded text-sm sm:text-base">
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
