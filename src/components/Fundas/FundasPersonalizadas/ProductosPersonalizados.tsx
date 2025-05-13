import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: string;
  discount?: string;
  imageSrc: string;
  title: string;
  price: string;
  oldPrice?: string;
  description: string;
}

const ProductCardPersonalizadas: React.FC<ProductCardProps> = ({
  id,
  discount,
  imageSrc,
  title,
  price,
  oldPrice,
}) => {
  const navigate = useNavigate();
  console.log(imageSrc);

  const handleClick = () => {
    const productData = {
      id,
      discount,
      imageSrc,
      title,
      price,
      oldPrice,
    };
    navigate(`/personalizadas/${id}`, { state: { product: productData } });
  };

  return (
    <div
      onClick={handleClick}
      className="relative flex min-h-[400px] w-full cursor-pointer flex-col items-center justify-start p-4 text-center sm:w-72"
    >
      <div className="mb-2 flex h-8 items-center justify-center">
        {discount ? (
          <div className="rounded-md bg-gray-300 px-2 py-1 font-favoritExpandedBook font-bold text-red-600">
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
          className="mx-auto my-4 h-auto object-contain transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </picture>
      <h3 className="mb-2 font-favoritExpandedBook text-base font-bold tracking-wide text-gray-800 sm:text-lg">
        {title}
      </h3>
      <div className="flex items-baseline justify-center gap-2">
        <span className="font-favoritExpandedBook text-lg font-bold text-black sm:text-xl">
          {price}
        </span>
        {oldPrice && (
          <span className="sm:text-md font-favoritExpandedBook text-sm font-bold text-gray-400 line-through">
            {oldPrice}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCardPersonalizadas;
