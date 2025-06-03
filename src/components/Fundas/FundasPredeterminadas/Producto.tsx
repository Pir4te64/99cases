import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: string;
  descuento: string;
  imageSrc: string;
  title: string;
  price: string;
  description: string;
  imageFinal: string;
  oldPrice: string;
  tipo: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  descuento,
  imageSrc,
  title,
  price,
  imageFinal,
  oldPrice,
  tipo,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    const productData = { id, descuento, imageSrc, title, price, imageFinal, oldPrice, tipo };
    navigate(`/predeterminadas/${id}`, { state: { product: productData } });
  };

  return (
    <div
      onClick={handleClick}
      className="relative flex min-h-[400px] w-full cursor-pointer flex-col items-center justify-start p-4 text-center sm:w-72"
    >
      <div className="mb-2 flex h-8 items-center justify-center">
        {descuento ? (
          <div className="rounded-md bg-gray-300 px-2 py-1 font-favoritMono font-bold text-red-600">
            -{descuento} OFF
          </div>
        ) : (
          <div className="w-20" />
        )}
      </div>
      <picture>
        <img
          loading="lazy"
          src={imageSrc}
          onContextMenu={e => e.preventDefault()}
          alt={title}
          className="mx-auto my-4 h-auto object-contain transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </picture>
      <h3 className="mb-1 whitespace-normal font-favoritExpandedBook text-xs font-bold tracking-wide text-gray-800 sm:mb-2 sm:text-sm">
        {title}
      </h3>
      <div className="flex flex-col items-center justify-center gap-1">
        <span className="font-favoritExpandedBook text-sm font-bold text-black sm:text-sm">
          {Math.round(Number(price.replace(/[^0-9.-]+/g, ""))).toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          })}
        </span>
        {descuento && (
          <span className="font-favoritExpandedBook text-sm font-bold text-gray-400 line-through sm:text-sm">
            {oldPrice}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
