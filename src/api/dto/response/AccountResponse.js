export const toAccountResponse = (data) => {
  return {
    userId: data.userId,
    email: data.email,
    nickname: data.nickname,
    profileImageName: data.profileImageName,
    createdDate: data.createdDate,
  }
}
