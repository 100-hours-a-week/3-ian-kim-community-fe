import { toApiErrorResponse } from '@/api/dto/response/ApiErrorResponse.js'
import { getErrorMessage } from '@/api/error.js'
import { COOKIE_NAME, HEADER_NAME } from '@/common/constants/name.js'
import { getCookie } from '@/utils/cookie.js'
import axios from 'axios'

const LOCAL_SERVER_URL = 'https://localhost:8443'

export const apiClient = axios.create({
  baseURL: LOCAL_SERVER_URL,
  withCredentials: true,
})

apiClient.interceptors.request.use(
  (config) => {
    config.headers[HEADER_NAME.CSRF] = getCookie(COOKIE_NAME.CSRF)
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

apiClient.interceptors.response.use(
  (response) => {
    const contentType = response.headers['content-type']

    // file
    if (contentType && contentType.startsWith('image/')) {
      return response
    }

    // json
    return response.data.data
  },
  (error) => {
    const { code } = toApiErrorResponse(error.response.data)

    if (String(code).startsWith('500')) {
      alert(getErrorMessage(code))
    }

    throw error
  },
)
