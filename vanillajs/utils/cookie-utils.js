export const getCookie = (name) => {
  return document.cookie
    .split("; ")
    .find((item) => item.startsWith(name + "="))
    ?.split("=")[1];
};
