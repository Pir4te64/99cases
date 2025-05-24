import ProductsPersonalizadasVerTodos from "@/components/Fundas/FundasPersonalizadas/ProductosPerzonalizadosVerTodos";

function ProductosSimilares() {
  return (
    <div className="flex w-full flex-col items-center justify-center bg-white">
      <h3 className="mb-3 pt-10 text-xl font-bold text-black md:pt-5">
        PODRÍA INTERESARTE
      </h3>
      <span className="my-3 font-favorit text-2xl uppercase text-black md:text-7xl">
        Productos SIMILARES
      </span>
      <ProductsPersonalizadasVerTodos visibleTitle={false} />
    </div>
  );
}

export default ProductosSimilares;
