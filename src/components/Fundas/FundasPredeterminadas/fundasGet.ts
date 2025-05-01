import axios from "axios";
import { API } from "@/utils/Api";

export interface Product {
  id: number | string;
  imageSrc: string;
  imageFinal: string;
  title: string;
  price: string;
  oldPrice: string;
  description: string;
  descuento: number;
  predeterminado: boolean;
}

// Tipado crudo según lo que devuelve tu API
interface RawApiProduct {
  id: number;
  imagen: { url: string };
  imagenFinal: { url: string };
  nombre: string;
  precio: number;
  oldPrice?: number;
  descripcion: string;
  descuento?: number;
  predeterminado: boolean;
}

// Adaptador de RawApiProduct → Product
const adaptProduct = (api: RawApiProduct): Product => ({
  id: api.id,
  imageSrc: api.imagen.url,
  imageFinal: api.imagenFinal.url,
  title: api.nombre,
  price: `$${api.precio}`,
  oldPrice: api.oldPrice !== undefined ? `$${api.oldPrice}` : "",
  description: api.descripcion,
  descuento: api.descuento ?? 0,
  predeterminado: api.predeterminado,
});

/**
 * Obtiene los datos de la API y los adapta al interfaz Product.
 */
export const fetchAndAdaptProducts = async (): Promise<Product[]> => {
  try {
<<<<<<< HEAD
    const resp = await axios.get<RawApiProduct[]>(API.getAllCases, {
=======
    // Obtiene el token desde localStorage
    const token = sessionStorage.getItem("token");

    const response = await axios.get(API.getAllCases, {
>>>>>>> 68b566cda78864ad1b01fe26fd881ba4141844cc
      headers: {
        "Content-Type": "application/json",
      },
    });
    return resp.data.map(adaptProduct);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return [];
  }
};
