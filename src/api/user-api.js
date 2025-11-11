import {
  API,
  deleteRequest,
  get,
  patchJson,
  postJson,
  requestMultipartForm,
} from "./base-api.js";

export const emailValidation = ({ email }) => {
  return get(API.EMAIL_VALIDATION.path, `?email=${email}`);
};

export const nicknameValidation = ({ nickname }) => {
  return get(API.NICKNAME_VALIDATION.path, `?nickname=${nickname}`);
};

export const register = ({ email, password, nickname, profile }) => {
  return requestMultipartForm(API.REGISTER.path, API.REGISTER.method, {
    email,
    password,
    nickname,
    profile,
  });
};

export const login = ({ email, password }) => {
  return postJson(API.LOGIN.path, { email, password });
};

export const editAccount = (request) => {
  return requestMultipartForm(
    API.EDIT_ACCOUNT.path,
    API.EDIT_ACCOUNT.method,
    request
  );
};

export const myPage = () => {
  return get(API.MY_PAGE.path);
};

export const resetPassword = ({ password }) => {
  return patchJson(API.RESET_PASSWORD.path, { password });
};

export const deleteAccount = () => {
  return deleteRequest(API.DELETE_ACCOUNT.path);
};

export const logout = () => {
  return postJson(API.LOGOUT.path);
};
