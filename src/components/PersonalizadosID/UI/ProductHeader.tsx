// ProductInfo.jsx

const ProductHeader = ({ product }: { product: any }) => {
  return (
    <div className="mt-20 px-2 md:mt-0 md:px-0">
      <h1 className='mb-1.5 w-full font-favoritExpandedBook text-xl font-bold sm:text-2xl md:mb-2 md:text-4xl'>
        {product.title}
      </h1>
      <p className='mb-1.5 font-favoritExpandedBook text-lg font-semibold text-gray-900 sm:text-xl md:mb-2'>
        {product.price}{" "}
        {product.oldPrice && (
          <span className='ml-1.5 font-favoritExpandedBook text-sm text-gray-500 line-through sm:text-base md:ml-2'>
            {product.oldPrice}
          </span>
        )}
      </p>
      <p className='mb-1.5 font-favoritExpandedBook text-sm font-bold uppercase text-red-600 sm:text-base md:mb-2 md:text-lg'>
        3 VENDIDOS EN LAS ÚLTIMAS HORAS
      </p>
    </div>
  );
};

export default ProductHeader;
