const LOCAL_SERVER_URL = "http://localhost:8080";

const getFullApiUrl = (path) => {
  return LOCAL_SERVER_URL + path;
};

export const isSuccess = (response) => {
  return String(response.status).startsWith("2");
};

export const parseData = async (response) => {
  const json = await response.json();
  return json.data;
};

export const get = (path, params) => {
  let url = getFullApiUrl(path);
  if (params) {
    url += params;
  }

  return fetch(url, { method: "GET", credentials: "include" });
};

export const postJson = (path, request) => {
  return fetch(getFullApiUrl(path), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
    credentials: "include",
  });
};

export const patchJson = (path, request) => {
  return fetch(getFullApiUrl(path), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
    credentials: "include",
  });
};

export const deleteRequest = (path) => {
  return fetch(getFullApiUrl(path), {
    method: "DELETE",
    credentials: "include",
  });
};

export const API = {
  REGISTER: {
    path: "/users",
    method: "POST",
  },
  LOGIN: {
    path: "/users/login",
    method: "POST",
  },
  EMAIL_VALIDATION: {
    path: "/users/email-validation",
    method: "GET",
  },
  NICKNAME_VALIDATION: {
    path: "/users/nickname-validation",
    method: "GET",
  },
  USER_PROFILE: {
    path: (userId) => `/users/${userId}`,
    method: "GET",
  },

  MY_PAGE: {
    path: "/user",
    method: "GET",
  },
  EDIT_ACCOUNT: {
    path: "/user",
    method: "PATCH",
  },
  RESET_PASSWORD: {
    path: "/user/password",
    method: "PATCH",
  },
  DELETE_ACCOUNT: {
    path: "/user",
    method: "DELETE",
  },
  LOGOUT: {
    path: "/user/logout",
    method: "POST",
  },

  POST_LIST: {
    path: "/posts",
    method: "GET",
  },
  POST_DETAIL: {
    path: (postId) => `/posts/${postId}`,
    method: "GET",
  },
  CREATE_POST: {
    path: "/posts",
    method: "POST",
  },
  UPDATE_POST: {
    path: (postId) => `/posts/${postId}`,
    method: "PATCH",
  },
  DELETE_POST: {
    path: (postId) => `/posts/${postId}`,
    method: "DELETE",
  },

  TOGGLE_LIKE: {
    path: (postId) => `/posts/${postId}/like`,
    method: "PATCH",
  },

  COMMENT_LIST: {
    path: (postId) => `/posts/${postId}/comments`,
    method: "GET",
  },
  CREATE_COMMENT: {
    path: (postId) => `/posts/${postId}/comments`,
    method: "POST",
  },
  UPDATE_COMMENT: {
    path: (commentId) => `/comments/${commentId}`,
    method: "PATCH",
  },
  DELETE_COMMENT: {
    path: (commentId) => `/comments/${commentId}`,
    method: "DELETE",
  },
};
