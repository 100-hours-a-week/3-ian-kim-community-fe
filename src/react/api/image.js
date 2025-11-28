import { apiGet } from '@/api/http.js'

export const getImage = (imageName) => {
  return apiGet(imageName)
}
