// src/components/PersonalizadosID/PurchaseActions.tsx
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import html2canvas from "html2canvas";
import tarjetas from "@/assets/predetermiandasCases/tarjetas.png";
import useCartStore, { CartItem } from "@/store/cartStore";
import { PurchaseActionsProps } from "@/components/PersonalizadosID/utils/Interface";
import usePersonalizadoStore from "@/components/PersonalizadosID/store/usePersonalizadoStore";

// Importaciones de React-Toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/** Carga una imagen y la resuelve cuando está disponible */
const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

export default function PurchaseActions({ product, previewRef }: PurchaseActionsProps) {
  const [loading, setLoading] = useState(false);

  /* ─── Nuevo: comprobar marca / modelo ─── */
  const phoneBrand = usePersonalizadoStore((s) => s.phoneBrand);
  const phoneModel = usePersonalizadoStore((s) => s.phoneModel);
  const isReady = Boolean(phoneBrand && phoneModel);

  /* ─── store carrito ─── */
  const selectedQuantity = useCartStore((s) => s.selectedQuantity);
  const incrementSelectedQuantity = useCartStore((s) => s.incrementSelectedQuantity);
  const decrementSelectedQuantity = useCartStore((s) => s.decrementSelectedQuantity);
  const addToCart = useCartStore((s) => s.addToCart);
  const openCart = useCartStore((s) => s.openCart);
  const updateItemQuantity = useCartStore((s) => s.updateItemQuantity);
  const cartItems = useCartStore((s) => s.cartItems);

  const cartItem = cartItems.find((it) => it.id === product.id);
  const displayQuantity = cartItem ? cartItem.quantity : selectedQuantity;

  /* ─── helpers cantidad ─── */
  const handleIncrement = () => {
    if (cartItem) updateItemQuantity(product.id, cartItem.quantity + 1);
    else incrementSelectedQuantity();
  };

  const handleDecrement = () => {
    if (cartItem) {
      const newQty = Math.max(1, cartItem.quantity - 1);
      updateItemQuantity(product.id, newQty);
    } else {
      decrementSelectedQuantity();
    }
  };

  /* ─── agregar al carrito ─── */
  const handleAddToCart = async () => {
    if (!isReady) return;
    setLoading(true);
    try {
      let finalDataURL: string;
      if (product.tipo === "PERSONALIZADO_CON_CARACTERES" || product.description === "PERSONALIZADO_CON_CARACTERES_DOWN") {
        if (!previewRef.current) throw new Error("Vista previa no disponible");
        const textCanvas = await html2canvas(previewRef.current, {
          useCORS: true,
          backgroundColor: null,
          scale: 2,
          logging: false,
          allowTaint: true,
          onclone: (clonedDoc) => {
            const element = clonedDoc.querySelector('#preview-container') as HTMLElement;
            if (element) {
              element.style.transform = 'none';
              // Mantener las proporciones originales
              const originalWidth = element.offsetWidth;
              const originalHeight = element.offsetHeight;
              const aspectRatio = originalHeight / originalWidth;
              element.style.width = '300px';
              element.style.height = `${350 * aspectRatio}px`;
            }
          }
        });

        // Convertir canvas a Blob
        const blob = await new Promise<Blob>((resolve) => {
          textCanvas.toBlob((blob) => {
            if (blob) resolve(blob);
          }, 'image/png', 1.0);
        });

        // Crear URL del Blob
        finalDataURL = URL.createObjectURL(blob);
      } else {
        if (!previewRef.current) throw new Error("Vista previa no disponible");
        const fullCanvas = await html2canvas(previewRef.current, {
          useCORS: true,
          backgroundColor: null,
          scale: window.devicePixelRatio || 2,
        });

        // Convertir canvas a Blob
        const blob = await new Promise<Blob>((resolve) => {
          fullCanvas.toBlob((blob) => {
            if (blob) resolve(blob);
          }, 'image/png', 1.0);
        });

        // Crear URL del Blob
        finalDataURL = URL.createObjectURL(blob);
      }

      const item: CartItem = {
        id: product.id,
        title: product.title,
        imageSrc: finalDataURL,
        price: product.price,
        quantity: displayQuantity,
        imageFinalUrl: product.imageFinal ?? null,
      };

      cartItem
        ? updateItemQuantity(product.id, displayQuantity)
        : addToCart(item);

      toast.success("Funda agregada al carrito", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (err) {
      console.error("Error al generar la miniatura:", err);
      toast.error("No se pudo agregar la funda");
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = async () => {
    if (!isReady) return;
    await handleAddToCart();
  };

  return (
    <>
      <div className="space-y-4">
        {/* Cantidad + Agregar */}
        <div className="flex items-center space-x-3">
          <div className="flex w-full items-center space-x-3">
            <div className="inline-flex items-center overflow-hidden rounded-md border border-gray-400">
              <button
                onClick={handleDecrement}
                disabled={loading || !isReady}
                aria-label="Disminuir cantidad"
                className="px-2 py-1 text-gray-800 hover:bg-gray-100 disabled:opacity-50"
              >
                <Minus size={12} />
              </button>
              <div className="px-3 py-1 font-medium text-gray-800">
                {displayQuantity}
              </div>
              <button
                onClick={handleIncrement}
                disabled={loading || !isReady}
                aria-label="Aumentar cantidad"
                className="px-2 py-1 text-gray-800 hover:bg-gray-100 disabled:opacity-50"
              >
                <Plus size={12} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={loading || !isReady}
              className="w-full flex-1 rounded bg-black px-4 py-2 font-favoritExpanded text-sm uppercase text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? "Agregando…" : "Agregar al Carrito"}
            </button>
          </div>
        </div>

        {/* Comprar ahora */}
        <button
          onClick={handleBuyNow}
          disabled={loading || !isReady}
          className="w-full rounded border border-black px-4 py-2 font-favoritExpanded text-sm uppercase text-black hover:bg-black hover:text-white disabled:opacity-50"
        >
          {loading ? "Procesando…" : "Comprar Ahora"}
        </button>

        {/* Logos de pago */}
        <div className="flex justify-center">
          <img
            src={tarjetas}
            alt="Tarjetas de pago"
            loading="lazy"
            className="max-w-full"
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      </div>

      {/* Contenedor de toasts en posición inferior */}
      <ToastContainer
        position="bottom-center"
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
      />
    </>
  );
}
