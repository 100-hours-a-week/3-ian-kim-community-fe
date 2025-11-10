import { navigateTo, ROUTES } from "../router/router.js";

const key = "loggedIn";

export const Auth = {
  isLoggedIn: () => localStorage.getItem(key),

  login: (userId) => {
    localStorage.setItem(key, userId);
  },

  logout: () => {
    localStorage.removeItem(key);
  },

  getAuth: () => {
    return Number(localStorage.getItem(key));
  },

  validateAuth: () => {
    if (!Auth.isLoggedIn()) {
      alert("로그인이 필요합니다.");
      navigateTo(ROUTES.LOGIN);
      return false;
    }
    return true;
  },
};
