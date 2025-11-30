export const toPageResponse = (data, targetFunc) => {
  return {
    content: data.content.map((item) => targetFunc(item)),
    page: data.page,
  }
}
