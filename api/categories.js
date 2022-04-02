import axios from "axios";
import { server } from "../utils/server";

export const api_getAllCategories = async () => {
  return await axios.get(`${server}/api/categories/list`);
};
