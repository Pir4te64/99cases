// src/components/PersonalizadosID/PurchaseActions.tsx

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import html2canvas from "html2canvas";
import tarjetas from "@/assets/predetermiandasCases/tarjetas.png";
import useCartStore, { CartItem } from "@/store/cartStore";
import { PurchaseActionsProps } from "./utils/Interface";
import { dataURLtoBlob } from "./utils/dataURLtoBlob";

export default function PurchaseActions({
  product,
  previewRef,
}: PurchaseActionsProps) {
  const [loading, setLoading] = useState(false);

  const selectedQuantity = useCartStore((s) => s.selectedQuantity);
  const incrementSelectedQuantity = useCartStore(
    (s) => s.incrementSelectedQuantity
  );
  const decrementSelectedQuantity = useCartStore(
    (s) => s.decrementSelectedQuantity
  );
  const addToCart = useCartStore((s) => s.addToCart);
  const openCart = useCartStore((s) => s.openCart);
  const updateItemQuantity = useCartStore((s) => s.updateItemQuantity);
  const cartItems = useCartStore((s) => s.cartItems);

  const cartItem = cartItems.find((it) => it.id === product.id);
  const displayQuantity = cartItem ? cartItem.quantity : selectedQuantity;

  const handleIncrement = () => {
    if (cartItem) {
      updateItemQuantity(product.id, cartItem.quantity + 1);
    } else {
      incrementSelectedQuantity();
    }
  };

  const handleDecrement = () => {
    if (cartItem) {
      const newQty = Math.max(1, cartItem.quantity - 1);
      updateItemQuantity(product.id, newQty);
    } else {
      decrementSelectedQuantity();
    }
  };


  const handleAddToCart = async () => {
    setLoading(true);
    try {
      let dataURL: string;

      /* ─── 1. ¿Qué miniatura vamos a usar? ─── */
      if (product.tipo === "PERSONALIZADO_CON_CARACTERES") {
        // 👉  Solo la imagen base que ya trae el producto
        dataURL = product.imageSrc;              // o product.imagen.url
      } else {
        // 👉  Para los demás tipos, seguimos capturando con html2canvas
        const node = previewRef.current;
        if (!node) throw new Error("Vista previa no disponible");

        const canvas = await html2canvas(node, {
          useCORS: true,
          backgroundColor: null,
          scale: window.devicePixelRatio || 2,
        });
        dataURL = canvas.toDataURL("image/png");
      }

      /* ─── 2. Crear / actualizar ítem de carrito ─── */
      const item: CartItem = {
        id: product.id,
        title: product.title,
        imageSrc: dataURL,              // ← la miniatura
        price: product.price,
        quantity: displayQuantity,
        imageFinalUrl: product.imageFinal, // Por si tu backend lo necesita
      };

      cartItem
        ? updateItemQuantity(product.id, displayQuantity)
        : addToCart(item);

      openCart();
    } catch (err) {
      console.error("Error al agregar al carrito:", err);
    } finally {
      setLoading(false);
    }
  };



  const handleBuyNow = async () => {
    await handleAddToCart();
  };

  return (
    <div className="space-y-4">
      {/* Controles de cantidad + botón "Agregar al Carrito" */}
      <div className="flex items-center space-x-3">
        {/* Controles de cantidad + botón "Agregar al Carrito" */}
        <div className="flex w-full items-center space-x-3">
          {/* Input group compacto */}
          <div className="inline-flex items-center overflow-hidden rounded-md border border-gray-400">
            {/* Botón “–” más pequeño */}
            <button
              onClick={handleDecrement}
              disabled={loading}
              aria-label="Disminuir cantidad"
              className="px-2 py-1 text-gray-800 hover:bg-gray-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Minus size={12} />
            </button>

            {/* Display de cantidad */}
            <div className="px-3 py-1 text-center font-medium text-gray-800">
              {displayQuantity}
            </div>

            {/* Botón “+” más pequeño */}
            <button
              onClick={handleIncrement}
              disabled={loading}
              aria-label="Aumentar cantidad"
              className="px-2 py-1 text-gray-800 hover:bg-gray-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus size={12} />
            </button>
          </div>

          {/* Botón "Agregar al Carrito" que crece en el flex */}
          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="w-full flex-1 rounded bg-black px-4 py-2 font-favoritExpanded text-sm text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Agregando…" : "Agregar al Carrito"}
          </button>
        </div>
      </div>

      {/* Botón "Comprar Ahora" */}
      <button
        onClick={handleBuyNow}
        disabled={loading}
        className="w-full rounded border border-black px-4 py-2 font-favoritExpanded text-sm text-black transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Procesando…" : "Comprar Ahora"}
      </button>

      {/* Tarjetas de pago */}
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
