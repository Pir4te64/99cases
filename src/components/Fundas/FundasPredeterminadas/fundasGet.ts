import axios from "axios";
import { API } from "@/utils/Api";

export interface Product {
  id: number | string;
  discount: string;
  imageSrc: string;
  title: string;
  price: string;
  oldPrice: string;
  cantidadesVendidos: number;
  description: string;
}

export const products: Product[] = [];

// Función para adaptar el producto recibido desde la API
const adaptProduct = (apiProduct: any): Product => {
  return {
    id: apiProduct.id || "",
    discount: apiProduct.discount || "",
    imageSrc: apiProduct.imagen?.url || "",
    title: apiProduct.nombre || "",
    price: apiProduct.precio !== undefined ? `$${apiProduct.precio}` : "",
    oldPrice: apiProduct.oldPrice || "",
    cantidadesVendidos:
      apiProduct.cantidadesVendidos !== undefined
        ? apiProduct.cantidadesVendidos
        : 0,
    description: apiProduct.descripcion || "",
  };
};

const fetchAndAdaptProducts = async () => {
  try {
    // Obtiene el token desde localStorage
    const token = localStorage.getItem("token");

    const response = await axios.get(API.getAllCases, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Se asume que response.data es un array de productos
    const apiProducts = response.data;
    const adaptedProducts = apiProducts.map((prod: any) => adaptProduct(prod));

    // Actualiza el arreglo exportado: se muta el array para conservar la referencia
    products.splice(0, products.length, ...adaptedProducts);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }
};

// Se ejecuta la petición al cargar el módulo
fetchAndAdaptProducts();
