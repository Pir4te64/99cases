// src/components/PersonalizadosID/ProductCardPersonalizadas.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ───── Tipado de props ───── */
interface ProductCardProps {
  id: string;
  imageSrc: string;                 // Imagen original que siempre existe
  displayImage?: string;            // Imagen sustitutiva (opcional)
  title: string;
  price: string;                    // Ej. "$30 000"
  oldPrice?: string;                // Precio tachado (opcional)
  descuento?: number;               // Ej. 0.15 → 15 %
  precioDescuento?: number;         // Si oldPrice no viene
  description?: string;
  tipo: string;
  imageFinal: string;
}

/* ───── Formateador ARS ───── */
const fmtARS = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const ProductCardPersonalizadas: React.FC<ProductCardProps> = ({
  id,
  imageSrc,
  displayImage,
  title,
  price,
  oldPrice,
  descuento,
  precioDescuento,
  description,
  tipo,
  imageFinal,
}) => {
  const navigate = useNavigate();

  /* ───── Fallback de imagen ───── */
  const [srcActual, setSrcActual] = useState(displayImage || imageSrc);

  const handleImgError = () => {
    if (srcActual !== imageSrc) {
      // Evita bucle infinito si la imagen original también falla
      setSrcActual(imageSrc);
    }
  };

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
          imageFinal,
        },
      },
    });

  /* ───── Render ───── */
  return (
    <div
      onClick={handleClick}
      className="relative flex min-h-[400px] w-full min-w-0 cursor-pointer flex-col items-center justify-start overflow-hidden p-2 text-center sm:w-72 sm:p-4"
    >
      {/* Badge */}
      <div className="mb-1 flex h-6 items-center justify-center sm:mb-2 sm:h-8">
        {badge ? (
          <div className="rounded-md bg-gray-300 px-2 py-1 font-favoritExpandedBook font-bold text-red-600">
            -{badge} OFF
          </div>
        ) : (
          <div className="w-16 sm:w-20" />
        )}
      </div>

      {/* Imagen */}
      <picture className="w-full overflow-hidden">
        <img
          src={srcActual}
          alt={title}
          className="mx-auto my-4 h-auto w-[220px] object-contain select-none pointer-events-none transition-transform duration-300 ease-in-out hover:scale-105 sm:w-[280px]"
          onError={handleImgError}
          onContextMenu={(e) => e.preventDefault()}
          loading="lazy"
          draggable="false"
          onDragStart={(e) => e.preventDefault()}
          onDrop={(e) => e.preventDefault()}
          onMouseDown={(e) => e.preventDefault()}
          style={{ 
            userSelect: 'none', 
            WebkitUserSelect: 'none', 
            WebkitTouchCallout: 'none',
            KhtmlUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none'
          }}
        />
      </picture>

      {/* Título */}
      <h3 className="mb-1 whitespace-normal font-favoritExpandedBook text-sm font-bold tracking-wide text-gray-800 sm:mb-2">
        {title}
      </h3>

      {/* Precios */}
      <div className="flex flex-col items-center justify-center gap-0.5 sm:gap-1">
        <span className="sm:text-md font-favoritExpandedBook text-sm font-bold text-black">
          {Math.round(Number(price.replace(/[^0-9.-]+/g, ""))).toLocaleString(
            "es-AR",
            { minimumFractionDigits: 0, maximumFractionDigits: 0, style: "currency", currency: "ARS" }
          )}
        </span>
        {crossedPrice && (
          <span className="font-favoritExpandedBook text-sm font-bold text-gray-400 line-through sm:text-sm">
            {Math.round(
              Number(crossedPrice.replace(/[^0-9.-]+/g, ""))
            ).toLocaleString("es-AR", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
              style: "currency",
              currency: "ARS",
            })}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCardPersonalizadas;
