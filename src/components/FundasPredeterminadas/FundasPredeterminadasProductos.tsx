// FundasPredeterminadasProductos.tsx
import { useEffect, useState } from "react";
import { fetchAndAdaptProducts, Product } from "../Fundas/FundasPredeterminadas/fundasGet";
import ProductCard from "../Fundas/FundasPredeterminadas/Producto";

const FundasPredeterminadasProductos = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchAndAdaptProducts().then(setProducts);
  }, []);

  return (
    <div className="bg-white flex flex-col items-center justify-center py-8 px-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-favoritMono tracking-wide uppercase font-bold text-black text-center mb-6">
        Productos Destacados
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id.toString()}
            descuento={`${Math.round(product.descuento * 100)}%`}
            imageSrc={product.imageSrc}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
};

export default FundasPredeterminadasProductos;
