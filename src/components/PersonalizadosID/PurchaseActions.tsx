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
    price: number;
  };
  offscreenRef: React.RefObject<HTMLDivElement>;
}

export default function PurchaseActions({
  product,
  offscreenRef,
}: PurchaseActionsProps) {
  const [loading, setLoading] = useState(false);

  // Cantidad seleccionada y acciones del carrito
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

  // Si ya está en el carrito, usamos su cantidad
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
      // Generar la imagen de preview desde el offscreen
      let previewImage = product.imageSrc;
      if (offscreenRef.current) {
        const { width, height } =
          offscreenRef.current.getBoundingClientRect();
        const canvas = await html2canvas(offscreenRef.current, {
          useCORS: true,
          backgroundColor: null,
          width,
          height,
          scale: 300 / 96, // opcional: para 300 DPI
        });
        previewImage = canvas.toDataURL("image/png");
      }

      // Preparar el ítem
      const item: CartItem = {
        id: product.id,
        title: product.title,
        imageSrc: previewImage,
        price: product.price,
        quantity: displayQuantity,
      };

      // Agregar o actualizar
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
    // redirigir al checkout si lo tienes implementado
    // navigate("/checkout");
  };

  return (
    <div className="space-y-4">
      <div className="my-4 flex items-center space-x-3">
        <button
          onClick={handleDecrement}
          className="rounded border border-gray-400 p-1 hover:bg-gray-200 disabled:opacity-50"
          disabled={loading}
        >
          <Minus size={16} />
        </button>
        <span className="font-semibold">{displayQuantity}</span>
        <button
          onClick={handleIncrement}
          className="rounded border border-gray-400 p-1 hover:bg-gray-200 disabled:opacity-50"
          disabled={loading}
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
        <img src={tarjetas} alt="Tarjetas de pago" className="max-w-full" />
      </div>
    </div>
  );
}
