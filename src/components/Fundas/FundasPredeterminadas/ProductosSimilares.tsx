import Productos from "./Productos";
function ProductosSimilares() {
  return (
    <div className="bg-white w-full flex flex-col items-center justify-center">
      <h3 className="text-xl font-bold  text-black mb-3 pt-10 md:pt-5">
        PODRÍA INTERESARTE
      </h3>
      <span className="text-black text-2xl md:text-6xl uppercase my-3 font-favoritMono tracking-wide">
        Productos SIMILARES
      </span>
      <Productos visibleTitle={false} />
    </div>
  );
}

export default ProductosSimilares;
