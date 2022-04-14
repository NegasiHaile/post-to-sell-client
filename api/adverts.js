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

export const api_getAllUserAdverts = async (user) => {
  return await axios.get(`${server}/api/adverts/list/user/${user.id}`, {
    headers: {
      Authorization: user.accesstoken,
    },
  });
};

export const api_deleteAdvert = async (user, id) => {
  return await axios.delete(`${server}/api/adverts/delete/${id}`, {
    headers: {
      Authorization: user.accesstoken,
    },
  });
};
