import { get } from "./base-api.js";

export const getImage = (imageName) => {
  return get(imageName);
};
