// src/components/CartSidebar.tsx
import { X, Plus, Minus } from "lucide-react";
import useCartStore from "@/store/cartStore";
import { useCheckout } from "@/store/useCheckout";
import useAuthStore from "@/store/authStore";
import { useEffect } from "react";

export default function CartSidebar() {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    subtotal,
    total,
    updateItemQuantity,
    removeFromCart,
    clearCart,
  } = useCartStore();
  const { handleCheckout } = useCheckout();
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) {
      clearCart();
    }
  }, [isAuthenticated, clearCart]);
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

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg transform transition-transform duration-300 z-50 ${isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
    >
      {/* Encabezado */}
      <div className="flex w-full items-center justify-between border-b bg-gray-400 p-4">
        <h2 className="font-favoritExpandedBook tracking-wide text-black">
          CARRITO DE COMPRAS
        </h2>
        <button onClick={closeCart}>
          <X className="h-5 w-5 text-black" />
        </button>
      </div>

      {/* Contenedor de productos y resumen */}
      <div className="h-[600px] overflow-y-auto p-4">
        {cartItems.length > 0 ? (
          <ul className="space-y-4">
            {cartItems.map(item => (
              <li key={item.id} className="border-b border-black pb-4">
                <div className="flex items-start space-x-3">
                  <img
                    src={typeof item.imageSrc === "string" ? item.imageSrc : ""}
                    alt={item.title}
                    loading="lazy"
                    className="h-auto w-20 object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <p className="font-favoritExpandedBook text-sm font-bold uppercase leading-tight text-black">
                        {item.title}
                      </p>
                      <button
                        className="font-favoritExpandedBook text-xs text-black underline"
                        onClick={() => removeItem(item.id)}
                      >
                        BORRAR
                      </button>
                    </div>
                    <p className="mt-1 font-favoritExpandedBook text-sm text-black">
                      {item.price}
                    </p>
                    <div className="mt-2 inline-flex items-center rounded bg-gray-200 px-2 py-1">
                      <button
                        onClick={() =>
                          decreaseQuantity(item.id, item.quantity)
                        }
                        className="flex items-center justify-center p-1"
                      >
                        <Minus size={16} className="text-black" />
                      </button>
                      <span className="mx-2 text-red-600">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          increaseQuantity(item.id, item.quantity)
                        }
                        className="flex items-center justify-center p-1"
                      >
                        <Plus size={16} className="text-black" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-black">El carrito está vacío.</p>
        )}

        {cartItems.length > 0 && (
          <div className="mt-4">
            <div className="border-black pt-4">
              <div className="mb-2 flex justify-between">
                <span className="font-favoritExpandedBook text-sm font-bold text-black">
                  $
                  {subtotal.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="mb-4 flex justify-between">
                <span className="font-favoritExpandedBook text-sm uppercase text-black">
                  TOTAL
                </span>
                <span className="font-favoritExpandedBook text-sm font-bold text-black">
                  $
                  {total.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="mb-2 w-full rounded bg-black py-2 font-favoritExpandedBook text-white"
            >
              INICIAR COMPRA
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
