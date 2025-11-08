import { navigateTo, ROUTES } from "../../router/router.js";

export default class Header {
  #hasBackBtn;
  #hasProfileIcon;
  #headerBackBtn;
  #headerProfile;
  #dropdownProfile;
  #headerProfileIcon;
  #editProfileBtn;
  #resetPasswordBtn;
  #logoutBtn;

  constructor({ hasBackBtn = false, hasProfileIcon = false } = {}) {
    this.#hasBackBtn = hasBackBtn;
    this.#hasProfileIcon = hasProfileIcon;
    this.#render();
  }

  #render() {
    document.querySelector(".header").outerHTML = this.#template();
    this.#selectElements();

    if (this.#hasBackBtn) {
      this.#headerBackBtn.classList.remove("hidden");
    }

    if (this.#hasProfileIcon) {
      this.#headerProfile.classList.remove("hidden");
    }

    this.#addEvents();
  }

  #selectElements() {
    this.#headerBackBtn = document.querySelector(".header-btn-back");
    this.#headerProfile = document.querySelector(".header-profile");
    this.#dropdownProfile = document.querySelector(".dropdown-profile");
    this.#headerProfileIcon = document.querySelector(".header-profile-icon");
    this.#editProfileBtn = document.querySelector(".btn-to-profile-edit");
    this.#resetPasswordBtn = document.querySelector(".btn-to-password-reset");
    this.#logoutBtn = document.querySelector(".btn-logout");
  }

  #addEvents() {
    this.#headerBackBtn.addEventListener("click", () => {
      history.back();
    });

    this.#headerProfileIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      this.#dropdownProfile.classList.toggle("hidden");
    });

    document.addEventListener("click", () => {
      if (!this.#dropdownProfile.classList.contains("hidden")) {
        this.#dropdownProfile.classList.add("hidden");
      }
    });

    this.#editProfileBtn.addEventListener("click", () => {
      navigateTo(ROUTES.PROFILE_EDIT);
    });

    this.#resetPasswordBtn.addEventListener("click", () => {
      navigateTo(ROUTES.PASSWORD_RESET);
    });

    this.#logoutBtn.addEventListener("click", () => {
      // todo: 로그아웃 API 요청
      alert("로그아웃 되었습니다.");
      navigateTo(ROUTES.LOGIN);
    });
  }

  #template() {
    return /*html*/ `
      <header class="header">
        <button class="header-btn-back hidden" type="button">&lt;</button>

        <h1 class="header-title">아무 말 대잔치</h1>

        <div class="header-profile hidden">
          <img class="header-profile-icon" src="" alt="프로필" />
          
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
