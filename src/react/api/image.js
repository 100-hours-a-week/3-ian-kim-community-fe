import { toImageResponse } from '@/api/dto/response/ImageResponse.js'
import { apiGet } from '@/api/http.js'

export const getImage = async (imageName) => {
  const response = await apiGet(imageName)
  return toImageResponse(response)
}
