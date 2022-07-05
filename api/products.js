import axios from "axios";
import { server } from "../utils/server";
export const api_getAllActiveProducts = async () => {
  return await axios.get(`${server}/api/products/list/all/active`);
};

export const api_getAllFeaturedProducts = async () => {
  return await axios.get(`${server}/api/products/list/all/featured`);
};
export const api_getAllUserProducts = async (userId, token) => {
  return await axios.get(`${server}/api/products/list/all/user/${userId}`, {
    headers: {
      Authorization: token,
    },
  });
};
export const api_deleteProduct = async (id, token) => {
  return await axios.delete(`${server}/api/products/delete/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const api_editProduct = async (id, data, header) => {
  console.log("data", data);
  return await axios.put(
    `${server}/api/products/edit/${id}`,
    { ...data },
    header
  );
};

export const api_addProductImage = async (id, data, header) => {
  return await axios.put(
    `${server}/api/products/add/image/${id}`,
    data,
    header
  );
};

export const api_editProductImage = async (id, data, header) => {
  console.log("data", data);
  return await axios.put(
    `${server}/api/products/edit/image/${id}`,
    data,
    header
  );
};

export const api_deleteProductImage = async (id, url, token) => {
  return await axios.put(
    `${server}/api/products/delete/image/${id}?imagePath=${url}`,
    id,
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

export const api_updateProductPaymentStatus = async (
  id,
  payFor,
  accesstoken
) => {
  return await axios.put(
    `${server}/api/products/payment/update_status/${id}`,
    { payFor },
    {
      headers: {
        Authorization: accesstoken,
      },
    }
  );
};
