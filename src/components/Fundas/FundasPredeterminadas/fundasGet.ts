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
  tipo: string;
  precioDescuento: number;
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
  tipo: string;
  precioDescuento: number;
}

// Adaptador de RawApiProduct → Product
const adaptProduct = (api: RawApiProduct): Product => ({
  id: api.id,
  imageSrc: api.imagen.url,
  imageFinal: api.imagenFinal.url,
  title: api.nombre,
  price: `$${api.precio}`,
  oldPrice: api.precioDescuento !== undefined ? `$${api.precioDescuento}` : "",
  description: api.descripcion,
  descuento: api.descuento ?? 0,
  predeterminado: api.predeterminado,
  tipo: api.tipo,
  precioDescuento: api.precioDescuento,
});

/**
 * Obtiene los datos de la API y los adapta al interfaz Product.
 */
export const fetchAndAdaptProducts = async (): Promise<Product[]> => {
  try {
    const resp = await axios.get<RawApiProduct[]>(API.getAllCases, {
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
