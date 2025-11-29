import { isSuccess } from "../../../api/base-api.js";
import { resetPassword } from "../../../api/user-api.js";
import Component from "../../../components/core/Component.js";
import Header from "../../../components/header/Header.js";
import Toast from "../../../components/toast/Toast.js";
import { Auth } from "../../../store/auth-store.js";
import {
  addValidationEvents,
  isButtonEnabled,
  setInputElemets,
} from "../../../utils/form-utils.js";
import { passwordConfirmValidator, passwordValidator } from "../../../utils/validation-utils.js";

export default class PasswordResetPage extends Component {
  beforeRendered() {
    if (!Auth.validateAuth()) {
      return;
    }

    this.VALIDATORS = {
      password: passwordValidator,
      confirm: (value, inputs) => passwordConfirmValidator(inputs.password.value, value),
    };
    this.inputs = {};
    this.helperTexts = {};
  }

  afterRendered() {
    this.editBtn = document.querySelector(".btn-reset-password");
    this.$completeToast = document.querySelector(".toast-complete");

    new Header(document.querySelector(".header"));
    this.completeToast = new Toast(this.$completeToast, { msg: "수정 완료" });

    setInputElemets(this.inputs, this.helperTexts, this.VALIDATORS);
  }

  setEvents() {
    // 입력값 검증
    addValidationEvents(this.inputs, this.helperTexts, this.editBtn, this.VALIDATORS);

    // 비밀번호 수정 API 요청
    this.editBtn.addEventListener("click", async () => {
      if (!isButtonEnabled(this.editBtn)) {
        return;
      }

      try {
        const response = await resetPassword({
          password: this.inputs.password.value,
        });

        if (isSuccess(response)) {
          this.completeToast.show();
          return;
        }

        alert("비밀번호 수정에 실패했습니다.");
      } catch (e) {}
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

      <div class="toast-complete hidden"></div>
    `;
  }
}

new PasswordResetPage(document.querySelector(".container"));
