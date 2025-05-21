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
import PredeterminadoLayout from "../UI/PredeterminadoLayout";

const PredeterminadosID: React.FC = () => {
  const location = useLocation();
  const product = location.state?.product;

  // Carrito
  const cartItems = useCartStore((state) => state.cartItems);
  const selectedQuantity = useCartStore((state) => state.selectedQuantity);
  const incrementSelectedQuantity = useCartStore((state) => state.incrementSelectedQuantity);
  const decrementSelectedQuantity = useCartStore((state) => state.decrementSelectedQuantity);
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
    { label: "Fundas Predeterminadas", link: "/predeterminadas" },
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
      };
      addToCart(item);
    }
    openCart();
  };

  const handleBuyNow = () => {
    handleAgregarAlCarrito();
    handleCheckout();
  };

  const isSelectionComplete = Boolean(selectedModel && selectedBrand);

  return (
    <PredeterminadoLayout>
      <div className="mx-auto bg-white px-4 py-6 text-black">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="container mx-auto flex flex-col gap-6 lg:flex-row">
          {/* Imagen de fondo (20%) */}
          <div className="flex w-full items-center justify-center lg:w-[20%]">
            <img
              src={window.innerWidth < 1024 ? imgHorizontal : imgVertical}
              alt="Imagen del producto"
              className="max-w-full object-contain"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>

          {/* Imagen principal (30%) */}
          <div className="flex w-full items-center justify-center lg:w-[30%]">
            {product ? (
              <img
                src={product.imageSrc}
                alt={product.title}
                className="max-w-full object-contain"
                onContextMenu={(e) => e.preventDefault()}
              />
            ) : (
              <p>No se encontró la imagen del producto.</p>
            )}
          </div>

          {/* Detalles (50%) */}
          <div className="flex w-full flex-col p-4 lg:w-[50%]">
            {product ? (
              <>
                <h1 className="mb-2 w-full text-4xl font-bold md:text-7xl">
                  {product.title}
                </h1>
                <p className="mb-2 text-lg font-semibold text-red-600">
                  {product.price}{" "}
                  {product.oldPrice && (
                    <span className="ml-2 text-gray-500 line-through">
                      {product.oldPrice}
                    </span>
                  )}
                </p>

                <MarcaCelular />

                {/* Contador y botón */}
                <div className="mb-4 flex w-full items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleDecrement}
                      className="rounded border px-2 py-1 hover:bg-gray-200"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-semibold">{displayQuantity}</span>
                    <button
                      onClick={handleIncrement}
                      className="rounded border px-2 py-1 hover:bg-gray-200"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={handleAgregarAlCarrito}
                    disabled={!isSelectionComplete}
                    className={`flex-1 px-4 py-2 rounded transition-colors ${isSelectionComplete
                      ? "bg-black text-white hover:bg-gray-800"
                      : "opacity-50 cursor-not-allowed"
                      }`}
                  >
                    Agregar al Carrito
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  disabled={!isSelectionComplete}
                  className={`border px-4 py-2 rounded mb-4 transition-colors ${isSelectionComplete
                    ? "border-black text-black hover:bg-black hover:text-white"
                    : "opacity-50 cursor-not-allowed"
                    }`}
                >
                  Comprar Ahora
                </button>

                <div className="justify-spinner-center my-4 flex items-center">
                  <img src={tarjetas} alt="Tarjetas de pago" className="max-w-full" onContextMenu={(e) => e.preventDefault()} />
                </div>

                {/* Información adicional */}
                <details className="mb-4">
                  <summary className="cursor-pointer font-bold">
                    Descripción del producto
                  </summary>
                  <p className="mt-2">
                    Nuestras fundas combinan diseño único y materiales premium:
                  </p>
                  <ul className="mt-2 list-inside list-disc">
                    <li>Parte trasera de aluminio.</li>
                    <li>Bordes de silicona reforzada.</li>
                    <li>Agarre antideslizante.</li>
                    <li>No se rayan</li>
                    <li>No se despintan</li>
                  </ul>
                </details>
                <details>
                  <summary className="cursor-pointer font-bold">
                    Información del envío
                  </summary>
                  <p className="mt-2">🏭 Tiempo de producción: 1-3 días hábiles</p>
                  <p className="mt-2">
                    ✈️ Tiempo de envío: desde Santa Fe (Arg), 1-5 días.
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
