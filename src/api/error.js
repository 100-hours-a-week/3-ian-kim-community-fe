const ERROR_MESSAGE = Object.freeze({
  // 401 Unauthorized
  4007: '이전과 동일한 비밀번호로 변경할 수 없습니다.',
  4011: '아이디 또는 비밀번호가 틀렸습니다.',
  4012: '로그인이 필요합니다.',

  // 403 Forbidden
  4031: '허용되지 않는 접근입니다.',

  // 404 Not Found
  4041: '존재하지 않는 회원입니다.',
  4042: '존재하지 않는 게시글입니다.',
  4043: '존재하지 않는 댓글입니다.',

  // 409 Conflict
  4091: '중복된 이메일입니다.',
  4092: '중복된 닉네임입니다.',

  // 500 Internal Server Error
  5001: '서버에 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  5002: '이미지 업로드에 실패했습니다',
})

export const getErrorMessage = (code) => {
  return ERROR_MESSAGE[code] || '서버에 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
}
