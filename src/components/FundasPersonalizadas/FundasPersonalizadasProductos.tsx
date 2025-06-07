// src/components/FundasPersonalizadas/FundasPersonalizadasProductos.tsx
import { useEffect, useMemo, useState } from "react";
import {
  fetchAndAdaptProducts,
  Product,
} from "@/components/Fundas/FundasPredeterminadas/fundasGet";
import ProductCardPersonalizadas from "@/components/Fundas/FundasPersonalizadas/ProductosPersonalizados";
import { catalogMap } from "@/utils/index";     // NUEVO

const tiposPersonalizados = [
  "PERSONALIZADO",
  "PERSONALIZADO_CON_IMAGEN",
  "PERSONALIZADO_CON_CARACTERES",
] as const;

const FundasPersonalizadasProductos: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchAndAdaptProducts().then(setProducts).catch(console.error);
  }, []);

  const filteredProducts = useMemo(
    () => products.filter((p) => tiposPersonalizados.includes(p.tipo as any)),
    [products]
  );

  return (
    <div className="overflow-x-hidden">
      <div className="mx-auto flex w-full flex-col items-center justify-center bg-white px-4 py-8">
        <div className="w-full max-w-7xl overflow-x-hidden">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
            {filteredProducts.map((product) => {
              // --------- Sustitución de imagen ---------
              const key = product.title
                .trim()
                .toUpperCase()
                .normalize("NFD")
                .replace(/\p{Diacritic}/gu, "");

              const displayImage = catalogMap[key] ?? product.imageSrc;
              // ------------------------------------------

              return (
                <ProductCardPersonalizadas
                  key={product.id}
                  /* obligatorio ↓  */
                  imageSrc={product.imageSrc}
                  /* se mostrará ↓  */
                  displayImage={displayImage}
                  /* resto de props */
                  imageFinal={product.imageFinal}
                  id={product.id.toString()}
                  title={product.title}
                  price={product.price}
                  descuento={product.descuento}
                  oldPrice={product.oldPrice}
                  description={product.description}
                  precioDescuento={product.precioDescuento}
                  tipo={product.tipo}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundasPersonalizadasProductos;
