import Header from "../../../components/header/Header.js";
import Toast from "../../../components/toast/Toast.js";
import {
  addValidationEvents,
  isButtonEnabled,
  setInputElemets,
} from "../../../utils/form-utils.js";
import {
  passwordConfirmValidator,
  passwordValidator,
} from "../../../utils/validation-utils.js";

export default class PasswordReset {
  #VALIDATORS = {
    password: passwordValidator,
    confirm: (value, inputs) =>
      passwordConfirmValidator(inputs.password.value, value),
  };
  #inputs = {};
  #helperTexts = {};
  #editBtn;
  #toast;

  constructor() {
    new Header({ hasBackBtn: true, hasProfileIcon: true });
    this.#toast = new Toast();
    this.#selectElements();
    this.#addEvents();
  }

  #selectElements() {
    setInputElemets(this.#inputs, this.#helperTexts, this.#VALIDATORS);
    this.#editBtn = document.querySelector(".btn-reset-password");
  }

  #addEvents() {
    // 입력값 검증
    addValidationEvents(
      this.#inputs,
      this.#helperTexts,
      this.#editBtn,
      this.#VALIDATORS
    );

    // 비밀번호 수정 API 요청
    this.#editBtn.addEventListener("click", () => {
      if (!isButtonEnabled(this.#editBtn)) {
        return;
      }

      // todo: 비밀번호 수정 API 요청
      const isEditSuccess = true;

      if (isEditSuccess) {
        this.#toast.show();
      }
    });
  }
}

new PasswordReset();
