import { toPageResponse } from '@/api/dto/response/PageResponse.js'
import { toPostDetailResponse } from '@/api/dto/response/PostDetailResponse.js'
import { toPostResponse } from '@/api/dto/response/PostResponse.js'
import { toPostUpdateResponse } from '@/api/dto/response/PostUpdateResponse.js'
import { ENDPOINTS } from '@/api/endpoint.js'
import { apiDelete, apiFormData, apiGet, apiPatch, HTTP_METHOD } from '@/api/http.js'

export const getPosts = async (page) => {
  const size = 10
  const sort = 'createdAt,desc'
  const response = await apiGet(ENDPOINTS.POST_LIST, { params: { page, size, sort } })
  return toPageResponse(response, (data) => toPostResponse(data))
}

export const getPost = async (postId) => {
  const response = await apiGet(ENDPOINTS.POST_DETAIL(postId))
  return toPostDetailResponse(response)
}

export const createPost = async (request) => {
  await apiFormData(ENDPOINTS.CREATE_POST, HTTP_METHOD.POST, request)
}

export const updatePost = async (postId, request) => {
  const response = await apiFormData(ENDPOINTS.UPDATE_POST(postId), HTTP_METHOD.PATCH, request)
  return toPostUpdateResponse(response)
}

export const deletePost = async (postId) => {
  await apiDelete(ENDPOINTS.DELETE_POST(postId))
}

export const togglePostLike = async (postId) => {
  await apiPatch(ENDPOINTS.TOGGLE_POST_LIKE(postId))
}
