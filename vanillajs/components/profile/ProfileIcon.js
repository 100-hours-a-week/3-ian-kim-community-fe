import Component from "../core/Component.js";
import { getUserProfile } from "../../utils/image-utils.js";

export default class ProfileIcon extends Component {
  beforeRendered() {
    this.id = this.props.id;
    this.profilePath = this.props.profilePath;
  }

  async afterRendered() {
    this.$profileIcon = document.querySelector(`#${this.id}`);
    this.profilePath && (await this.loadProfileImage(this.profilePath));
  }

  async loadProfileImage(profileImageName) {
    try {
      this.$profileIcon.src = await getUserProfile(profileImageName);
    } catch (e) {}
  }

  template() {
    return /*html*/ ` <img src="" alt="프로필" id=${this.id} class="profile-icon bg-gray" /> `;
  }
}
