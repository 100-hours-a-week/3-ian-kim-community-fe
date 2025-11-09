import { navigateTo, ROUTES } from "../router/router.js";

const key = "isLoggedIn";

export const Auth = {
  isLoggedIn: () => localStorage.getItem(key),

  login: () => {
    localStorage.setItem(key, true);
  },

  logout: () => {
    localStorage.removeItem(key);
  },
};

export const validateAuth = () => {
  if (!Auth.isLoggedIn) {
    alert("로그인이 필요합니다.");
    navigateTo(ROUTES.LOGIN);
  }
};
