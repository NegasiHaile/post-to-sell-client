import axios from "axios";
import { server } from "../utils/server";

export const api_getAllAdverts = async () => {
  return await axios.get(`${server}/api/adverts/list`);
};
