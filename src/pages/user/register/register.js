import { isSuccess, parseData } from "../../../api/base-api.js";
import {
  emailValidation,
  nicknameValidation,
  register,
} from "../../../api/user-api.js";
import { MESSAGES } from "../../../common/constants.js";
import Component from "../../../Component.js";
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

export default class Register extends Component {
  beforeRendered() {
    this.VALIDATORS = {
      password: passwordValidator,
      confirm: (value, inputs) =>
        passwordConfirmValidator(inputs.password.value, value),
      nickname: nicknameValidator,
      // image: profileImageValidator,
    };
    this.inputs = {};
    this.helperTexts = {};
  }

  afterRendered() {
    new Header(document.querySelector(".header"), {
      hasBackBtn: true,
    });

    setInputElemets(this.inputs, this.helperTexts, this.VALIDATORS);
    this.profilePreview = document.querySelector(".profile-preview");
    this.profileImage = document.querySelector(".profile-image");
    this.registerBtn = document.querySelector(".btn-register");
    this.loginLink = document.querySelector(".link-login");
  }

  setEvents() {
    // 입력값 검증
    addValidationEvents(
      this.inputs,
      this.helperTexts,
      this.registerBtn,
      this.VALIDATORS
    );

    this.inputs.password.addEventListener("blur", (e) => {
      this.helperTexts.confirm.textContent = this.VALIDATORS.confirm(
        this.inputs.confirm.value,
        this.inputs
      );
      checkAllInputValid(this.inputs, this.helperTexts, this.registerBtn);
    });

    this.inputs.email.addEventListener("blur", async (e) => {
      const email = e.target.value;

      if (emailValidator(email)) {
        return;
      }

      const response = await emailValidation({ email });
      const data = await parseData(response);

      if (isSuccess(response) && !data.available) {
        this.helperTexts.email.textContent = MESSAGES.duplicatedEmail;
      }
    });

    this.inputs.nickname.addEventListener("blur", async (e) => {
      const nickname = e.target.value;

      if (nicknameValidator(nickname)) {
        return;
      }

      const response = await nicknameValidation({ nickname });
      const data = await parseData(response);

      if (isSuccess(response) && !data.available) {
        this.helperTexts.nickname.textContent = MESSAGES.duplicatedNickname;
      }
    });

    // todo: 이미지 업로드
    // addUploadProfileImageEvent(
    //   this.inputs,
    //   this.helperTexts,
    //   this.profilePreview,
    //   this.profileImage,
    //   this.registerBtn
    // );

    // 회원가입 API 요청
    this.registerBtn.addEventListener("click", async () => {
      if (!isButtonEnabled(this.registerBtn)) {
        return;
      }

      const response = await register(parseInputValues(this.inputs));

      if (isSuccess(response)) {
        alert("회원가입에 성공했습니다.");
        navigateTo(ROUTES.LOGIN);
        return;
      }

      alert("회원가입에 실패했습니다.");
    });

    // 페이지 이동
    this.loginLink.addEventListener("click", () => {
      navigateTo(ROUTES.LOGIN);
    });
  }

  template() {
    return /*html*/ `
      <h1>회원가입</h1>

      <form class="user-form">
        <div class="user-form-input-group register-form-input-group">
          <label for="image" class="label">프로필 사진 *</label>

          <p class="helper-text helper-text-image text-red">
            *프로필 사진을 추가해주세요.
          </p>

          <div class="profile-preview bg-gray">
            <span class="plus-icon">+</span>
            <img class="profile-image hidden" />
          </div>
          <input
            type="file"
            id="image"
            class="input-image hidden"
            accept="image/*"
            autocomplete="off" />
        </div>

        <div class="user-form-input-group register-form-input-group">
          <label for="email" class="label">이메일 *</label>
          <input
            type="email"
            id="email"
            class="input-email"
            autocomplete="off"
            placeholder="이메일을 입력하세요." />

          <p class="helper-text helper-text-email text-red"></p>
        </div>

        <div class="user-form-input-group register-form-input-group">
          <label for="password" class="label">비밀번호 *</label>
          <input
            type="password"
            id="password"
            class="input-password"
            autocomplete="off"
            placeholder="비밀번호를 입력하세요." />

          <p class="helper-text helper-text-password text-red"></p>
        </div>

        <div class="user-form-input-group register-form-input-group">
          <label for="confirm" class="label">비밀번호 확인*</label>
          <input
            type="password"
            id="confirm"
            class="input-confirm"
            autocomplete="off"
            placeholder="비밀번호를 한번 더 입력하세요." />

          <p class="helper-text helper-text-confirm text-red"></p>
        </div>

        <div class="user-form-input-group register-form-input-group">
          <label for="nickname" class="label">닉네임*</label>
          <input
            type="text"
            id="nickname"
            class="input-nickname"
            autocomplete="off"
            placeholder="닉네임을 입력하세요." />

          <p class="helper-text helper-text-nickname text-red"></p>
        </div>

        <button
          type="button"
          class="btn-register user-form-button bg-btn-disabled text-white">
          회원가입
        </button>
      </form>

      <a href="#" class="link-login user-form-link text-black"
        >로그인하러 가기</a
      >
    `;
  }
}

new Register(document.querySelector(".container"));
