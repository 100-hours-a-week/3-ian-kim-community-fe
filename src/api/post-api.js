import { API, get } from "./base-api.js";

export const getPostList = (page) => {
  const size = 10;
  const sort = "createdAt,desc";
  return get(API.POST_LIST.path, `?page=${page}&size=${size}&sort=${sort}`);
};

export const getPostDetail = (postId) => {
  return get(API.POST_DETAIL.path(postId));
};
