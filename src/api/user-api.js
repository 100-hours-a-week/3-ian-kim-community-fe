import { API, get, requestJson } from "./base-api.js";

export const emailValidation = ({ email }) => {
  return get(API.EMAIL_VALIDATION, `?email=${email}`);
};

export const nicknameValidation = ({ nickname }) => {
  return get(API.NICKNAME_VALIDATION, `?nickname=${nickname}`);
};

export const register = ({ email, password, nickname, profileImage }) => {
  return requestJson(API.REGISTER, {
    email,
    password,
    nickname,
    profileImage,
  });
};

export const login = ({ email, password }) => {
  return requestJson(API.LOGIN, { email, password });
};

export const editAccount = ({ nickname, profileImage }) => {
  return requestJson(API.EDIT_ACCOUNT, { nickname, profileImage });
};

export const myPage = () => {
  return get(API.MY_PAGE);
};
