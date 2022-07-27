import { apiRefreshToken } from "./users.js";
import decode from "jwt-decode";
function validToken(acssToken) {
  if (acssToken) {
    const decodedAccesssToken = decode(acssToken);
    // check if the access token is not expired continue
    if (decodedAccesssToken.exp * 1000 > new Date().getTime()) {
      return true;
    } else {
      localStorage.clear();
      window.location.href = "/";
    }
  } else {
    localStorage.clear();
    window.location.href = "/";
  }
}

export default validToken;
