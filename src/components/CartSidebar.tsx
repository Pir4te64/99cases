// CartSidebar.jsx
import { X, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";

export default function CartSidebar() {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    subtotal,
    total,
    updateItemQuantity,
    removeFromCart,
  } = useCartStore();

  const navigate = useNavigate();

  const removeItem = (id: string): void => {
    removeFromCart(id);
  };

  const decreaseQuantity = (id: string, currentQuantity: number): void => {
    if (currentQuantity <= 1) {
      removeFromCart(id);
    } else {
      updateItemQuantity(id, currentQuantity - 1);
    }
  };

  const increaseQuantity = (id: string, currentQuantity: number): void => {
    updateItemQuantity(id, currentQuantity + 1);
  };

  // Función para iniciar compra: redirige a la pantalla de pagos y envía la información del carrito
  const handleIniciarCompra = () => {
    navigate("/pagos", {
      state: {
        cartItems,
        subtotal,
        total,
      },
    });
  };

  const handleVerMasProductos = () => {
    // Lógica para redirigir a la sección de productos, etc.
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}>
      {/* Encabezado */}
      <div className='border-b flex justify-between items-center bg-gray-400 w-full p-4'>
        <h2 className='font-favoritExpandedBook text-black tracking-wide'>
          CARRITO DE COMPRAS
        </h2>
        <button onClick={closeCart}>
          <X className='h-5 w-5 text-black' />
        </button>
      </div>

      {/* Contenedor de productos y resumen */}
      <div className='p-4 h-[600px] overflow-y-auto'>
        {cartItems.length > 0 ? (
          <ul className='space-y-4'>
            {cartItems.map((item, index) => (
              <li key={index} className='border-b border-black pb-4'>
                <div className='flex items-start space-x-3'>
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className='h-auto w-20 object-cover'
                  />
                  <div className='flex-1'>
                    <div className='flex justify-between items-start'>
                      <p className='uppercase font-bold text-sm leading-tight text-black font-favoritExpandedBook'>
                        FUNDA 99% CASES - {item.title}
                      </p>
                      <button
                        className='text-xs underline text-black font-favoritExpandedBook'
                        onClick={() => removeItem(item.id)}>
                        BORRAR
                      </button>
                    </div>
                    <p className='mt-1 text-sm text-black font-favoritExpandedBook'>
                      {item.price}
                    </p>
                    <div className='mt-2 inline-flex items-center bg-gray-200 px-2 py-1 rounded'>
                      <button
                        onClick={() => decreaseQuantity(item.id, item.quantity)}
                        className='flex items-center justify-center p-1'>
                        <Minus size={16} className='text-black' />
                      </button>
                      <span className='mx-2 text-red-600'>{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id, item.quantity)}
                        className='flex items-center justify-center p-1'>
                        <Plus size={16} className='text-black' />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-black'>El carrito está vacío.</p>
        )}

        {cartItems.length > 0 && (
          <div className='mt-4'>
            <div className='border-black pt-4'>
              <div className='flex justify-between mb-2'>
                <span className='text-sm uppercase text-black font-favoritExpandedBook'>
                  SUBTOTAL (sin envío)
                </span>
                <span className='text-sm font-bold text-black font-favoritExpandedBook'>
                  $
                  {subtotal.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className='flex justify-between mb-4'>
                <span className='text-sm uppercase text-black font-favoritExpandedBook'>
                  TOTAL
                </span>
                <span className='text-sm font-bold text-black font-favoritExpandedBook'>
                  ${total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <button
              onClick={handleIniciarCompra}
              className='bg-black text-white w-full py-2 mb-2 rounded font-favoritExpandedBook'>
              INICIAR COMPRA
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
