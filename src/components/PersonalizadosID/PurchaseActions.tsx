// src/components/PersonalizadosID/PurchaseActions.tsx
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import html2canvas from "html2canvas";
import tarjetas from "@/assets/predetermiandasCases/tarjetas.png";
import useCartStore, { CartItem } from "@/store/cartStore";
import { PurchaseActionsProps } from "./utils/Interface";
import usePersonalizadoStore from "@/components/PersonalizadosID/store/usePersonalizadoStore";

/** Carga una imagen y la resuelve cuando está disponible */
const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";     // necesario para Cloudinary u otros dominios
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
    if (!isReady) return;                 // salvaguarda extra
    setLoading(true);
    try {
      let finalDataURL: string;

      /* 1. Miniatura según tipo */
      if (product.tipo === "PERSONALIZADO_CON_CARACTERES") {
        const textCanvas = await html2canvas(previewRef.current!, {
          useCORS: true,
          backgroundColor: null,
          scale: window.devicePixelRatio || 2,
        });

        const baseImg = await loadImage(product.imageSrc);

        const composed = document.createElement("canvas");
        composed.width = baseImg.width;
        composed.height = baseImg.height;

        const ctx = composed.getContext("2d")!;
        ctx.drawImage(baseImg, 0, 0);
        ctx.drawImage(textCanvas, 0, 0);

        finalDataURL = composed.toDataURL("image/png");
      } else {
        if (!previewRef.current) throw new Error("Vista previa no disponible");
        const fullCanvas = await html2canvas(previewRef.current, {
          useCORS: true,
          backgroundColor: null,
          scale: window.devicePixelRatio || 2,
        });
        finalDataURL = fullCanvas.toDataURL("image/png");
      }

      /* 2. Crear / actualizar ítem */
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

      openCart();
    } catch (err) {
      console.error("Error al generar la miniatura:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = async () => {
    if (!isReady) return;
    await handleAddToCart();
  };

  /* ─── UI ─── */
  return (
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
            className="w-full flex-1 rounded bg-black px-4 py-2 font-favoritExpanded text-sm text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Agregando…" : "Agregar al Carrito"}
          </button>
        </div>
      </div>

      {/* Comprar ahora */}
      <button
        onClick={handleBuyNow}
        disabled={loading || !isReady}
        className="w-full rounded border border-black px-4 py-2 font-favoritExpanded text-sm text-black hover:bg-black hover:text-white disabled:opacity-50"
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
  );
}
