export const ROUTES = Object.freeze({
  HOME: '/',

  LOGIN: '/login',
  REGISTER: '/register',

  MY_EDIT_ACCOUNT: '/my/edit/account',
  MY_EDIT_PASSWORD: '/my/edit/password',

  POST_LIST: '/post',
  POST: (id) => `/post/${id}`,
  POST_CREATE: '/post/create',
  POST_EDIT: '/post/edit',
})
