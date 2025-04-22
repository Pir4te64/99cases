import axios from "axios";
import { API } from "@/utils/Api";

const registerPOST = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API.register}`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error en el registro:", error);
    throw error;
  }
};

export default registerPOST;
