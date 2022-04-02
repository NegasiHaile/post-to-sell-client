import axios from "axios";
import { server } from "../utils/server";

export const api_getAllBanners = async () => {
  return await axios.get(`${server}/api/banners/list`);
};
