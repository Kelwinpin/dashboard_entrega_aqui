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
  
  export const storage = {
    setToken,
    hasToken,
    getToken,
    removeToken,
  };