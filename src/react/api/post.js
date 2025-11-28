import { ENDPOINTS } from '@/api/endpoint.js'
import { apiDelete, apiFormData, apiGet, apiPatch, HTTP_METHOD } from '@/api/http.js'

export const getPosts = (page) => {
  const size = 10
  const sort = 'createdAt,desc'
  return apiGet(ENDPOINTS.POST_LIST, { page, size, sort })
}

export const getPost = (postId) => {
  return apiGet(ENDPOINTS.POST_DETAIL(postId))
}

export const createPost = (request) => {
  return apiFormData(ENDPOINTS.CREATE_POST, HTTP_METHOD.POST, request)
}

export const updatePost = (postId, request) => {
  return apiFormData(ENDPOINTS.UPDATE_POST(postId), HTTP_METHOD.PATCH, request)
}

export const deletePost = (postId) => {
  return apiDelete(ENDPOINTS.DELETE_POST(postId))
}

export const togglePostLike = (postId) => {
  return apiPatch(ENDPOINTS.TOGGLE_POST_LIKE(postId))
}
