// FundasPersonalizadasProductos.tsx
import { useEffect, useMemo, useState } from "react";
import { fetchAndAdaptProducts, Product } from "../Fundas/FundasPredeterminadas/fundasGet";
import ProductCardPersonalizadas from "../Fundas/FundasPersonalizadas/ProductosPersonalizados";

const FundasPersonalizadasProductos: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchAndAdaptProducts().then(setProducts);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tiposPersonalizados = [
    "PERSONALIZADO",
    "PERSONALIZADO_CON_IMAGEN",
    "PERSONALIZADO_CON_CARACTERES",
  ];

  const filteredProducts = useMemo(
    () => products.filter((p) => tiposPersonalizados.includes(p.tipo)),
    [products, tiposPersonalizados]
  );
  console.log(filteredProducts);
  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center bg-white px-4 py-8">
      <div className="grid w-full max-w-7xl grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCardPersonalizadas
            key={product.id}
            id={product.id.toString()}
            imageSrc={product.imageSrc}
            title={product.title}
            price={product.price}          // número
            descuento={product.descuento}   // 0.2 → 20 %
            oldPrice={product.oldPrice}    // opcional
            description={product.description}
            precioDescuento={product.precioDescuento}
            tipo={product.tipo}
          />

        ))}
      </div>
    </div>
  );
};

export default FundasPersonalizadasProductos;
