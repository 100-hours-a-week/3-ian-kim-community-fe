import { isSuccess } from "../../../api/base-api.js";
import { resetPassword } from "../../../api/user-api.js";
import Component from "../../../Component.js";
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

export default class PasswordReset extends Component {
  setUp() {
    this.VALIDATORS = {
      password: passwordValidator,
      confirm: (value, inputs) =>
        passwordConfirmValidator(inputs.password.value, value),
    };
  }

  afterMounted() {
    this.inputs = {};
    this.helperTexts = {};
    this.editBtn = document.querySelector(".btn-reset-password");

    new Header(document.querySelector(".header"), {
      hasBackBtn: true,
      hasProfileIcon: true,
    });
    this.toast = new Toast();
    setInputElemets(this.inputs, this.helperTexts, this.VALIDATORS);
  }

  setEvents() {
    // 입력값 검증
    addValidationEvents(
      this.inputs,
      this.helperTexts,
      this.editBtn,
      this.VALIDATORS
    );

    // 비밀번호 수정 API 요청
    this.editBtn.addEventListener("click", async () => {
      if (!isButtonEnabled(this.editBtn)) {
        return;
      }

      const response = await resetPassword({
        password: this.inputs.password.value,
      });

      if (isSuccess(response)) {
        this.toast.show();
        return;
      }

      alert("비밀번호 수정에 실패했습니다.");
    });
  }

  template() {
    return /*html*/ `
      <h1>비밀번호 수정</h1>

      <form class="user-form">
        <div class="user-form-input-group password-reset-form-input-group">
          <label for="password" class="label">비밀번호 *</label>
          <input
            type="password"
            id="password"
            class="input-password"
            autocomplete="off"
            placeholder="비밀번호를 입력하세요." />

          <p class="helper-text helper-text-password text-red"></p>
        </div>

        <div class="user-form-input-group password-reset-form-input-group">
          <label for="confirm" class="label">비밀번호 확인*</label>
          <input
            type="password"
            id="confirm"
            class="input-confirm"
            autocomplete="off"
            placeholder="비밀번호를 한번 더 입력하세요." />

          <p class="helper-text helper-text-confirm text-red"></p>
        </div>

        <button
          type="button"
          class="btn-reset-password user-form-button bg-btn-disabled text-white">
          수정하기
        </button>
      </form>

      <div class="toast-complete"></div>
    `;
  }
}

new PasswordReset(document.querySelector(".container"));
