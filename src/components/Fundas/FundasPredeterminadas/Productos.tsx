import React, { useState } from "react";
import ProductCard from "./Producto";
import { products } from "./fundasGet";

interface ProductsProps {
  visibleTitle?: boolean; // Prop opcional
}

const Products: React.FC<ProductsProps> = ({ visibleTitle = true }) => {
  const [visibleCount, setVisibleCount] = useState(4);

  const handleLoadMore = () => {
    setVisibleCount(products.length);
  };

  const displayedProducts = products.slice(0, visibleCount);

  return (
    <div className='bg-white mx-auto py-8 px-4'>
      {/* Renderizamos el título sólo si visibleTitle es true */}
      {visibleTitle && (
        <h2 className='text-2xl sm:text-3xl md:text-4xl font-favorit uppercase font-bold text-black text-center my-4'>
          Productos Destacados
        </h2>
      )}

      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 container mx-auto'>
        {displayedProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id.toString()}
            discount={product.discount}
            imageSrc={product.imageSrc}
            title={product.title}
            price={product.price}
            oldPrice={product.oldPrice}
            cantidadesVendidos={product.cantidadesVendidos}
            description={product.description}
          />
        ))}
      </div>

      {visibleCount < products.length && (
        <div className='flex justify-center mt-8'>
          <button
            className='border border-black text-black px-6 py-2 rounded hover:bg-black hover:text-white font-bold font-favoritMono transition-colors'
            onClick={handleLoadMore}>
            Ver Todos
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
