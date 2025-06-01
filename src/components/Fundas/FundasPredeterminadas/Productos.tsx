// Productos.tsx
import { useEffect, useState } from "react";
import ProductCard from "@/components/Fundas/FundasPredeterminadas/Producto";
import { fetchAndAdaptProducts, Product } from "@/components/Fundas/FundasPredeterminadas/fundasGet";

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
  const buttonText = isFinalStep ? "Ver todos" : "Ver más";

  return (
    <div className="mx-auto bg-white px-4 py-8">
      {visibleTitle && (
        <h2 className="my-4 text-center font-favoritExpanded text-xl font-bold uppercase text-black sm:text-3xl md:text-4xl">
          Productos Destacados
        </h2>
      )}

      <div className="container mx-auto grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {displayedProducts.map((product) => (
          <ProductCard
            tipo={product.tipo}
            imageFinal={product.imageFinal}
            key={product.id}
            id={product.id.toString()}
            descuento={`${Math.round(product.descuento * 100)}%`}
            imageSrc={product.imageSrc}
            title={product.title}
            price={product.price}
            description={product.description}
            oldPrice={product.oldPrice}
          />
        ))}
      </div>

      {visibleCount < allProducts.length && (
        <div className="mt-8 flex justify-center">
          <button
            className="rounded border border-black px-6 py-2 font-favoritExpanded font-bold text-black transition-colors hover:bg-black hover:text-white"
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
