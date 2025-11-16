import { getImage } from "../api/image-api.js";

export const getUserProfile = async (imagePath) => {
  try {
    const response = await getImage(imagePath);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (e) {}
};
