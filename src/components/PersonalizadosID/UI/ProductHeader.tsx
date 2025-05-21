// ProductInfo.jsx

const ProductHeader = ({ product }: { product: any }) => {
  return (
    <div>
      <h1 className='mb-2 w-full font-favoritExpandedBook text-2xl font-bold md:text-4xl'>
        {product.title}
      </h1>
      <p className='mb-2 font-favoritExpandedBook text-xl font-semibold text-gray-900'>
        {product.price}{" "}
        {product.oldPrice && (
          <span className='ml-2 font-favoritExpandedBook text-gray-500 line-through'>
            {product.oldPrice}
          </span>
        )}
      </p>
      <p className='mb-2 font-favoritExpandedBook font-bold uppercase text-red-600'>
        3 VENDIDOS EN LAS ÚLTIMAS HORAS
      </p>
    </div>
  );
};

export default ProductHeader;
