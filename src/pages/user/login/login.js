import { isSuccess } from "../../../api/base-api.js";
import { login } from "../../../api/user-api.js";
import { MESSAGES } from "../../../common/constants.js";
import Header from "../../../components/header/Header.js";
import { navigateTo, ROUTES } from "../../../router/router.js";
import { Auth } from "../../../store/auth-store.js";
import {
  addValidationEvents,
  isButtonEnabled,
  setInputElemets,
} from "../../../utils/form-utils.js";
import {
  emailValidator,
  passwordValidator,
} from "../../../utils/validation-utils.js";

export default class Login {
  #VALIDATORS = {
    email: emailValidator,
    password: passwordValidator,
  };
  #inputs = {};
  #helperTexts = {};
  #loginBtn;
  #registerLink;

  constructor() {
    this.#render();
  }

  #render() {
    new Header();
    this.#selectElements();
    this.#addEvents();
  }

  #selectElements() {
    setInputElemets(this.#inputs, this.#helperTexts, this.#VALIDATORS);
    this.#loginBtn = document.querySelector(".btn-login");
    this.#registerLink = document.querySelector(".link-register");
  }

  #addEvents() {
    // 입력값 검증
    addValidationEvents(
      this.#inputs,
      this.#helperTexts,
      this.#loginBtn,
      this.#VALIDATORS
    );

    // 로그인 API 요청
    this.#loginBtn.addEventListener("click", async () => {
      if (!isButtonEnabled(this.#loginBtn)) {
        return;
      }

      const request = Object.fromEntries(
        Object.entries(this.#inputs).map(([key, input]) => [key, input.value])
      );

      const response = await login(request);

      if (isSuccess(response)) {
        alert("로그인에 성공했습니다.");
        Auth.login();
        navigateTo(ROUTES.POST_LIST);
      }

      this.#helperTexts.email.textContent = MESSAGES.wrongEmailOrPassword;
    });

    // 페이지 이동
    this.#registerLink.addEventListener("click", () => {
      navigateTo(ROUTES.REGISTER);
    });
  }
}

new Login();
