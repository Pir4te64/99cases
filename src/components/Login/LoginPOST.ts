// LoginPOST.js
import axios from "axios";
import { API } from "@/utils/Api";

const loginPOST = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API.login}`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

export default loginPOST;
