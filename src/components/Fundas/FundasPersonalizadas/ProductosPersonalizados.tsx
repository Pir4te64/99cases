import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: string;
  discount?: string;
  imageSrc: string;
  title: string;
  price: string;
  oldPrice?: string;
  cantidadesVendidos: number;
  description: string;
}

const ProductCardPersonalizadas: React.FC<ProductCardProps> = ({
  id,
  discount,
  imageSrc,
  title,
  price,
  oldPrice,
  cantidadesVendidos,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const productData = {
      id,
      discount,
      imageSrc,
      title,
      price,
      oldPrice,
      cantidadesVendidos,
    };
    navigate(`/personalizadas/${id}`, { state: { product: productData } });
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer relative text-center flex flex-col items-center justify-start w-full sm:w-72 p-4 min-h-[400px]"
    >
      <div className="h-8 flex justify-center items-center mb-2">
        {discount ? (
          <div className="px-2 py-1 bg-gray-300 text-red-600  font-bold rounded-md font-favoritExpandedBook">
            {discount}
          </div>
        ) : (
          <div className="w-20" />
        )}
      </div>
      <picture>
        <img
          loading="lazy"
          onContextMenu={e => e.preventDefault()}
          src={imageSrc}
          alt={title}
          className="mx-auto my-4 h-auto object-contain hover:scale-105 transition-transform duration-300 ease-in-out"
        />
      </picture>
      <h3 className="text-gray-800 text-base sm:text-lg font-bold mb-2 font-favoritExpandedBook tracking-wide">
        {title}
      </h3>
      <div className="flex justify-center items-baseline gap-2">
        <span className="text-lg sm:text-xl font-bold text-black font-favoritExpandedBook">
          {price}
        </span>
        {oldPrice && (
          <span className="text-sm sm:text-md line-through font-bold text-gray-400 font-favoritExpandedBook">
            {oldPrice}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCardPersonalizadas;
