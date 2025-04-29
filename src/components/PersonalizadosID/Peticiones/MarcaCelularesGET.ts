import axios from "axios";
import { API } from "@/utils/Api";

export interface PhoneModel {
  value: string;
  label: string;
  marca: string;
  modelo: string;
  id: number;
}

export const fetchPhoneModels = async (): Promise<PhoneModel[]> => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("Token no encontrado en localStorage");
  }
  try {
    const response = await axios.get(API.modelsGetAll, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Se asume que la respuesta tiene la forma correcta: un arreglo de PhoneModel

    return response.data;
  } catch (error) {
    console.error("Error al obtener los modelos de celular:", error);
    throw error;
  }
};
