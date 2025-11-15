import { isSuccess } from "../../api/base-api.js";
import { logout } from "../../api/user-api.js";
import Component from "../core/Component.js";
import { navigateTo, ROUTES } from "../../router/router.js";
import { Auth } from "../../store/auth-store.js";
import ProfileIcon from "../profile/ProfileIcon.js";

export default class Header extends Component {
  render() {
    this.target.outerHTML = this.template();
  }

  async afterRendered() {
    this.$headerTitle = document.querySelector(".header-title");

    if (!Auth.isLoggedIn()) {
      this.$loginBtn = document.querySelector(".btn-to-login");
      this.$registerBtn = document.querySelector(".btn-to-register");
    }

    if (Auth.isLoggedIn()) {
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
    }
  }

  setEvents() {
    this.$headerTitle.addEventListener("click", () => {
      navigateTo(ROUTES.POST_LIST);
    });

    if (!Auth.isLoggedIn()) {
      this.$loginBtn.addEventListener("click", () => {
        navigateTo(ROUTES.LOGIN);
      });

      this.$registerBtn.addEventListener("click", () => {
        navigateTo(ROUTES.REGISTER);
      });
    }

    if (Auth.isLoggedIn()) {
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
  }

  template() {
    return /*html*/ `
      <header class="header">
        <h1 class="header-title">DevTalk</h1>
        
        ${Auth.isLoggedIn() ? this.userTemplate() : this.guestTemplate()}
      </header>
    `;
  }

  userTemplate() {
    return /*html*/ `
      <div class="header-profile">
        <div id="profile-area-header"></div>

        <div class="dropdown-profile hidden">
          <button class="btn-to-profile-edit">회원정보수정</button>
          <button class="btn-to-password-reset">비밀번호수정</button>
          <button class="btn-logout">로그아웃</button>
        </div>
      </div>
    `;
  }

  guestTemplate() {
    return /*html*/ `
      <div class="header-login">
        <button class="btn-to-login">로그인</button>
        <button class="btn-to-register">회원가입</button>
      </div>
    `;
  }
}
