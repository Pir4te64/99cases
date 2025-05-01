// Productos.tsx
import { useEffect, useState } from "react";
import ProductCard from "./Producto";
import { fetchAndAdaptProducts, Product } from "./fundasGet";

interface ProductsProps {
  visibleTitle?: boolean;
}

const Products: React.FC<ProductsProps> = ({ visibleTitle = true }) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const STEP = 4;

  useEffect(() => {
    fetchAndAdaptProducts().then(setAllProducts);
  }, []);

  const displayedProducts = allProducts.slice(0, visibleCount);

  const handleLoadMore = () => {
    // Calcula cuántos mostrar a continuación
    const nextCount = Math.min(visibleCount + STEP, allProducts.length);
    setVisibleCount(nextCount);
  };

  // Decide el texto del botón según cuántos falten
  const isFinalStep = visibleCount + STEP >= allProducts.length;
  const buttonText = isFinalStep ? "Mostrar todos" : "Mostrar más";

  return (
    <div className="bg-white mx-auto py-8 px-4">
      {visibleTitle && (
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-favorit uppercase font-bold text-black text-center my-4">
          Productos Destacados
        </h2>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 container mx-auto">
        {displayedProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id.toString()}
            descuento={`${Math.round(product.descuento * 100)}%`}
            imageSrc={product.imageSrc}
            title={product.title}
            price={product.price}
            oldPrice={product.oldPrice}
            description={product.description}
          />
        ))}
      </div>

      {visibleCount < allProducts.length && (
        <div className="flex justify-center mt-8">
          <button
            className="border border-black text-black px-6 py-2 rounded hover:bg-black hover:text-white font-bold font-favoritMono transition-colors"
            onClick={handleLoadMore}
          >
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
