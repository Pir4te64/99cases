export const baseURL = "https://api-cases99.nourish.com.ar/v1/";

export const API = {
  login: `${baseURL}/login`,
  register: `${baseURL}/register`,
  createCase: `${baseURL}/cases/create`,
  updateCaseImage: `${baseURL}/cases/upload-image`,
  models: `${baseURL}/phone-models/create`,
  modelsGetAll: `${baseURL}/phone-models/get-all`,
  colors: `${baseURL}/cases/colors/create`,
  colorsGetAll: `${baseURL}/cases/colors/get-all`,
  materials: `${baseURL}/materials/create`,
  materialsGetAll: `${baseURL}/materials/get-all`,
  order: `${baseURL}/orders/create`,
  orderGetAll: `${baseURL}/orders/get-all`,
};
