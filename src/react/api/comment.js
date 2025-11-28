import { ENDPOINTS } from '@/api/endpoint.js'
import { apiDelete, apiGet, apiPatch, apiPost } from '@/api/http.js'

export const getComments = (postId, page) => {
  const size = 5
  const sort = 'createdAt,desc'
  return apiGet(ENDPOINTS.COMMENT_LIST(postId), { page, size, sort })
}

export const createComment = (postId, request) => {
  return apiPost(ENDPOINTS.CREATE_COMMENT(postId), request)
}

export const updateComment = (commentId, request) => {
  return apiPatch(ENDPOINTS.UPDATE_COMMENT(commentId), request)
}

export const deleteComment = (commentId) => {
  return apiDelete(ENDPOINTS.DELETE_COMMENT(commentId))
}
