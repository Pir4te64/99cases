import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import imgVertical from "@/assets/predetermiandasCases/List.png";
import imgHorizontal from "@/assets/predetermiandasCases/horizontal.png";
import tarjetas from "@/assets/predetermiandasCases/tarjetas.png";
import { Minus, Plus } from "lucide-react";
import MarcaCelular from "@/components/PersonalizadosID/Actions/MarcaCelular";
import useCartStore, { CartItem } from "@/store/cartStore";
import { usePhoneSelectionStore } from "@/components/PersonalizadosID/store/phoneSelectionStore";
import { useCheckout } from "@/store/useCheckout";
import PredeterminadoLayout from "@/components/UI/PredeterminadoLayout";
import premiumCase from "@/assets/marcas/premiumcase.svg";
import Features from "@/components/Features";
import { toast, ToastContainer } from "react-toastify";

const PredeterminadosID: React.FC = () => {
  const location = useLocation();
  const product = location.state?.product;
  // Carrito
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

  // Selección de teléfono
  const { selectedModel, selectedBrand } = usePhoneSelectionStore();
  
  const { handleCheckout } = useCheckout();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Breadcrumb
  const breadcrumbItems = [
    { label: "Inicio", link: "/" },
    { label: "Fundas Exclusivas", link: "/predeterminadas" },
    { label: product?.title || "Producto" },
  ];

  const cartItem = cartItems.find((item) => item.id === product?.id);
  const displayQuantity = cartItem ? cartItem.quantity : selectedQuantity;

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
      const newQty = cartItem.quantity > 1 ? cartItem.quantity - 1 : 1;
      updateItemQuantity(product.id, newQty);
    } else {
      decrementSelectedQuantity();
    }
  };

  const handleAgregarAlCarrito = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error("Debes iniciar sesión para agregar productos al carrito", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
    }

    if (!product) return;

    if (cartItem) {
      updateItemQuantity(product.id, selectedQuantity);
    } else {
      const item: CartItem = {
        id: product.id,
        title: product.title,
        imageSrc: product.imageSrc,
        price: product.price,
        quantity: selectedQuantity,
        selectedModel: selectedModel?.id,
        selectedBrand,
        tipo: product.tipo,
        imageFinalUrl: product.imageFinalUrl,
        phoneBrand: selectedBrand, // Agregamos la marca del celular
        phoneModel: selectedModel?.modelo, // Agregamos el modelo del celular
      };
      addToCart(item);
    }
    //openCart();

    // Aquí mostramos el toast
    toast.success("Funda agregada al carrito", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: true,
    });
  };

  const handleBuyNow = () => {
    handleAgregarAlCarrito();
    handleCheckout();
  };

  const isSelectionComplete = Boolean(selectedModel && selectedBrand);
  return (
    <PredeterminadoLayout>
      <ToastContainer
        position="bottom-center"
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
      />
      <div className="mx-auto bg-white py-6 text-black">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex w-full flex-col gap-4 lg:flex-row lg:gap-0">
          <div className="flex w-full flex-col items-start justify-between gap-4 lg:w-[50%] lg:flex-row">
            <div className="w-full lg:w-1/4">
              <Features />
            </div>

            {/* Imagen principal (30%) */}
            <div className="flex w-full items-start justify-center lg:w-[80%]">
              {product ? (
                <div 
                  className="relative inline-block w-full sm:w-80 md:w-96"
                  onDragStart={(e) => e.preventDefault()}
                  onDrop={(e) => e.preventDefault()}
                  onMouseDown={(e) => e.preventDefault()}
                  style={{ userSelect: 'none', WebkitUserSelect: 'none', WebkitTouchCallout: 'none' }}
                >
                  {/* Imagen principal más pequeña */}
                  <img
                    src={product.imageSrc}
                    alt={product.title}
                    className="h-[320px] w-full object-contain select-none pointer-events-none sm:h-auto"
                    onContextMenu={(e) => e.preventDefault()}
                    draggable="false"
                    onDragStart={(e) => e.preventDefault()}
                    onDrop={(e) => e.preventDefault()}
                    onMouseDown={(e) => e.preventDefault()}
                    style={{ 
                      userSelect: 'none', 
                      WebkitUserSelect: 'none', 
                      WebkitTouchCallout: 'none',
                      WebkitUserDrag: 'none',
                      KhtmlUserSelect: 'none',
                      MozUserSelect: 'none',
                      msUserSelect: 'none'
                    }}
                  />

                  {/* Banner superpuesto */}
                  <img
                    src={premiumCase}
                    alt="Premium Case"
                    onContextMenu={(e) => e.preventDefault()}
                    className="pointer-events-none absolute -bottom-8 right-0 w-28 select-none sm:-bottom-10 sm:w-32"
                    draggable="false"
                    onDragStart={(e) => e.preventDefault()}
                    onDrop={(e) => e.preventDefault()}
                    onMouseDown={(e) => e.preventDefault()}
                    style={{ 
                      userSelect: 'none', 
                      WebkitUserSelect: 'none', 
                      WebkitTouchCallout: 'none',
                      WebkitUserDrag: 'none',
                      KhtmlUserSelect: 'none',
                      MozUserSelect: 'none',
                      msUserSelect: 'none'
                    }}
                  />
                </div>
              ) : (
                <p>No se encontró la imagen del producto.</p>
              )}
            </div>
          </div>

          {/* Detalles (50%) */}
          <div className="flex w-full flex-col p-4 lg:w-[80%]">
            {product ? (
              <>
                <h1 className="mb-1.5 w-full text-left font-favoritExpandedBook text-sm font-bold sm:text-lg md:mb-2 md:text-2xl lg:text-4xl">
                  {product.title}
                </h1>
                <p className="mb-2 text-left font-favoritExpandedBook text-base font-semibold text-gray-900 sm:text-lg md:text-xl">
                  {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                  {product.oldPrice && (
                    <span className="ml-2 font-favoritExpandedBook text-gray-500 line-through">
                      {product.oldPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </span>
                  )}
                </p>
                <p className="mb-2 text-left font-favoritExpandedBook text-sm font-bold uppercase text-red-600 sm:text-base md:text-lg">
                  3 vendidos en las últimas horas
                </p>
                <MarcaCelular />

                {/* Contador y botón */}
                <div className="mb-4 flex w-full items-center space-x-4">
                  <div className="inline-flex items-center overflow-hidden rounded-md border border-gray-400">
                    <button
                      onClick={handleDecrement}
                      aria-label="Disminuir cantidad"
                      className="px-2 py-1 text-gray-800 hover:bg-gray-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={!isSelectionComplete}
                    >
                      <Minus size={12} />
                    </button>
                    <div className="px-3 py-1 text-center font-medium text-gray-800">
                      {displayQuantity}
                    </div>
                    <button
                      onClick={handleIncrement}
                      aria-label="Aumentar cantidad"
                      className="px-2 py-1 text-gray-800 hover:bg-gray-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={!isSelectionComplete}
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <button
                    onClick={handleAgregarAlCarrito}
                    disabled={!isSelectionComplete}
                    className={`flex-1 text-xs md:text-sm rounded border font-favoritExpanded uppercase px-4 py-2 transition-colors ${isSelectionComplete
                      ? "bg-black text-white hover:bg-gray-800"
                      : "cursor-not-allowed border-gray-300"
                      }`}
                  >
                    Agregar al Carrito
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  disabled={!isSelectionComplete}
                  className={`border font-favoritExpanded uppercase px-4 py-2 rounded text-sm mb-4 transition-colors ${isSelectionComplete
                    ? "border-black text-black hover:bg-black hover:text-white"
                    : " cursor-not-allowed border-gray-300"
                    }`}
                >
                  Comprar Ahora
                </button>

                <div className="my-4 flex items-center justify-center">
                  <img
                    src={tarjetas}
                    alt="Tarjetas de pago"
                    className="max-w-full"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>

                {/* Información adicional */}
                <details className="my-3 sm:my-4" open>
                  <summary className="cursor-pointer font-favoritExpanded text-base font-bold sm:text-lg md:text-xl">
                    Descripción del producto
                  </summary>
                  <p className="mt-2 font-favoritExpanded text-sm sm:text-base">
                    Nuestras fundas combinan diseño único y materiales premium:
                  </p>
                  <ul className="mt-2 list-inside list-none space-y-1 font-favoritExpanded text-sm sm:text-base">
                    <li className="before:mr-2 before:content-['-']">Parte trasera de aluminio.</li>
                    <li className="before:mr-2 before:content-['-']">Bordes de silicona reforzada.</li>
                    <li className="before:mr-2 before:content-['-']">Agarre antideslizante.</li>
                    <li className="before:mr-2 before:content-['-']">No se rayan</li>
                    <li className="before:mr-2 before:content-['-']">No se despintan</li>
                  </ul>
                </details>
                <details className="my-3 sm:my-4" open>
                  <summary className="cursor-pointer font-favoritExpanded text-base font-bold sm:text-lg md:text-xl">
                    Información del envío
                  </summary>
                  <div className="space-y-2 font-favoritExpanded text-sm sm:text-base">
                    <p>Tiempo de producción: 1-3 días hábiles</p>
                    <p>Tiempo de envío: desde Santa Fe (Arg), 1-5 días.</p>
                  </div>
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
