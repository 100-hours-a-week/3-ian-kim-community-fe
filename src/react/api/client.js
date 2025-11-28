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
  (response) => response.data,
  (error) => {
    alert('요청에 실패했습니다. 잠시 후 다시 시도해주세요.')
    return Promise.reject(error)
  },
)
