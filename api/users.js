import { server } from "../utils/server";

import axios from "axios";

export const api_getAllUsers = async () => {
  return await axios.get(`${server}/api/users/list`);
};
