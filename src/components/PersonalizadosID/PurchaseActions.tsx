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
import { API } from "@/utils/Api";


const mergeImagesWithBackend = async (caseId: string, calcoFile: Blob) => {
  try {
    const formData = new FormData();
    formData.append('caseId', caseId);
    formData.append('calcoFile', calcoFile, 'letras-numeros.png');

    const token = localStorage.getItem('token');
    const response = await fetch(API.mergeImages, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    // Intentar obtener el texto de la respuesta primero
    const responseText = await response.text();
    console.log('Respuesta del servidor (texto):', responseText);

    // Intentar parsear como JSON solo si parece ser JSON válido
    try {
      const data = JSON.parse(responseText);
      console.log('Respuesta del servidor (JSON):', data);
      return data;
    } catch (e) {
      // Si no es JSON, devolver el texto de la respuesta
      return responseText;
    }
  } catch (error) {
    console.error('Error al enviar imágenes al servidor:', error);
    throw error;
  }
};

/** Genera un Blob PNG transparente solo del área de letras y números */
const generateCalcoBlob = async (previewRef: React.RefObject<HTMLElement>) => {
  if (!previewRef.current) throw new Error("Vista previa no disponible");
  const target = previewRef.current.querySelector('#texto-numeros-container') as HTMLElement | null;
  if (!target) throw new Error("No se encontró el área de letras y números para descargar");

  const textCanvas = await html2canvas(target, {
    useCORS: true,
    backgroundColor: null,
    scale: 2,
    logging: false,
    allowTaint: true,
    onclone: (clonedDoc) => {
      const textContainer = clonedDoc.querySelector('#texto-numeros-container');
      if (textContainer) {
        const spans = textContainer.querySelectorAll('span');
        if (spans.length > 1) {
          spans[0].style.marginBottom = '2.5rem';
          spans[1].style.marginTop = '.5rem';
          spans[1].style.fontSize = '3rem';
          spans[1].style.display = 'block';
          spans[1].style.textAlign = 'center';
          spans[1].style.marginLeft = '0';
          spans[1].style.marginRight = '0';
        }
      }
    }
  });

  return await new Promise<Blob>((resolve) => {
    textCanvas.toBlob((blob) => {
      if (blob) resolve(blob);
    }, 'image/png', 1.0);
  });
};

export default function PurchaseActions({ product, previewRef }: PurchaseActionsProps) {
  const [loading, setLoading] = useState(false);
  console.log(product);
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
      let calcosBlob: Blob | undefined = undefined;
      let imageFinalUrl: string | null = null;
      if (product.tipo === "PERSONALIZADO_CON_CARACTERES" || product.description === "PERSONALIZADO_CON_CARACTERES_DOWN") {
        // Generar el calcoFile correcto (solo letras y números)
        calcosBlob = await generateCalcoBlob(previewRef);

        // Enviar al backend y guardar la URL recibida
        if (calcosBlob) {
          const response = await mergeImagesWithBackend(product.id, calcosBlob);
          if (typeof response === "string" && response.startsWith("http")) {
            imageFinalUrl = response;
          } else if (response?.url) {
            imageFinalUrl = response.url;
          }
        }

        // El resto igual que antes (para la miniatura general)
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
              const originalWidth = element.offsetWidth;
              const originalHeight = element.offsetHeight;
              const aspectRatio = originalHeight / originalWidth;
              element.style.width = '300px';
              element.style.height = `${350 * aspectRatio}px`;
              element.style.transform = 'none';
            }
          }
        });

        // Convertir canvas a Blob para imageSrc
        const blob = await new Promise<Blob>((resolve) => {
          textCanvas.toBlob((blob) => {
            if (blob) resolve(blob);
          }, 'image/png', 1.0);
        });
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

        finalDataURL = URL.createObjectURL(blob);
      }

      const item: CartItem = {
        id: product.id,
        title: product.title,
        imageSrc: finalDataURL,
        price: product.price,
        quantity: displayQuantity,
        imageFinalUrl: product.imageFinal ?? imageFinalUrl ?? null,
        tipo: product.tipo,
        ...(calcosBlob ? { calcosBlob } : {}),
      };

      cartItem
        ? (updateItemQuantity(product.id, displayQuantity, calcosBlob),
          imageFinalUrl && (() => {
            const cartItems = useCartStore.getState().cartItems;
            const idx = cartItems.findIndex(it => it.id === product.id);
            if (idx !== -1) {
              cartItems[idx].imageFinalUrl = imageFinalUrl;
              useCartStore.setState({ cartItems: [...cartItems] });
            }
          })())
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

  const handleDownloadText = async () => {
    if (!previewRef.current) return;
    try {
      setLoading(true);
      const blob = await generateCalcoBlob(previewRef);

      // Guardar el blob en el item del carrito correspondiente
      const cartItems = useCartStore.getState().cartItems;
      const cartItem = cartItems.find((it) => it.id === product.id);
      if (cartItem) {
        useCartStore.getState().updateItemQuantity(product.id, cartItem.quantity, blob);
      }

      // Crear URL del Blob y descargar
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'letras-numeros.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Texto y números descargados correctamente", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (err) {
      console.error("Error al descargar el texto:", err);
      toast.error("No se pudo descargar el texto");
    } finally {
      setLoading(false);
    }
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

        {/* Botón de descarga */}
        <button
          onClick={handleDownloadText}
          disabled={loading || !isReady}
          className="w-full rounded border border-blue-500 px-4 py-2 font-favoritExpanded text-sm uppercase text-blue-500 hover:bg-blue-500 hover:text-white disabled:opacity-50"
        >
          {loading ? "Descargando…" : "Descargar Letras + Números"}
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
