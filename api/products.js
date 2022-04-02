import axios from "axios";
import { server } from "../utils/server";
export const api_getAllProducts = async () => {
  return await axios.get(`${server}/api/products/list/all`);
};

export const api_deleteProduct = async () => {
  return "deleted";
};
