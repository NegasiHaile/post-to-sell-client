import { server } from "../utils/server";

import axios from "axios";

export const api_getAllUsers = async () => {
  return await axios.get(`${server}/api/users/list`);
};

// Get user profile
export const api_getUserProfile = async (token) => {
  return await axios.get(`${server}/api/users/profile`, {
    headers: {
      Authorization: token,
    },
  });
};

// Get user profile
export const api_ChangeMyPassword = async (userAuth, data) => {
  return await axios.put(
    `${server}/api/users/change_my_password`,
    { ...data },
    {
      headers: {
        Authorization: userAuth.accesstoken,
      },
    }
  );
};

// Edit user profile
export const api_editUserProfile = async (user, data) => {
  return await axios.put(
    `${server}/api/users/edit/${user.id}`,
    { ...data },
    {
      headers: {
        Authorization: user.accesstoken,
      },
    }
  );
};
