// src/hooks/useCheckout.ts
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { API } from "@/utils/Api";
import useCartStore from "@/store/cartStore";

/**
 * Hook para unificar la lógica de checkout en toda la app,
 * con logs detallados antes de enviar la orden.
 */
export function useCheckout() {
  const navigate = useNavigate();
  const { cartItems, subtotal, total, setIdOrdenCompra } = useCartStore();

  /** Construye los items para la orden en el formato requerido por el backend */
  const buildOrderItems = () =>
    cartItems.map(item => ({
      caseId: parseInt(item.id, 10),
      modeloId: item.selectedModel
        ? parseInt(item.selectedModel.toString(), 10)
        : 1,
      materialId: 1,
    }));

  /** Agrega al FormData las imágenes obtenidas desde las URLs. */
  const appendImagesFromURLs = async (formData: FormData) => {
    for (const item of cartItems) {
      if (typeof item.imageSrc === "string") {
        try {
          const resp = await fetch(item.imageSrc);
          const blob = await resp.blob();
          formData.append("images", blob, `case-${item.id}.png`);
        } catch (e) {
          console.error("Error al convertir imagen a Blob:", e);
        }
      }
    }
  };

  /** Llama al endpoint de creación de orden con FormData */
  const createOrder = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Usuario no autenticado. Por favor, inicia sesión.",
        confirmButtonText: "Ir a login",
        showConfirmButton: true,
        timer: 2000,
      }).then(() => {
        navigate("/login");
      });
      return null;
    }

    const orderItems = buildOrderItems();
    const formData = new FormData();
    formData.append("orderItems", JSON.stringify(orderItems));
    await appendImagesFromURLs(formData);

    // --- Aquí imprimimos TODO lo que vamos a enviar ---
    console.log("=== Preparando orden para enviar ===");
    console.log("Cart Items:", cartItems);
    console.log("Subtotal:", subtotal, "Total:", total);
    console.log("orderItems payload:", orderItems);

    // Para inspeccionar el FormData:
    for (const [key, value] of formData.entries()) {
      // Si el value es Blob, mostrar su tipo y tamaño
      if (value instanceof Blob) {
        console.log(`FormData entry: ${key} → Blob [type: ${value.type}, size: ${value.size}]`);
      } else {
        console.log(`FormData entry: ${key} → ${value}`);
      }
    }
    console.log("=== Fin de la impresión de datos ===");
    // --------------------------------------

    try {
      const { data } = await axios.post(API.order, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Orden creada:", data);
      return data;
    } catch (e) {
      console.error("Error creando la orden:", e);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error al procesar la orden.",
      });
      return null;
    }
  };

  /** Flujo de confirmación, creación de orden y redirección */
  const handleCheckout = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "¿Desea continuar?",
      text: "Se va a iniciar el proceso de compra",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "Cancelar",
    });
    if (!isConfirmed) return;

    console.log("Continuando con el checkout...");

    // Mostramos el modal de loading SIN await
    Swal.fire({
      title: "Procesando...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    // Ahora sí ejecutamos la petición y veremos los console.log() dentro de createOrder
    const order = await createOrder();

    // Cerramos el modal de loading
    Swal.close();

    if (order) {
      setIdOrdenCompra(order.id);
      navigate("/pagos", { state: { cartItems, subtotal, total } });
    }
  };


  return { handleCheckout };
}
