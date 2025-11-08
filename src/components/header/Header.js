export default class Header {
  #hasBackBtn;
  #hasProfileIcon;
  #headerBackBtn;
  #headerProfile;
  #dropdownProfile;
  #headerProfileIcon;

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
