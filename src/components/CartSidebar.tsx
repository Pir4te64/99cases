import { X, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Importa SweetAlert2
import useCartStore from "@/store/cartStore";
import { API } from "@/utils/Api";

export default function CartSidebar() {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    subtotal,
    total,
    updateItemQuantity,
    removeFromCart,
  } = useCartStore();
  const setIdOrdenCompra = useCartStore((state) => state.setIdOrdenCompra);
  const navigate = useNavigate();

  // Función para remover un producto.
  const removeItem = (id: string): void => {
    removeFromCart(id);
  };

  // Funciones para incrementar y decrementar la cantidad.
  const decreaseQuantity = (id: string, currentQuantity: number): void => {
    if (currentQuantity <= 1) {
      removeFromCart(id);
    } else {
      updateItemQuantity(id, currentQuantity - 1);
    }
  };

  const increaseQuantity = (id: string, currentQuantity: number): void => {
    updateItemQuantity(id, currentQuantity + 1);
  };

  // Función que construye el array orderItems en el formato requerido.
  // Cada objeto tendrá: { caseId, modeloId, materialId }.
  const buildOrderItems = () => {
    const orderItems = cartItems.map((item) => ({
      // caseId: el id del producto (llega como string, se convierte a number).
      caseId: parseInt(item.id, 10),
      // modeloId: el id del modelo seleccionado; si no está definido se envía 1.
      modeloId: item.selectedModel
        ? parseInt(item.selectedModel.toString(), 10)
        : 1,
      // materialId: según lo requerido, siempre va 1.
      materialId: 1,
    }));
    return orderItems;
  };

  // Función para convertir cada URL de imagen a Blob y agregarlo a FormData.
  const appendImagesFromURLs = async (formData: FormData) => {
    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      if (item.imageSrc && typeof item.imageSrc === "string") {
        try {
          const response = await fetch(item.imageSrc);
          const blob = await response.blob();
          // Asignamos un nombre de archivo, por ejemplo "case-<id>.png"
          const fileName = `case-${item.id}.png`;
          formData.append("images", blob, fileName);
        } catch (error) {
          console.error("Error al convertir la imagen a blob:", error);
        }
      }
    }
  };

  // Función que imprime en consola el contenido del FormData.
  const printFormData = (formData: FormData) => {
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  };

  // Función para crear la orden usando Axios, enviando los datos mediante FormData.
  const createOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Usuario no autenticado. Por favor, inicia sesión.",
      });
      return null;
    }

    const orderItems = buildOrderItems();

    // Creamos un nuevo objeto FormData.
    const formData = new FormData();
    // Agregamos orderItems como string JSON.
    formData.append("orderItems", JSON.stringify(orderItems));

    // Agregamos las imágenes: se convierten de URL a Blob y se añaden.
    await appendImagesFromURLs(formData);

    // Imprimimos en consola el contenido del FormData para depuración.
    printFormData(formData);

    try {
      const response = await axios.post(API.order, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Retornamos la respuesta completa de la orden.
      return response.data;
    } catch (error) {
      console.error("Error creando la orden:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error al procesar la orden.",
      });
      return null;
    }
  };

  // Función para iniciar la compra:
  // Muestra un modal de confirmación con SweetAlert2,
  // muestra un loading mientras espera la promesa y luego redirige si es exitoso.
  const handleIniciarCompra = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "¿Desea continuar?",
      text: "Se va a iniciar el proceso de compra",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "Cancelar",
    });

    if (isConfirmed) {
      // Mostramos un modal de loading que se cierra al completarse la promesa
      Swal.fire({
        title: "Procesando...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const orderResponse = await createOrder();
      console.log("Orden Response en handleIniciarCompra:", orderResponse);

      // Cerramos el modal de loading
      Swal.close();

      if (orderResponse) {
        setIdOrdenCompra(orderResponse.id);
        navigate("/pagos", {
          state: {
            cartItems,
            subtotal,
            total,
          },
        });
      }
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}>
      {/* Encabezado */}
      <div className='border-b flex justify-between items-center bg-gray-400 w-full p-4'>
        <h2 className='font-favoritExpandedBook text-black tracking-wide'>
          CARRITO DE COMPRAS
        </h2>
        <button onClick={closeCart}>
          <X className='h-5 w-5 text-black' />
        </button>
      </div>

      {/* Contenedor de productos y resumen */}
      <div className='p-4 h-[600px] overflow-y-auto'>
        {cartItems.length > 0 ? (
          <ul className='space-y-4'>
            {cartItems.map((item) => (
              <li key={item.id} className='border-b border-black pb-4'>
                <div className='flex items-start space-x-3'>
                  <img
                    src={typeof item.imageSrc === "string" ? item.imageSrc : ""}
                    alt={item.title}
                    className='h-auto w-20 object-cover'
                  />
                  <div className='flex-1'>
                    <div className='flex justify-between items-start'>
                      <p className='uppercase font-bold text-sm leading-tight text-black font-favoritExpandedBook'>
                        FUNDA 99% CASES - {item.title}
                      </p>
                      <button
                        className='text-xs underline text-black font-favoritExpandedBook'
                        onClick={() => removeItem(item.id)}>
                        BORRAR
                      </button>
                    </div>
                    <p className='mt-1 text-sm text-black font-favoritExpandedBook'>
                      {item.price}
                    </p>
                    <div className='mt-2 inline-flex items-center bg-gray-200 px-2 py-1 rounded'>
                      <button
                        onClick={() => decreaseQuantity(item.id, item.quantity)}
                        className='flex items-center justify-center p-1'>
                        <Minus size={16} className='text-black' />
                      </button>
                      <span className='mx-2 text-red-600'>{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id, item.quantity)}
                        className='flex items-center justify-center p-1'>
                        <Plus size={16} className='text-black' />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-black'>El carrito está vacío.</p>
        )}

        {cartItems.length > 0 && (
          <div className='mt-4'>
            <div className='border-black pt-4'>
              <div className='flex justify-between mb-2'>
                <span className='text-sm uppercase text-black font-favoritExpandedBook'>
                  SUBTOTAL (sin envío)
                </span>
                <span className='text-sm font-bold text-black font-favoritExpandedBook'>
                  $
                  {subtotal.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className='flex justify-between mb-4'>
                <span className='text-sm uppercase text-black font-favoritExpandedBook'>
                  TOTAL
                </span>
                <span className='text-sm font-bold text-black font-favoritExpandedBook'>
                  ${total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <button
              onClick={handleIniciarCompra}
              className='bg-black text-white w-full py-2 mb-2 rounded font-favoritExpandedBook'>
              INICIAR COMPRA
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
