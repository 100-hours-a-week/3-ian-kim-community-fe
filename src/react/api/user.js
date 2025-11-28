import { ENDPOINTS } from '@/api/endpoint.js'
import { apiDelete, apiFormData, apiGet, apiPatch, apiPost, HTTP_METHOD } from '@/api/http.js'

export const validateEmail = (email) => {
  return apiGet(ENDPOINTS.EMAIL_VALIDATION, { email })
}

export const validateNickname = (nickname) => {
  return apiGet(ENDPOINTS.NICKNAME_VALIDATION, { nickname })
}

export const registerUser = (request) => {
  return apiFormData(ENDPOINTS.REGISTER, HTTP_METHOD.POST, request)
}

export const loginUser = (request) => {
  return apiPost(ENDPOINTS.LOGIN, request)
}

export const updateAccount = (request) => {
  return apiFormData(ENDPOINTS.EDIT_ACCOUNT, HTTP_METHOD.PATCH, request)
}

export const getMyAccount = () => {
  return apiGet(ENDPOINTS.MY_ACCOUNT)
}

export const resetPassword = (request) => {
  return apiPatch(ENDPOINTS.RESET_PASSWORD, request)
}

export const deleteAccount = () => {
  return apiDelete(ENDPOINTS.DELETE_ACCOUNT)
}

export const logoutUser = () => {
  return apiPost(ENDPOINTS.LOGOUT)
}
