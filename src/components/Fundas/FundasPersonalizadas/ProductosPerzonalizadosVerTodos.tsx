// src/components/FundasPersonalizadas/FundasPersonalizadasProductos.tsx
import { useEffect, useMemo, useState } from "react";
import ProductCardPersonalizadas from "@/components/Fundas/FundasPersonalizadas/ProductosPersonalizados";
import {
  fetchAndAdaptProducts,
  Product,
} from "@/components/Fundas/FundasPredeterminadas/fundasGet";
import { catalogMap } from "@/utils"; // 👈 Ajusta la ruta si tu utils vive en otro sitio

interface ProductsPersonalizadasVerTodosProps {
  visibleTitle: boolean; // (no se usa aquí, pero lo mantengo por compatibilidad)
}

/* ───── Normalizador de títulos ───── */
const normalizar = (txt: string) =>
  txt.trim().toUpperCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

const FundasPersonalizadasProductos: React.FC<
  ProductsPersonalizadasVerTodosProps
> = ({ visibleTitle }) => {
  const [products, setProducts] = useState<Product[]>([]);

  /* ───── Carga de productos ───── */
  useEffect(() => {
    fetchAndAdaptProducts().then(setProducts).catch(console.error);
  }, []);

  /* ───── Filtrado por tipo ───── */
  const filteredProducts = useMemo(
    () =>
      products.filter(
        (p) =>
          p.tipo === "PERSONALIZADO_CON_CARACTERES" ||
          p.tipo === "PERSONALIZADO_CON_IMAGEN"
      ),
    [products]
  );

  /* ───── Render ───── */
  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center bg-white px-4 py-8">
      <div className="grid w-full max-w-7xl grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => {
          /* ------ Sustitución de imagen ------ */
          const key = normalizar(product.title);
          const displayImage = catalogMap[key]; // puede ser undefined
          /* ----------------------------------- */

          return (
            <ProductCardPersonalizadas
              key={product.id}
              id={product.id.toString()}
              imageSrc={product.imageSrc}     // original (siempre)
              displayImage={displayImage}     // opcional (catálogo)
              title={product.title}
              price={product.price}
              oldPrice={product.oldPrice}
              description={product.description}
              tipo={product.tipo}
              imageFinal={product.imageFinal}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FundasPersonalizadasProductos;
