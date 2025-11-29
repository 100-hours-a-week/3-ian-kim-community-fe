export default class RegisterRequest {
  constructor({ email, password, nickname, profileImage }) {
    this.email = email
    this.password = password
    this.nickname = nickname
    this.profileImage = profileImage
  }
}
