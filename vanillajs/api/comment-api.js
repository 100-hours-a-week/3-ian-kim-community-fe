import { API, deleteRequest, get, patchJson, postJson } from "./base-api.js";

export const getCommentList = (postId, page) => {
  return get(API.COMMENT_LIST.path(postId));
};

export const createComment = (postId, { content }) => {
  return postJson(API.CREATE_COMMENT.path(postId), { content });
};

export const updateComment = (commentId, { content }) => {
  return patchJson(API.UPDATE_COMMENT.path(commentId), { content });
};

export const deleteComment = (commentId) => {
  return deleteRequest(API.DELETE_COMMENT.path(commentId));
};
