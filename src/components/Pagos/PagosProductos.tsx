
import { CartItem } from "@/store/cartStore";

interface ResumenCompraProps {
  cartItems: CartItem[];
  total: number;
}

const ResumenCompra: React.FC<ResumenCompraProps> = ({
  cartItems,
  total,
}) => {
  console.log(cartItems);
  return (
    <div>
      {cartItems.length > 0 ? (
        <div className='space-y-4'>
          <ul className='space-y-4'>
            {cartItems.map((item, index) => (
              <li key={index} className='border-b pb-2'>
                <div className='flex items-start space-x-3'>
                  {/* Imagen del producto */}
                  <img
                    src={item.imagenCarrito || item.imageFinalUrl || item.imageSrc}
                    alt={item.title}
                    className='h-auto w-24 object-cover'
                    onContextMenu={(e) => e.preventDefault()}
                  />
                  <div className='flex-1'>
                    <p className='text-md font-favoritExpandedBook text-gray-600'>
                      {item.title}
                    </p>
                    <p className='text-md font-favoritExpandedBook text-gray-600'>
                      Cantidad: x{item.quantity}
                    </p>
                    <p className='font-favoritExpandedBook text-sm font-bold'>
                      {item.price}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Subtotal, Envío y Total */}
          <div className='pt-4'>
            <div className='mb-2 flex justify-between'>
              <span className='font-favoritExpandedBook text-sm uppercase text-gray-700'>
                COSTO DE ENVÍO
              </span>
              <span className='font-favoritExpandedBook text-sm font-bold'>
                A CONVENIR
              </span>
            </div>
            <div className='mb-2 flex justify-between'>
              <span className='font-favoritExpandedBook text-sm uppercase text-gray-700'>
                TOTAL
              </span>
              <span className='font-favoritExpandedBook text-sm font-bold'>
                ${total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <p className='font-favoritExpandedBook'>
          No hay productos en el carrito.
        </p>
      )}
    </div>
  );
};

export default ResumenCompra;
