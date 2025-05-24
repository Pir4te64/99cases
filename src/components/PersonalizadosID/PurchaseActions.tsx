// src/components/PersonalizadosID/PurchaseActions.tsx

import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import html2canvas from "html2canvas";
import tarjetas from "@/assets/predetermiandasCases/tarjetas.png";
import useCartStore, { CartItem } from "@/store/cartStore";

interface PurchaseActionsProps {
  product: {
    id: string;
    title: string;
    imageSrc: string;
    imageFinal: string; // URL SVG con texto + número pre-renderizado
    price: number;
    tipo:
    | "PERSONALIZADO_CON_IMAGEN"
    | "PERSONALIZADO_CON_CARACTERES"
    | "PERSONALIZADO";
  };
  previewRef: React.RefObject<HTMLDivElement>;
}

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
      let previewImage: string;

      if (product.tipo === "PERSONALIZADO_CON_CARACTERES") {
        // 1) Si tenemos el contenedor de preview...
        if (previewRef.current) {
          const el = previewRef.current;

          // Guarda estilo previo para restaurar luego
          const prevBg = el.style.backgroundImage;

          // Aplica imageFinal como fondo
          el.style.backgroundImage = `url(${product.imageFinal})`;
          el.style.backgroundSize = "contain";
          el.style.backgroundPosition = "center";
          el.style.backgroundRepeat = "no-repeat";

          // Captura con html2canvas
          const { width, height } = el.getBoundingClientRect();
          const canvas = await html2canvas(el, {
            useCORS: true,
            backgroundColor: null,
            width,
            height,
            scale: 300 / 96,
          });
          previewImage = canvas.toDataURL("image/png");

          // Restaura estilo original
          el.style.backgroundImage = prevBg;
        } else {
          // Fallback si previewRef no está
          previewImage = product.imageFinal;
        }

      } else if (previewRef.current) {
        // Lógica existente para PERSONALIZADO_CON_IMAGEN y PERSONALIZADO
        const { width, height } = previewRef.current.getBoundingClientRect();
        const canvas = await html2canvas(previewRef.current, {
          useCORS: true,
          backgroundColor: null,
          width,
          height,
          scale: 300 / 96,
        });
        previewImage = canvas.toDataURL("image/png");

      } else {
        // Fallback general
        previewImage = product.imageSrc;
      }

      const item: CartItem = {
        id: product.id,
        title: product.title,
        imageSrc: previewImage,
        price: product.price,
        quantity: displayQuantity,
      };

      if (cartItem) {
        updateItemQuantity(product.id, displayQuantity);
      } else {
        addToCart(item);
      }
      openCart();

    } catch (err) {
      console.error("Error al generar imagen para el carrito:", err);
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
        <div className="flex items-center space-x-3">
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
            className="flex-1 rounded bg-black px-4 py-2 font-favoritExpanded text-sm text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
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
