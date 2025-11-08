export const ROUTES = Object.freeze({
  LOGIN: "/src/pages/user/login/login.html",
  REGISTER: "/src/pages/user/register/register.html",
  PROFILE_EDIT: "/src/pages/user/profile-edit/profile-edit.html",
  PASSWORD_RESET: "/src/pages/user/password-reset/password-reset.html",
  POST_LIST: "/src/pages/post/post-list/post-list.html",
  POST_DETAIL: "/src/pages/post/post-detail/post-detail.html",
  POST_CREATE: "/src/pages/post/post-create/post-create.html",
  POST_EDIT: "/src/pages/post/post-edit/post-edit.html",
});

export const navigateTo = (path) => {
  window.location.assign(path);
};
