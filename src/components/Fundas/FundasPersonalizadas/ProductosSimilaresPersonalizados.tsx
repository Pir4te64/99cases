import ProductsPersonalizadasVerTodos from "@/components/Fundas/FundasPersonalizadas/ProductosPerzonalizadosVerTodos";

function ProductosSimilares() {
  return (
    <div className="flex w-full flex-col items-center justify-center bg-white">
      <h3 className="text-md mb-2 pt-5 font-favoritExpanded text-black md:mb-3 md:pt-5">
        PODRÍA INTERESARTE
      </h3>
      <span className="mb-2 mt-1 font-favoritExpanded text-xl uppercase text-black md:my-3 md:text-7xl">
        Productos SIMILARES
      </span>
      <ProductsPersonalizadasVerTodos visibleTitle={false} />
    </div>
  );
}

export default ProductosSimilares;
