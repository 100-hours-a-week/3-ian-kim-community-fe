export const toApiErrorResponse = (data) => {
  return {
    code: data.code,
    message: data.message,
  }
}
