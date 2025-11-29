export const toLoginResponse = (data) => {
  return {
    userId: data.userId,
    profileImageName: data.profileImageName,
  }
}
