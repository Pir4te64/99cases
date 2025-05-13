import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "@/components/Breadcrumbs";
import imgVertical from "@/assets/predetermiandasCases/List.png";
import imgHorizontal from "@/assets/predetermiandasCases/horizontal.png";
import tarjetas from "@/assets/predetermiandasCases/tarjetas.png";
import { Minus, Plus } from "lucide-react";
import PredeterminadoLayout from "@/components/PredeterminadoLayout";
import MarcaCelular from "@/components/PersonalizadosID/Actions/MarcaCelular";
import useCartStore, { CartItem } from "@/store/cartStore";
import { usePhoneSelectionStore } from "@/components/PersonalizadosID/store/phoneSelectionStore";
import { useCheckout } from "@/store/useCheckout";
// Importamos el store de selección de marca y modelo

const PredeterminadosID = () => {
  const location = useLocation();
  const product = location.state?.product;

  // Estados y funciones del carrito
  const cartItems = useCartStore((state) => state.cartItems);
  const selectedQuantity = useCartStore((state) => state.selectedQuantity);
  const incrementSelectedQuantity = useCartStore(
    (state) => state.incrementSelectedQuantity
  );
  const decrementSelectedQuantity = useCartStore(
    (state) => state.decrementSelectedQuantity
  );
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
  const addToCart = useCartStore((state) => state.addToCart);
  const openCart = useCartStore((state) => state.openCart);

  // Extraemos marca y modelo seleccionados del store de teléfono
  // Se agregan ambas propiedades para poder validarlas.
  const { selectedModel, selectedBrand } = usePhoneSelectionStore();
  const { handleCheckout } = useCheckout();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Breadcrumb
  const breadcrumbItems = [
    { label: "Inicio", link: "/" },
    { label: "Fundas Predeterminadas", link: "/predeterminadas" },
    { label: product?.title || "Producto" },
  ];

  // Buscamos si el producto ya está en el carrito
  const cartItem = cartItems.find((item) => item.id === product?.id);
  // Si ya está, mostramos la cantidad del carrito; si no, usamos selectedQuantity
  const displayQuantity = cartItem ? cartItem.quantity : selectedQuantity;

  // Funciones para incrementar y decrementar la cantidad
  const handleIncrement = () => {
    if (!product) return;
    if (cartItem) {
      updateItemQuantity(product.id, cartItem.quantity + 1);
    } else {
      incrementSelectedQuantity();
    }
  };

  const handleDecrement = () => {
    if (!product) return;
    if (cartItem) {
      if (cartItem.quantity > 1) {
        updateItemQuantity(product.id, cartItem.quantity - 1);
      } else {
        // Opcional: podrías eliminar el producto si la cantidad baja de 1
        updateItemQuantity(product.id, 1);
      }
    } else {
      decrementSelectedQuantity();
    }
  };

  const handleAgregarAlCarrito = () => {
    if (!product) {
      console.warn("No se encontró el producto");
      return;
    }
    if (cartItem) {
      // Si el producto ya está en el carrito, actualizamos la cantidad.
      updateItemQuantity(product.id, selectedQuantity);
    } else {
      // Creamos el objeto del producto, incluyendo la marca y modelo seleccionados
      // Se envía el id del modelo (si existe) y la marca directamente (suponiendo que selectedBrand es el id)
      const item: CartItem = {
        id: product.id,
        title: product.title,
        imageSrc: product.imageSrc,
        price: product.price,
        quantity: selectedQuantity,
        selectedModel: selectedModel ? selectedModel.id : undefined,
        selectedBrand: selectedBrand ? selectedBrand : undefined,
      };

      addToCart(item);
    }
    openCart();
  };
  const handleBuyNow = () => {
    handleAgregarAlCarrito();
    handleCheckout();
  };
  // Se determina si los botones deben estar habilitados o deshabilitados
  const isSelectionComplete = selectedModel && selectedBrand;

  return (
    <PredeterminadoLayout>
      <div className='mx-auto px-4 py-6 bg-white text-black'>
        <Breadcrumbs items={breadcrumbItems} />

        <div className='flex flex-col lg:flex-row lg:h-[600px] container mx-auto'>
          {/* Columna 1 */}
          <div className='flex-none flex items-center justify-center'>
            <img
              src={window.innerWidth < 1024 ? imgHorizontal : imgVertical}
              alt='Imagen del producto'
              className='max-h-full object-contain transition-transform duration-300 ease-in-out'
              onContextMenu={e => e.preventDefault()}
            />
          </div>

          {/* Columna 2 */}
          <div className='flex items-center justify-center'>
            {product ? (
              <img
                src={product.imageSrc}
                alt={product.title}
                className='max-h-full object-contain'
              />
            ) : (
              <p>No se encontró la imagen del producto.</p>
            )}
          </div>

          {/* Columna 3 */}
          <div className='flex-1 flex flex-col p-4 overflow-y-auto'>
            {product ? (
              <>
                <h1 className='text-4xl md:text-7xl font-bold mb-2 w-full font-favoritExpandedBook'>
                  {product.title}
                </h1>
                <p className='text-lg text-red-600 font-semibold mb-2 font-favoritExpandedBook'>
                  {product.price}{" "}
                  {product.oldPrice && (
                    <span className='line-through text-gray-500 ml-2 font-favoritExpandedBook'>
                      {product.oldPrice}
                    </span>
                  )}
                </p>
                <MarcaCelular />

                {/* Contador y botón Agregar al Carrito */}
                <div className='flex items-center mb-4 w-full space-x-4'>
                  <div className='flex items-center space-x-2'>
                    <button
                      onClick={handleDecrement}
                      className='border border-gray-400 px-2 py-1 rounded hover:bg-gray-200'>
                      <Minus size={16} />
                    </button>
                    <span className='font-semibold font-favoritExpandedBook'>
                      {displayQuantity}
                    </span>
                    <button
                      onClick={handleIncrement}
                      className='border border-gray-400 px-2 py-1 rounded hover:bg-gray-200'>
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={handleAgregarAlCarrito}
                    disabled={!isSelectionComplete}
                    className={`flex-1 bg-black text-white px-4 py-2 font-favoritExpandedBook rounded transition-colors ${!isSelectionComplete
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-800"
                      }`}>
                    Agregar al Carrito
                  </button>
                </div>

                {/* Comprar ahora */}
                <button
                  disabled={!isSelectionComplete}
                  onClick={handleBuyNow}
                  className={`border font-favoritExpandedBook border-black text-black px-4 py-2 rounded mb-4 transition-colors ${!isSelectionComplete
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-black hover:text-white"
                    }`}>
                  Comprar Ahora
                </button>

                {/* Imagen de tarjetas */}
                <div className='flex justify-center items-center my-4'>
                  <img
                    src={tarjetas}
                    alt='Tarjetas de pago'
                    className='max-w-full'
                  />
                </div>

                {/* Detalles */}
                <details className='mb-4'>
                  <summary className='cursor-pointer font-bold mb-2 font-favoritExpandedBook'>
                    Descripción del producto
                  </summary>
                  <p className='mb-2 font-favoritExpandedBook'>
                    Nuestras fundas combinan diseño único y materiales premium:
                  </p>
                  <ul className='mb-2 list-disc list-inside font-favoritExpandedBook'>
                    <li>Parte trasera de aluminio.</li>
                    <li>Bordes de silicona reforzada.</li>
                    <li>Agarre antideslizante.</li>
                    <li>No se rayan</li>
                    <li>No se despintan</li>
                  </ul>
                </details>
                <details className='mb-4'>
                  <summary className='cursor-pointer font-bold mb-2 font-favoritExpandedBook'>
                    Información del envío
                  </summary>
                  <p className='mb-2 font-favoritExpandedBook'>
                    🏭 Tiempo de producción: 1-3 días hábiles
                  </p>
                  <p className='mb-2 font-favoritExpandedBook'>
                    ✈️ Tiempo de envío: Nuestros productos se fabrican y envían
                    desde nuestra oficina en Santa Fe (Arg) y la entrega demora
                    entre 1 y 5 días.
                  </p>
                </details>
              </>
            ) : (
              <p>No se encontró el producto.</p>
            )}
          </div>
        </div>
      </div>
    </PredeterminadoLayout>
  );
};

export default PredeterminadosID;
