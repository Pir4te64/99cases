// FundasPredeterminadasProductos.tsx
import { useEffect, useState } from "react";
import { fetchAndAdaptProducts, Product } from "@/components/Fundas/FundasPredeterminadas/fundasGet";
import ProductCard from "@/components/Fundas/FundasPredeterminadas/Producto";

const FundasPredeterminadasProductos = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchAndAdaptProducts().then(setProducts);
  }, []);

  // Filtramos aquí
  const predeterminados = products.filter(p => p.tipo === "PREDETERMINADO");

  return (
    <div className="flex flex-col items-center justify-center bg-white px-4 py-8">
      <h2 className="text-md mb-6 text-center font-favoritExpanded font-bold uppercase text-black sm:text-3xl md:text-4xl">
        Productos Destacados
      </h2>

      <div className="grid w-full max-w-7xl grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {predeterminados.map((product) => (
          <ProductCard
            imageFinal={product.imageFinal}
            key={product.id}
            id={product.id.toString()}
            descuento={`${Math.round(product.descuento * 100)}%`}
            imageSrc={product.imageSrc}
            title={product.title}
            price={product.price}
            oldPrice={product.oldPrice}
            description={product.description}
            tipo={product.tipo}
          />
        ))}
      </div>
    </div>
  );
};

export default FundasPredeterminadasProductos;
