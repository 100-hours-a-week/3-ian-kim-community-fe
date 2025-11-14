import { isSuccess } from "../../api/base-api.js";
import { logout } from "../../api/user-api.js";
import Component from "../core/Component.js";
import { navigateTo, ROUTES } from "../../router/router.js";
import { Auth } from "../../store/auth-store.js";
import ProfileIcon from "../profile/ProfileIcon.js";

export default class Header extends Component {
  beforeRendered() {
    this.hasBackBtn = this.props.hasBackBtn || false;
    this.hasProfileIcon = this.props.hasProfileIcon || false;
    this.$profileIcon;
  }

  render() {
    this.target.outerHTML = this.template();
  }

  async afterRendered() {
    this.$headerBackBtn = document.querySelector(".header-btn-back");
    this.$headerProfile = document.querySelector(".header-profile");
    this.$dropdownProfile = document.querySelector(".dropdown-profile");
    this.$profileArea = document.querySelector("#profile-area-header");
    this.$editProfileBtn = document.querySelector(".btn-to-profile-edit");
    this.$resetPasswordBtn = document.querySelector(".btn-to-password-reset");
    this.$logoutBtn = document.querySelector(".btn-logout");

    new ProfileIcon(this.$profileArea, {
      profilePath: Auth.getProfile(),
      id: "profile-icon-header",
    });
    this.$profileIcon = document.querySelector("#profile-icon-header");

    if (this.hasBackBtn) {
      this.$headerBackBtn.classList.remove("hidden");
    }

    if (this.hasProfileIcon) {
      this.$headerProfile.classList.remove("hidden");
    }
  }

  setEvents() {
    this.$headerBackBtn.addEventListener("click", () => {
      history.back();
    });

    this.$profileIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      this.$dropdownProfile.classList.toggle("hidden");
    });

    document.addEventListener("click", () => {
      if (!this.$dropdownProfile.classList.contains("hidden")) {
        this.$dropdownProfile.classList.add("hidden");
      }
    });

    this.$editProfileBtn.addEventListener("click", () => {
      navigateTo(ROUTES.PROFILE_EDIT);
    });

    this.$resetPasswordBtn.addEventListener("click", () => {
      navigateTo(ROUTES.PASSWORD_RESET);
    });

    this.$logoutBtn.addEventListener("click", async () => {
      const response = await logout();

      if (isSuccess(response)) {
        alert("로그아웃 되었습니다.");
        Auth.logout();
        navigateTo(ROUTES.LOGIN);
        return;
      }

      alert("로그아웃에 실패했습니다.");
    });
  }

  template() {
    return /*html*/ `
      <header class="header">
        <button class="header-btn-back hidden" type="button">&lt;</button>

        <h1 class="header-title">Q&A Library</h1>

        <div class="header-profile hidden">
          <div id="profile-area-header"></div>

          <div class="dropdown-profile hidden">
            <button class="btn-to-profile-edit">회원정보수정</button>
            <button class="btn-to-password-reset">비밀번호수정</button>
            <button class="btn-logout">로그아웃</button>
          </div>
        </div>
      </header>
    `;
  }
}
