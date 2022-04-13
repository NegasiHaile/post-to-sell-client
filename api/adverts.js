import axios from "axios";
import { server } from "../utils/server";

export const api_addAdvert = async (data, token) => {
  console.log(token);
  return await axios.post(`${server}/api/adverts/add`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token.user.accesstoken,
    },
  });
};

export const api_getAllAdverts = async () => {
  return await axios.get(`${server}/api/adverts/list`);
};
