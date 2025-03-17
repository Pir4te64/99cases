import Productos from "./Fundas/Productos";
function ProductosSimilares() {
  return (
    <div className="bg-white">
      <h3 className="text-xl font-bold  text-black mb-3">PODRÍA INTERESARTE</h3>
      <span className="text-black text-7xl uppercase my-3 font-favorit">
        Productos SIMILARES
      </span>
      <Productos visibleTitle={false} />
    </div>
  );
}

export default ProductosSimilares;
