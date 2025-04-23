
import { CartItem } from "@/store/cartStore";

interface ResumenCompraProps {
  cartItems: CartItem[];
  subtotal: number;
  total: number;
}

const ResumenCompra: React.FC<ResumenCompraProps> = ({
  cartItems,
  subtotal,
  total,
}) => {
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
                    src={item.imageSrc}
                    alt={item.title}
                    className='w-24 h-auto object-cover'
                  />
                  <div className='flex-1'>
                    <p className='text-sm font-semibold font-favoritExpandedBook'>
                      {item.title}
                    </p>
                    <p className='text-xs text-gray-600 font-favoritExpandedBook'>
                      Cantidad: {item.quantity}
                    </p>
                    <p className='text-sm font-bold font-favoritExpandedBook'>
                      {item.price}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Subtotal, Envío y Total */}
          <div className=' pt-4'>
            <div className='flex justify-between mb-2'>
              <span className='text-sm uppercase text-gray-700 font-favoritExpandedBook'>
                SUBTOTAL
              </span>
              <span className='text-sm font-bold font-favoritExpandedBook'>
                $
                {subtotal.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className='flex justify-between mb-2'>
              <span className='text-sm uppercase text-gray-700 font-favoritExpandedBook'>
                COSTO DE ENVÍO
              </span>
              <span className='text-sm font-bold font-favoritExpandedBook'>
                A CONVENIR
              </span>
            </div>
            <div className='flex justify-between mb-2'>
              <span className='text-sm uppercase text-gray-700 font-favoritExpandedBook'>
                TOTAL
              </span>
              <span className='text-sm font-bold font-favoritExpandedBook'>
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
