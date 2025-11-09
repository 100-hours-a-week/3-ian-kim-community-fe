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
