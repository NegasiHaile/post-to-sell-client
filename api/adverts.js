import validToken from "./validateToken";
import axios from "axios";
import { server } from "../utils/server";

export const api_addAdvert = async (data, user) => {
  if (validToken(user.accesstoken))
    return await axios.post(`${server}/api/adverts/add`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: user.accesstoken,
      },
    });
};

export const api_getAllAdverts = async () => {
  return await axios.get(`${server}/api/adverts/list`);
};

export const api_getAllUserAdverts = async (user) => {
  if (validToken(user.accesstoken))
    return await axios.get(`${server}/api/adverts/list/user/${user.id}`, {
      headers: {
        Authorization: user.accesstoken,
      },
    });
};

export const api_deleteAdvert = async (user, id) => {
  if (validToken(user.accesstoken))
    return await axios.delete(`${server}/api/adverts/delete/${id}`, {
      headers: {
        Authorization: user.accesstoken,
      },
    });
};

export const api_editAdvert = async (data, user, advertId) => {
  if (validToken(user.accesstoken))
    return await axios.put(`${server}/api/adverts/edit/${advertId}`, data, {
      headers: {
        Authorization: user.accesstoken,
      },
    });
};

export const api_editAdvertBanner = async (data, user, advertId) => {
  if (validToken(user.accesstoken))
    return await axios.put(
      `${server}/api/adverts/edit/banner/${advertId}`,
      data,
      {
        headers: {
          Authorization: user.accesstoken,
        },
      }
    );
};
