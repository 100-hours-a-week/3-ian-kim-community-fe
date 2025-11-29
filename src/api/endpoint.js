export const ENDPOINTS = {
  REGISTER: '/users',

  LOGIN: '/users/login',

  EMAIL_VALIDATION: '/users/email-validation',

  NICKNAME_VALIDATION: '/users/nickname-validation',

  CHECK_LOGIN: '/users/check',

  MY_ACCOUNT: '/user',

  EDIT_ACCOUNT: '/user',

  RESET_PASSWORD: '/user/password',

  DELETE_ACCOUNT: '/user',

  LOGOUT: '/user/logout',

  POST_LIST: '/posts',

  POST_DETAIL: (postId) => `/posts/${postId}`,

  CREATE_POST: '/posts',

  UPDATE_POST: (postId) => `/posts/${postId}`,

  DELETE_POST: (postId) => `/posts/${postId}`,

  TOGGLE_POST_LIKE: (postId) => `/posts/${postId}/like`,

  COMMENT_LIST: (postId) => `/posts/${postId}/comments`,

  CREATE_COMMENT: (postId) => `/posts/${postId}/comments`,

  UPDATE_COMMENT: (commentId) => `/comments/${commentId}`,

  DELETE_COMMENT: (commentId) => `/comments/${commentId}`,
}
