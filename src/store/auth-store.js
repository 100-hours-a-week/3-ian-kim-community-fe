import { navigateTo, ROUTES } from "../router/router.js";

const loginKey = "loggedIn";
const profileKey = "profile";

export const Auth = {
  isLoggedIn: () => sessionStorage.getItem(loginKey),

  login: (userId, profile) => {
    sessionStorage.setItem(loginKey, userId);
    sessionStorage.setItem(profileKey, profile);
  },

  logout: () => {
    sessionStorage.removeItem(loginKey);
    sessionStorage.removeItem(profileKey);
  },

  getAuth: () => {
    return Number(sessionStorage.getItem(loginKey));
  },

  updateProfile: (profile) => {
    sessionStorage.setItem(profileKey, profile);
  },

  getProfile: () => {
    return sessionStorage.getItem(profileKey);
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
