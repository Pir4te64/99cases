import React from "react";

interface ProductCardProps {
  discount?: string;
  imageSrc: string;
  title: string;
  price: string;
  oldPrice?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  discount,
  imageSrc,
  title,
  price,
  oldPrice,
}) => {
  return (
    <div className="relative  text-center flex flex-col items-center justify-start w-full sm:w-72 p-4 min-h-[400px]">
      <div className="h-8 flex justify-center items-center mb-2">
        {discount ? (
          <div className="px-2 py-1 bg-gray-300 text-red-600 font-favoritMono font-bold rounded-md">
            {discount}
          </div>
        ) : (
          <div className="w-20" />
        )}
      </div>
      <picture>
        <img
          loading="lazy"
          src={imageSrc}
          alt={title}
          className="mx-auto my-4 h-auto object-contain"
        />
      </picture>
      <h3 className="text-gray-800 text-base sm:text-lg font-bold mb-2 font-favoritMono">
        {title}
      </h3>
      <div className="flex justify-center items-baseline gap-2">
        <span className="text-lg sm:text-xl font-bold text-black">{price}</span>
        {oldPrice && (
          <span className="text-sm sm:text-md line-through font-bold text-gray-400">
            {oldPrice}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
