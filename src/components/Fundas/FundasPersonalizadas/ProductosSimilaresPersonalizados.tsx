import ProductsPersonalizadasVerTodos from "@/components/Fundas/FundasPersonalizadas/ProductosPerzonalizadosVerTodos";

function ProductosSimilares() {
  return (
    <div className="flex w-full flex-col items-center justify-center bg-white">
      <h3 className="text-md mb-3 pt-10 font-favoritExpanded text-black md:pt-5">
        PODRÍA INTERESARTE
      </h3>
      <span className="my-3 font-favoritExpanded text-xl uppercase text-black md:text-7xl">
        Productos SIMILARES
      </span>
      <ProductsPersonalizadasVerTodos visibleTitle={false} />
    </div>
  );
}

export default ProductosSimilares;
