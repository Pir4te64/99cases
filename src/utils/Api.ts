export const baseURL = "https://cases99.cruznegradev.com/v1";

export const API = {
  login: `${baseURL}/login`,
  register: `${baseURL}/register`,
  createCase: `${baseURL}/cases/create`,
  getAllCases: `${baseURL}/cases/get-all`,
  updateCaseImage: `${baseURL}/cases/upload-image`,
  models: `${baseURL}/phone-models/create`,
  modelsGetAll: `${baseURL}/phone-models/get-all`,
  colors: `${baseURL}/cases/colors/create`,
  colorsGetAll: `${baseURL}/cases/colors/get-all`,
  materials: `${baseURL}/materials/create`,
  materialsGetAll: `${baseURL}/materials/get-all`,
  order: `${baseURL}/orders/create`,
  orderGetAll: `${baseURL}/orders/get-all`,
  delivery: `${baseURL}/delivery/create`,
  createPayment: `${baseURL}/payments/create`,
};
