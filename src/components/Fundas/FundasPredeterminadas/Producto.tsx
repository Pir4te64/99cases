import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: string;
  descuento: string; // ejemplo: "14%"
  imageSrc: string;
  title: string;
  price: string; // ejemplo: "$1.200"
  description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  descuento,
  imageSrc,
  title,
  price,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const productData = { id, descuento, imageSrc, title, price };
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
      className="cursor-pointer relative text-center flex flex-col items-center justify-start w-full sm:w-72 p-4 min-h-[400px]"
    >
      <div className="h-8 flex justify-center items-center mb-2">
        {descuento ? (
          <div className="px-2 py-1 bg-gray-300 text-red-600 font-favoritMono font-bold rounded-md">
            {descuento}
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
          className="mx-auto my-4 h-auto object-contain hover:scale-105 transition-transform duration-300 ease-in-out"
        />
      </picture>
      <h3 className="text-gray-800 text-base sm:text-lg font-bold mb-2 font-favoritExpandedBook">
        {title}
      </h3>
      <div className="flex justify-center items-baseline gap-2">
        <span className="text-lg sm:text-xl font-bold text-black font-favoritExpandedBook">
          {price}
        </span>
        {descuento && (
          <span className="text-sm sm:text-md font-favoritExpandedBook line-through font-bold text-gray-400">
            {formattedOldPrice}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
