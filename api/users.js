import { server } from "../utils/server";
import validToken from "./validateToken";
import axios from "axios";

// Refresh token
export const apiRefreshToken = async (refreshToken) => {
  return await axios.post(`${server}/api/users/refresh_token`, {
    token: refreshToken,
  });
};

// Get all list of user
export const api_getAllUsers = async () => {
  return await axios.get(`${server}/api/users/list`);
};

// Get user profile
export const api_getUserProfile = async (token) => {
  if (validToken(token))
    return await axios.get(`${server}/api/users/profile`, {
      headers: {
        Authorization: token,
      },
    });
};

// Get user profile
export const api_ChangeMyPassword = async (userAuth, data) => {
  if (validToken(userAuth.accesstoken))
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
  if (validToken(user.accesstoken))
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

// Schedule notification
export const api_scheduleNotification = async (user, data) => {
  if (validToken(user.accesstoken))
    return await axios.put(
      `${server}/api/schedule_notification/${user.id}`,
      { ...data },
      {
        headers: {
          Authorization: user.accesstoken,
        },
      }
    );
};

// Update notifications statuses
export const api_UpdateNotificationStatusToSeen = async (user) => {
  if (validToken(user.accesstoken))
    return await axios.put(
      `${server}/api/users/update_notification_status/${user.id}`,
      { user },
      {
        headers: {
          Authorization: user.accesstoken,
        },
      }
    );
};

// Delete user notification
export const api_DeleteUserNotification = async (user, notificationId) => {
  if (validToken(user.accesstoken))
    return await axios.put(
      `${server}/api/users/delete_notification/${user.id}`,
      { notificationId: `${notificationId}` },
      {
        headers: {
          Authorization: user.accesstoken,
        },
      }
    );
};
