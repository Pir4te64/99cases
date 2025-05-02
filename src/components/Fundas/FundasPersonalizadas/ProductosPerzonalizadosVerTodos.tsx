// FundasPersonalizadasProductos.tsx
import { useEffect, useState } from "react";
import ProductCardPersonalizadas from "./ProductosPersonalizados";
import { fetchAndAdaptProducts, Product } from "../FundasPredeterminadas/fundasGet";
interface ProductsPersonalizadasVerTodosProps {
  visibleTitle: boolean;
}
const FundasPersonalizadasProductos: React.FC<ProductsPersonalizadasVerTodosProps> = ({ visibleTitle }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchAndAdaptProducts().then(setProducts);
  }, []);

  return (
    <div className="mx-auto w-full flex flex-col items-center justify-center bg-white py-8 px-4">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {products.map((product) => (
          <ProductCardPersonalizadas
            key={product.id}
            id={product.id.toString()}
            discount={`${Math.round(product.descuento * 100)}%`}
            imageSrc={product.imageSrc}
            title={product.title}
            price={product.price}
            oldPrice={product.oldPrice}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
};

export default FundasPersonalizadasProductos;
