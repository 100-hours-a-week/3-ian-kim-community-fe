import { toAccountResponse } from '@/api/dto/response/AccountResponse.js'
import { toAccountUpdateResponse } from '@/api/dto/response/AccountUpdateResponse.js'
import { toLoginResponse } from '@/api/dto/response/LoginResponse.js'
import { toUserLoginCheckResponse } from '@/api/dto/response/UserLoginCheckResponse.js'
import { toUserValidationResponse } from '@/api/dto/response/UserValidationResponse.js'
import { ENDPOINTS } from '@/api/endpoint.js'
import { apiDelete, apiFormData, apiGet, apiPatch, apiPost, HTTP_METHOD } from '@/api/http.js'

export const validateEmail = async (email) => {
  const response = await apiGet(ENDPOINTS.EMAIL_VALIDATION, { params: { email } })
  return toUserValidationResponse(response)
}

export const validateNickname = async (nickname) => {
  const response = await apiGet(ENDPOINTS.NICKNAME_VALIDATION, { params: { nickname } })
  return toUserValidationResponse(response)
}

export const registerUser = async (request) => {
  await apiFormData(ENDPOINTS.REGISTER, HTTP_METHOD.POST, request)
}

export const loginUser = async (request) => {
  const response = await apiPost(ENDPOINTS.LOGIN, request)
  return toLoginResponse(response)
}

export const updateAccount = async (request) => {
  const response = await apiFormData(ENDPOINTS.EDIT_ACCOUNT, HTTP_METHOD.PATCH, request)
  return toAccountUpdateResponse(response)
}

export const getMyAccount = async () => {
  const response = await apiGet(ENDPOINTS.MY_ACCOUNT)
  return toAccountResponse(response)
}

export const resetPassword = async (request) => {
  await apiPatch(ENDPOINTS.RESET_PASSWORD, request)
}

export const deleteAccount = async () => {
  await apiDelete(ENDPOINTS.DELETE_ACCOUNT)
}

export const logoutUser = async () => {
  await apiPost(ENDPOINTS.LOGOUT)
}

export const checkLoginUser = async () => {
  const response = await apiGet(ENDPOINTS.CHECK_LOGIN)
  return toUserLoginCheckResponse(response)
}
