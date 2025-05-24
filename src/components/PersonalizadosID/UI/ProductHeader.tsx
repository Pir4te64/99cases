// ProductInfo.jsx

const ProductHeader = ({ product }: { product: any }) => {
  return (
    <div className="mt-20 md:mt-0 md:px-0">
      <h1 className="mb-1.5 w-full text-left font-favoritExpandedBook text-base font-bold sm:text-xl md:mb-2 md:text-4xl">
        {product.title}
      </h1>
      <p className="mb-1.5 text-left font-favoritExpandedBook text-sm font-semibold text-gray-900 sm:text-lg md:mb-2 md:text-xl">
        {product.price}{" "}
        {product.oldPrice && (
          <span className="ml-1.5 font-favoritExpandedBook text-xs text-gray-500 line-through sm:text-sm md:ml-2 md:text-base">
            {product.oldPrice}
          </span>
        )}
      </p>
      <p className="mb-1.5 text-left font-favoritExpandedBook text-xs font-bold uppercase text-red-600 sm:text-sm md:mb-2 md:text-lg">
        3 VENDIDOS EN LAS ÚLTIMAS HORAS
      </p>
    </div>
  );
};

export default ProductHeader;
