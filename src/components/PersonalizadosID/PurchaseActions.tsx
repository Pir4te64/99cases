import { Minus, Plus } from "lucide-react";
import usePersonalizadoStore from "./usePersonalizadoStore";
import tarjetas from "../../assets/predetermiandasCases/tarjetas.png";

const PurchaseActions = () => {
  // Extraemos los estados y acciones del store
  const quantity = usePersonalizadoStore((state: any) => state.quantity);
  const decrement = usePersonalizadoStore((state: any) => state.decrement);
  const increment = usePersonalizadoStore((state: any) => state.increment);
  const onAddToCart = usePersonalizadoStore((state: any) => state.onAddToCart);
  const onBuyNow = usePersonalizadoStore((state: any) => state.onBuyNow);

  return (
    <>
      {/* Contador y Agregar al Carrito */}
      <div className="flex items-center mb-4 my-4 w-full space-x-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={decrement}
            className="border border-gray-400 px-2 py-1 rounded hover:bg-gray-200"
          >
            <Minus size={16} />
          </button>
          <span className="font-semibold">{quantity}</span>
          <button
            onClick={increment}
            className="border border-gray-400 px-2 py-1 rounded hover:bg-gray-200"
          >
            <Plus size={16} />
          </button>
        </div>
        <button
          onClick={onAddToCart}
          className="flex-1 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
        >
          Agregar al Carrito
        </button>
      </div>

      {/* Comprar Ahora */}
      <button
        onClick={onBuyNow}
        className="border border-black text-black px-4 py-2 rounded mb-4 hover:bg-black hover:text-white transition-colors"
      >
        Comprar Ahora
      </button>

      {/* Imagen de tarjetas */}
      <div className="flex justify-center items-center my-4">
        <img src={tarjetas} alt="Tarjetas de pago" className="max-w-full" />
      </div>
    </>
  );
};

export default PurchaseActions;
