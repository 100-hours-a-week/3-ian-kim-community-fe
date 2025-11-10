import { isSuccess, parseData } from "../../../api/base-api.js";
import { login } from "../../../api/user-api.js";
import { MESSAGES } from "../../../common/constants.js";
import Component from "../../../Component.js";
import Header from "../../../components/header/Header.js";
import { navigateTo, ROUTES } from "../../../router/router.js";
import { Auth } from "../../../store/auth-store.js";
import {
  addValidationEvents,
  isButtonEnabled,
  parseInputValues,
  setInputElemets,
} from "../../../utils/form-utils.js";
import {
  emailValidator,
  passwordValidator,
} from "../../../utils/validation-utils.js";

export default class Login extends Component {
  beforeRendered() {
    this.VALIDATORS = {
      email: emailValidator,
      password: passwordValidator,
    };

    this.$inputs = {};
    this.$helperTexts = {};
  }

  afterRendered() {
    new Header(document.querySelector(".header"), {});

    setInputElemets(this.$inputs, this.$helperTexts, this.VALIDATORS);
    this.$loginBtn = document.querySelector(".btn-login");
    this.$registerLink = document.querySelector(".link-register");
  }

  setEvents() {
    // 입력값 검증
    addValidationEvents(
      this.$inputs,
      this.$helperTexts,
      this.$loginBtn,
      this.VALIDATORS
    );

    // 로그인 API 요청
    this.$loginBtn.addEventListener("click", async () => {
      if (!isButtonEnabled(this.$loginBtn)) {
        return;
      }

      const response = await login(parseInputValues(this.$inputs));
      const data = await parseData(response);

      if (isSuccess(response)) {
        alert("로그인에 성공했습니다.");
        Auth.login(data.userId);
        navigateTo(ROUTES.POST_LIST);
        return;
      }

      if (response.status === 401) {
        this.$helperTexts.email.textContent = MESSAGES.wrongEmailOrPassword;
        return;
      }

      alert("로그인에 실패했습니다.");
    });

    // 페이지 이동
    this.$registerLink.addEventListener("click", () => {
      navigateTo(ROUTES.REGISTER);
    });
  }

  template() {
    return /*html*/ `
      <h1>로그인</h1>

      <form class="user-form">
        <div class="user-form-input-group login-form-input-group">
          <label for="email" class="label">이메일</label>
          <input
            type="text"
            id="email"
            class="input-email"
            placeholder="이메일을 입력하세요." />
        </div>

        <div class="user-form-input-group login-form-input-group">
          <label for="password" class="label">비밀번호</label>
          <input
            type="password"
            id="password"
            class="input-password"
            autocomplete="off"
            placeholder="비밀번호를 입력하세요." />
        </div>

        <p
          class="helper-text helper-text-email helper-text-password text-red"></p>

        <button
          type="button"
          class="btn-login user-form-button bg-btn-disabled text-white">
          로그인
        </button>
      </form>

      <a href="#" class="link-register user-form-link text-black">회원가입</a>
    `;
  }
}

new Login(document.querySelector(".container"));
