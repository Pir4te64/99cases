// src/components/FundasPersonalizadas/FundasPersonalizadasProductos.tsx
import { useEffect, useMemo, useState } from "react";
import { fetchAndAdaptProducts, Product } from "../Fundas/FundasPredeterminadas/fundasGet";
import ProductCardPersonalizadas from "../Fundas/FundasPersonalizadas/ProductosPersonalizados";

const FundasPersonalizadasProductos: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchAndAdaptProducts().then(setProducts);
  }, []);

  const tiposPersonalizados = useMemo(
    () => [
      "PERSONALIZADO",
      "PERSONALIZADO_CON_IMAGEN",
      "PERSONALIZADO_CON_CARACTERES",
    ],
    []
  );

  const filteredProducts = useMemo(
    () => products.filter((p) => tiposPersonalizados.includes(p.tipo)),
    [products, tiposPersonalizados]
  );

  return (
    <div className="overflow-x-hidden">
      <div className="mx-auto flex w-full flex-col items-center justify-center bg-white px-4 py-8">
        <div className="w-full max-w-7xl overflow-x-hidden">
          <div className="grid min-w-0 grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="min-w-0">
                <ProductCardPersonalizadas
                  id={product.id.toString()}
                  imageSrc={product.imageSrc}
                  title={product.title}
                  price={product.price}
                  descuento={product.descuento}
                  oldPrice={product.oldPrice}
                  description={product.description}
                  precioDescuento={product.precioDescuento}
                  tipo={product.tipo}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundasPersonalizadasProductos;
