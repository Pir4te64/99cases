// ProductInfo.jsx

const ProductHeader = ({ product }: { product: any }) => {
  return (
    <div>
      <h1 className="text-4xl md:text-7xl font-bold mb-2 w-full">
        {product.title}
      </h1>
      <p className="text-lg text-red-600 font-semibold mb-2">
        {product.price}{" "}
        {product.oldPrice && (
          <span className="line-through text-gray-500 ml-2">
            {product.oldPrice}
          </span>
        )}
      </p>
      <p className="text-red-600 mb-2">
        {product.cantidadesVendidos} VENDIDOS EN LAS ÚLTIMAS HORAS
      </p>
    </div>
  );
};

export default ProductHeader;
