import { API, deleteRequest, get, patchJson, postJson } from "./base-api.js";

export const getPostList = (page) => {
  const size = 10;
  const sort = "createdAt,desc";
  return get(API.POST_LIST.path, `?page=${page}&size=${size}&sort=${sort}`);
};

export const getPostDetail = (postId) => {
  return get(API.POST_DETAIL.path(postId));
};

export const createPost = ({ title, content }) => {
  return postJson(API.CREATE_POST.path, { title, content });
};

export const updatePost = (postId, { title, content }) => {
  return patchJson(API.UPDATE_POST.path(postId), { title, content });
};

export const deletePost = (postId) => {
  return deleteRequest(API.DELETE_POST.path(postId));
};

export const toggleLike = (postId) => {
  return patchJson(API.TOGGLE_LIKE.path(postId));
};
