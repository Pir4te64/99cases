import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: string;
  descuento: string; // ejemplo: "14%"
  imageSrc: string;
  title: string;
  price: string; // ejemplo: "$1.200"
  description: string;
  imageFinal: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  descuento,
  imageSrc,
  title,
  price,
  imageFinal
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    const productData = { id, descuento, imageSrc, title, price, imageFinal };
    navigate(`/predeterminadas/${id}`, { state: { product: productData } });
  };

  // Convertir precio y descuento
  const numericPrice = Number(price.replace(/[^0-9.-]+/g, ""));
  const discountPercent = Number(descuento.replace("%", ""));
  const oldPriceValue = numericPrice / (1 - discountPercent / 100);

  const formattedOldPrice = `$${oldPriceValue.toLocaleString("es-AR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;

  return (
    <div
      onClick={handleClick}
      className="relative flex min-h-[400px] w-full cursor-pointer flex-col items-center justify-start p-4 text-center sm:w-72"
    >
      <div className="mb-2 flex h-8 items-center justify-center">
        {descuento ? (
          <div className="rounded-md bg-gray-300 px-2 py-1 font-favoritMono font-bold text-red-600">
            {descuento} OFF
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
      <h3 className="mb-2 font-favoritExpandedBook text-base font-bold text-gray-800 sm:text-lg">
        {title}
      </h3>
      <div className="flex items-baseline justify-center gap-2">
        <span className="font-favoritExpandedBook text-lg font-bold text-black sm:text-xl">
          {price}
        </span>
        {descuento && (
          <span className="sm:text-md font-favoritExpandedBook text-sm font-bold text-gray-400 line-through">
            {formattedOldPrice}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
