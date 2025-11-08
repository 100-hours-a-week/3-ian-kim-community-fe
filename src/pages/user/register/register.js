import { MESSAGES } from "../../../common/constants.js";
import Header from "../../../components/header/Header.js";
import { navigateTo, ROUTES } from "../../../router/router.js";
import {
  addValidationEvents,
  checkAllInputValid,
  isButtonEnabled,
  setInputElemets,
} from "../../../utils/form-utils.js";
import {
  emailValidator,
  passwordValidator,
  passwordConfirmValidator,
  nicknameValidator,
  profileImageValidator,
} from "../../../utils/validation-utils.js";

export default class Register {
  #VALIDATORS = {
    email: emailValidator,
    password: passwordValidator,
    confirm: (value, inputs) =>
      passwordConfirmValidator(inputs.password.value, value),
    nickname: nicknameValidator,
    image: profileImageValidator,
  };
  #inputs = {};
  #helperTexts = {};
  #profilePreview;
  #profileImage;
  #registerBtn;
  #loginLink;

  constructor() {
    this.#render();
  }

  #render() {
    new Header({ hasBackBtn: true });
    this.#selectElements();
    this.#addEvents();
  }

  #selectElements() {
    setInputElemets(this.#inputs, this.#helperTexts, this.#VALIDATORS);
    this.#profilePreview = document.querySelector(".profile-preview");
    this.#profileImage = document.querySelector(".profile-image");
    this.#registerBtn = document.querySelector(".btn-register");
    this.#loginLink = document.querySelector(".link-login");
  }

  #addEvents() {
    // 입력값 검증
    addValidationEvents(
      this.#inputs,
      this.#helperTexts,
      this.#registerBtn,
      this.#VALIDATORS
    );

    this.#inputs.password.addEventListener("blur", (e) => {
      this.#helperTexts.confirm.textContent = this.#VALIDATORS.confirm(
        this.#inputs.confirm.value,
        this.#inputs
      );
      checkAllInputValid(this.#inputs, this.#helperTexts, this.#registerBtn);
    });

    this.#inputs.email.addEventListener("blur", (e) => {
      // todo: 이메일 중복 검사 API 요청
      const isEmailAvailable = true;

      if (!isEmailAvailable) {
        this.#helperTexts.email.textContent = MESSAGES.duplicatedEmail;
      }
    });

    this.#inputs.nickname.addEventListener("blur", (e) => {
      // todo: 닉네임 중복 검사 API 요청
      const isNicknameAvailable = true;

      if (!isNicknameAvailable) {
        this.#helperTexts.nickname.textContent = MESSAGES.duplicatedNickname;
      }
    });

    // 이미지 업로드
    this.#profilePreview.addEventListener("click", () =>
      this.#inputs.image.click()
    );

    this.#inputs.image.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        this.#profileImage.src = reader.result;
        this.#profileImage.classList.remove("hidden");
        this.#helperTexts.image.textContent = "";
        checkAllInputValid(this.#inputs, this.#helperTexts, this.#registerBtn);
      };
      reader.readAsDataURL(file);
    });

    // 회원가입 API 요청
    this.#registerBtn.addEventListener("click", () => {
      if (!isButtonEnabled(this.#registerBtn)) {
        return;
      }

      // todo: 회원가입 API 요청
      const isRegisterSuccess = true;

      if (isRegisterSuccess) {
        alert("회원가입에 성공했습니다.");
        navigateTo(ROUTES.LOGIN);
      }
    });

    // 페이지 이동
    this.#loginLink.addEventListener("click", () => {
      navigateTo(ROUTES.LOGIN);
    });
  }
}

new Register();
