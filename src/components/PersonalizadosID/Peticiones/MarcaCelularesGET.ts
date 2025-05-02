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
  
  try {
    const response = await axios.get(API.modelsGetAll
    );
    // Se asume que la respuesta tiene la forma correcta: un arreglo de PhoneModel

    return response.data;
  } catch (error) {
    console.error("Error al obtener los modelos de celular:", error);
    throw error;
  }
};
