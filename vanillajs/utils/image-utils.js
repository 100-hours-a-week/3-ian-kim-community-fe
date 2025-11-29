import { getImage } from "../api/image-api.js";

export const getUserProfile = async (imageName) => {
  try {
    const response = await getImage(imageName);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (e) {}
};
