import { isSuccess, parseData } from "../../../api/base-api.js";
import {
  emailValidation,
  nicknameValidation,
  register,
} from "../../../api/user-api.js";
import { MESSAGES } from "../../../common/constants.js";
import Header from "../../../components/header/Header.js";
import { navigateTo, ROUTES } from "../../../router/router.js";
import {
  addUploadProfileImageEvent,
  addValidationEvents,
  checkAllInputValid,
  isButtonEnabled,
  parseInputValues,
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
    // image: profileImageValidator,
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
    new Header(document.querySelector(".header"), {
      hasBackBtn: true,
    });
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

    this.#inputs.email.addEventListener("blur", async (e) => {
      const email = e.target.value;

      if (emailValidator(email)) {
        return;
      }

      const response = await emailValidation({ email });
      const data = await parseData(response);

      if (isSuccess(response) && !data.available) {
        this.#helperTexts.email.textContent = MESSAGES.duplicatedEmail;
      }
    });

    this.#inputs.nickname.addEventListener("blur", async (e) => {
      const nickname = e.target.value;

      if (nicknameValidator(nickname)) {
        return;
      }

      const response = await nicknameValidation({ nickname });
      const data = await parseData(response);

      if (isSuccess(response) && !data.available) {
        this.#helperTexts.nickname.textContent = MESSAGES.duplicatedNickname;
      }
    });

    // todo: 이미지 업로드
    // addUploadProfileImageEvent(
    //   this.#inputs,
    //   this.#helperTexts,
    //   this.#profilePreview,
    //   this.#profileImage,
    //   this.#registerBtn
    // );

    // 회원가입 API 요청
    this.#registerBtn.addEventListener("click", async () => {
      if (!isButtonEnabled(this.#registerBtn)) {
        return;
      }

      const response = await register(parseInputValues(this.#inputs));

      if (isSuccess(response)) {
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
