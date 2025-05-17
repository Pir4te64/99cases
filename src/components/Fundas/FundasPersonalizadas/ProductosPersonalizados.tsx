// src/components/PersonalizadosID/ProductCardPersonalizadas.tsx
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: string;
  imageSrc: string;
  title: string;
  price: string;            // Ej. "$35 000"
  oldPrice?: string;        // Ej. "$40 000"  (opcional)
  descuento?: number;       // 0.13 → 13 %    (opcional)
  precioDescuento?: number; // 40000          (opcional, usado solo si oldPrice no viene)
  description?: string;
  tipo: string;
  imageFinal: string;
}

const fmtARS = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
});

const ProductCardPersonalizadas: React.FC<ProductCardProps> = ({
  id,
  imageSrc,
  title,
  price,
  oldPrice,
  descuento,
  precioDescuento,
  description,
  tipo,
  imageFinal
}) => {
  const navigate = useNavigate();
  /* ───── Badge de descuento ───── */
  const badge =
    typeof descuento === "number" && descuento > 0
      ? `${Math.round(descuento * 100)}%`
      : undefined;

  /* ───── Precio tachado ───── */
  const crossedPrice =
    oldPrice ??
    (typeof precioDescuento === "number"
      ? fmtARS.format(precioDescuento)
      : undefined);

  /* ───── Navegación al detalle ───── */
  const handleClick = () =>
    navigate(`/personalizadas/${id}`, {
      state: {
        product: {
          id,
          imageSrc,
          title,
          price,
          oldPrice: crossedPrice,
          descuento,
          precioDescuento,
          description,
          tipo,
          imageFinal
        },
      },
    });

  return (
    <div
      onClick={handleClick}
      className="relative flex min-h-[400px] w-full min-w-0 cursor-pointer flex-col items-center justify-start overflow-hidden p-4 text-center sm:w-72"
    >
      {/* Badge */}
      <div className="mb-2 flex h-8 items-center justify-center">
        {badge ? (
          <div className="rounded-md bg-gray-300 px-2 py-1 font-favoritExpandedBook font-bold text-red-600">
            {badge}
          </div>
        ) : (
          <div className="w-20" />
        )}
      </div>

      {/* Imagen */}
      <picture className="w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="mx-auto my-4 h-auto w-full object-contain transition-transform duration-300 ease-in-out hover:scale-105"
          onError={(e) => console.error("No se cargó:", e.nativeEvent)}
        />
      </picture>

      {/* Título */}
      <h3 className="/* más pequeño en mobile */ tamaño base sm+ grande md+ para que haga wrap y no provoque scroll mb-2 whitespace-normal font-favoritExpandedBook text-sm font-bold tracking-wide text-gray-800 sm:text-base md:text-lg">
        {title}
      </h3>

      {/* Precios */}
      <div className="flex items-baseline justify-center gap-2">
        <span className="text-md font-favoritExpandedBook font-bold text-black sm:text-xl">
          {price}
        </span>
        {crossedPrice && (
          <span className="sm:text-md font-favoritExpandedBook text-sm font-bold text-gray-400 line-through">
            {crossedPrice}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCardPersonalizadas;
