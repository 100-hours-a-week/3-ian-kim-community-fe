const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/
const NICKNAME_PATTERN = /^[가-힣a-zA-Z0-9]{1,10}$/

const isNotMatch = (pattern, value) => !pattern.test(value)

export const Validators = {
  email: (email) => {
    return isNotMatch(EMAIL_PATTERN, email) ? '*올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)' : ''
  },

  password: (password) => {
    return isNotMatch(PASSWORD_PATTERN, password) ? '*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.' : ''
  },

  passwordConfirm: (password, confirm) => {
    return password !== confirm ? '*비밀번호가 일치하지 않습니다.' : ''
  },

  nickname: (nickname) => {
    return isNotMatch(NICKNAME_PATTERN, nickname) ? '*닉네임은 10자 이하이며, 특수문자를 포함할 수 없습니다.' : ''
  },
}

export const checkInputsValid = (...inputs) => {
  return inputs.every((input) => input.value && !input.error)
}
