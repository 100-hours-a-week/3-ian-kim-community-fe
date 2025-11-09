import { API, get, postJson } from "./base-api.js";

export const emailValidation = ({ email }) => {
  return get(API.EMAIL_VALIDATION, `email=${email}`);
};

export const nicknameValidation = ({ nickname }) => {
  return get(API.NICKNAME_VALIDATION, `nickname=${nickname}`);
};

export const register = ({ email, password, nickname, profileImage }) => {
  return postJson(API.REGISTER, {
    email,
    password,
    nickname,
    profileImage,
  });
};

export const login = ({ email, password }) => {
  return postJson(API.LOGIN, { email, password });
};
