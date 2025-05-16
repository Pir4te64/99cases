// FundasPersonalizadasProductos.tsx
import { useEffect, useState } from "react";
import ProductCardPersonalizadas from "@/components/Fundas/FundasPersonalizadas/ProductosPersonalizados";
import { fetchAndAdaptProducts, Product } from "@/components/Fundas/FundasPredeterminadas/fundasGet";
interface ProductsPersonalizadasVerTodosProps {
  visibleTitle: boolean;
}
const FundasPersonalizadasProductos: React.FC<ProductsPersonalizadasVerTodosProps> = ({ visibleTitle }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchAndAdaptProducts().then(setProducts);
  }, []);

  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center bg-white px-4 py-8">
      <div className="grid w-full max-w-7xl grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCardPersonalizadas
            key={product.id}
            id={product.id.toString()}
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

export default FundasPersonalizadasProductos;
