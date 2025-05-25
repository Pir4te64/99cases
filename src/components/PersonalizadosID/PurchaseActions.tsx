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
      const container = previewRef.current;
      if (!container) throw new Error("Vista previa no disponible");

      /* 1️⃣ Captura del contenedor completo */
      const fullCanvas = await html2canvas(container, {
        useCORS: true,
        backgroundColor: null,
        scale: window.devicePixelRatio || 2,
      });

      /* 2️⃣ Ubicar el <img> de la funda dentro del contenedor */
      const phoneImg = container.querySelector("img");   // el primero es la funda base
      if (!phoneImg) throw new Error("No se encontró la imagen de la funda");

      const phoneRect = phoneImg.getBoundingClientRect();
      const contRect = container.getBoundingClientRect();

      // Coordenadas relativas al contenedor
      const sx = phoneRect.left - contRect.left;
      const sy = phoneRect.top - contRect.top;
      const sw = phoneRect.width;
      const sh = phoneRect.height;

      /* 3️⃣ Recortar esa región en un nuevo canvas */
      const cropCanvas = document.createElement("canvas");
      cropCanvas.width = sw;
      cropCanvas.height = sh;
      const ctx = cropCanvas.getContext("2d")!;
      ctx.drawImage(fullCanvas, sx, sy, sw, sh, 0, 0, sw, sh);

      const dataURL = cropCanvas.toDataURL("image/png");

      /* 4️⃣ Crear / actualizar ítem de carrito */
      const item: CartItem = {
        id: product.id,
        title: product.title,
        imageSrc: dataURL,                // miniatura optimizada
        price: product.price,
        quantity: displayQuantity,
        imageFinalUrl: product.imageFinal // seguimos guardando la URL final
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
