import Header from "../../../components/header/Header.js";
import { navigateTo, ROUTES } from "../../../router/router.js";
import { enableButton, disableButton } from "../../../utils/button-utils.js";
import {
  emailValidator,
  passwordValidator,
} from "../../../utils/validation-utils.js";

export default class Login {
  #INPUT_KEYS = { email, password };
  #inputs = {};
  #loginBtn;
  #registerLink;
  #helperText;
  #isBtnEnabled;

  constructor() {
    this.#isBtnEnabled = false;
    this.#render();
  }

  #render() {
    new Header();
    this.#selectElements();
    this.#addEvents();
  }

  #selectElements() {
    Object.keys(this.#INPUT_KEYS).forEach(
      (key) => (this.#inputs[key] = document.querySelector(`.input-${key}`))
    );

    this.#loginBtn = document.querySelector(".btn-login");
    this.#registerLink = document.querySelector(".link-register");
    this.#helperText = document.querySelector(".helper-text");
  }

  #addEvents() {
    Object.values(this.#inputs).forEach((input) => {
      input.addEventListener("blur", () => {
        this.#validateInput();
      });
    });

    this.#loginBtn.addEventListener("click", () => {
      if (!this.#isBtnEnabled) {
        return;
      }

      // todo: 로그인 API 요청
      const isLoginSuccess = false;

      if (isLoginSuccess) {
        navigateTo(ROUTES.POST_LIST);
      }
    });

    this.#registerLink.addEventListener("click", () => {
      navigateTo(ROUTES.REGISTER);
    });
  }

  #validateInput() {
    const hasError =
      emailValidator(this.#inputs.email.value) ||
      passwordValidator(this.#inputs.password.value);

    this.#isBtnEnabled = !hasError;
    this.#helperText.textContent = hasError || "";
    hasError ? disableButton(this.#loginBtn) : enableButton(this.#loginBtn);
  }
}

new Login();
