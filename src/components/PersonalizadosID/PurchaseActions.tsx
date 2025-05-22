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
    // navigate("/checkout");
  };

  return (
    <div className="space-y-4">
      <div className="my-4 flex items-center space-x-3">
        <button
          onClick={handleDecrement}
          disabled={loading}
          className="rounded border border-gray-400 p-1 hover:bg-gray-200 disabled:opacity-50"
        >
          <Minus size={16} />
        </button>
        <span className="font-semibold">{displayQuantity}</span>
        <button
          onClick={handleIncrement}
          disabled={loading}
          className="rounded border border-gray-400 p-1 hover:bg-gray-200 disabled:opacity-50"
        >
          <Plus size={16} />
        </button>
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="w-full rounded bg-black px-4 py-2 text-white transition hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Agregando…" : "Agregar al Carrito"}
        </button>
      </div>

      <button
        onClick={handleBuyNow}
        disabled={loading}
        className="w-full rounded border border-black px-4 py-2 text-black transition hover:bg-black hover:text-white disabled:opacity-50"
      >
        {loading ? "Procesando…" : "Comprar Ahora"}
      </button>

      <div className="flex justify-center">
        <img
          src={tarjetas}
          alt="Tarjetas de pago"
          className="max-w-full"
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    </div>
  );
}
