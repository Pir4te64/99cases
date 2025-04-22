// PurchaseActions.tsx
import { Minus, Plus } from "lucide-react";
import tarjetas from "@/assets/predetermiandasCases/tarjetas.png";
import useCartStore, { CartItem } from "@/store/cartStore";

interface PurchaseActionsProps {
  product: {
    id: string;
    title: string;
    imageSrc: string;
    price: number; // asumimos número
  };
}

const PurchaseActions = ({ product }: PurchaseActionsProps) => {
  // Acciones y estados del carrito
  const selectedQuantity = useCartStore((state) => state.selectedQuantity);
  const incrementSelectedQuantity = useCartStore(
    (state) => state.incrementSelectedQuantity
  );
  const decrementSelectedQuantity = useCartStore(
    (state) => state.decrementSelectedQuantity
  );
  const addToCart = useCartStore((state) => state.addToCart);
  const openCart = useCartStore((state) => state.openCart);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
  const cartItems = useCartStore((state) => state.cartItems);

  // Buscamos si el producto ya está en el carrito
  const cartItem = cartItems.find((item) => item.id === product.id);

  // Si ya está, mostramos la cantidad del carrito; de lo contrario, usamos selectedQuantity
  const displayQuantity = cartItem ? cartItem.quantity : selectedQuantity;

  // Función para incrementar: si ya está en el carrito, se actualiza ahí; sino, se actualiza el valor de selección
  const handleIncrement = () => {
    if (cartItem) {
      updateItemQuantity(product.id, cartItem.quantity + 1);
    } else {
      incrementSelectedQuantity();
    }
  };

  // Función para decrementar
  const handleDecrement = () => {
    if (cartItem) {
      // Si la cantidad en el carrito es 1, podemos optar por remover el producto
      if (cartItem.quantity <= 1) {
        // Aquí podrías llamar a removeFromCart, pero por simplicidad solo dejamos 1
        updateItemQuantity(product.id, 1);
      } else {
        updateItemQuantity(product.id, cartItem.quantity - 1);
      }
    } else {
      decrementSelectedQuantity();
    }
  };

  // Al hacer "Agregar al Carrito", si el producto ya existe, se actualiza su cantidad;
  // de lo contrario, se agrega con la cantidad seleccionada.
  const handleAddToCart = () => {
    if (!product) {
      console.warn("No se encontró el producto");
      return;
    }
    if (cartItem) {
      // Actualizamos el ítem en el carrito con la cantidad actual de selección
      updateItemQuantity(product.id, selectedQuantity);
    } else {
      const item: CartItem = {
        id: product.id,
        title: product.title,
        imageSrc: product.imageSrc,
        price: product.price,
        quantity: selectedQuantity,
      };
      addToCart(item);
    }
    openCart();
  };

  return (
    <>
      {/* Contador y Agregar al Carrito */}
      <div className='flex items-center mb-4 my-4 w-full space-x-4'>
        <div className='flex items-center space-x-2'>
          <button
            onClick={handleDecrement}
            className='border border-gray-400 px-2 py-1 rounded hover:bg-gray-200'>
            <Minus size={16} />
          </button>
          <span className='font-semibold'>{displayQuantity}</span>
          <button
            onClick={handleIncrement}
            className='border border-gray-400 px-2 py-1 rounded hover:bg-gray-200'>
            <Plus size={16} />
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          className='flex-1 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors'>
          Agregar al Carrito
        </button>
      </div>

      {/* Comprar Ahora */}
      <button
        onClick={() => {
          // Implementa la lógica de "Comprar Ahora" si es necesario.
        }}
        className='border border-black text-black px-4 py-2 rounded mb-4 hover:bg-black hover:text-white transition-colors'>
        Comprar Ahora
      </button>

      {/* Imagen de tarjetas */}
      <div className='flex justify-center items-center my-4'>
        <img src={tarjetas} alt='Tarjetas de pago' className='max-w-full' />
      </div>
    </>
  );
};

export default PurchaseActions;
