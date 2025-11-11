import { get } from "./base-api.js";

export const getImage = (imagePath) => {
  return get(imagePath);
};
