import { toCommentResponse } from '@/api/dto/response/CommentResponse.js'
import { toPageResponse } from '@/api/dto/response/PageResponse.js'
import { ENDPOINTS } from '@/api/endpoint.js'
import { apiDelete, apiGet, apiPatch, apiPost } from '@/api/http.js'

export const getComments = async (postId, page) => {
  const size = 5
  const sort = 'createdAt,desc'
  const response = await apiGet(ENDPOINTS.COMMENT_LIST(postId), { page, size, sort })
  return toPageResponse(response, (data) => toCommentResponse(data))
}

export const createComment = async (postId, request) => {
  await apiPost(ENDPOINTS.CREATE_COMMENT(postId), request)
}

export const updateComment = async (commentId, request) => {
  await apiPatch(ENDPOINTS.UPDATE_COMMENT(commentId), request)
}

export const deleteComment = async (commentId) => {
  await apiDelete(ENDPOINTS.DELETE_COMMENT(commentId))
}
