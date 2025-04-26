import { jwtDecode } from "jwt-decode";

  function setToken(token) {
    localStorage.setItem("auth_token", token);
  }
  
  function removeToken() {
    localStorage.removeItem("auth_token");
  }
  
  function hasToken() {
    return Object.hasOwn(localStorage, "auth_token");
  }
  
  function getToken() {
    return localStorage.getItem("auth_token");
  }

  function getDecodedToken() {
    const token = getToken();
    if (!token) {
      return null;
    }
    return jwtDecode(token);
  }
  
  export const storage = {
    setToken,
    hasToken,
    getToken,
    removeToken,
    getDecodedToken,
  };