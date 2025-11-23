import { isSuccess, parseData } from "../../../api/base-api.js";
import { MESSAGES } from "../../../common/constants.js";
import { deleteAccount, editAccount, myPage, nicknameValidation } from "../../../api/user-api.js";
import Component from "../../../components/core/Component.js";
import Header from "../../../components/header/Header.js";
import Modal from "../../../components/modal/Modal.js";
import Toast from "../../../components/toast/Toast.js";
import { navigateTo, ROUTES } from "../../../router/router.js";
import {
  disableButton,
  enableButton,
  isButtonEnabled,
  setInputElemets,
} from "../../../utils/form-utils.js";
import { nicknameValidator, profileValidator } from "../../../utils/validation-utils.js";
import { Auth } from "../../../store/auth-store.js";
import { getUserProfile } from "../../../utils/image-utils.js";

export default class ProfileEditPage extends Component {
  beforeRendered() {
    if (!Auth.validateAuth()) {
      return;
    }

    this.VALIDATORS = {
      nickname: nicknameValidator,
      profile: profileValidator,
    };
    this.$inputs = {};
    this.$helperTexts = {};
    this.request = {};
  }

  async afterRendered() {
    setInputElemets(this.$inputs, this.$helperTexts, this.VALIDATORS);

    this.$profilePreview = document.querySelector(".profile-preview");
    this.$profileImage = document.querySelector(".profile-image");
    this.$editBtn = document.querySelector(".btn-edit");
    this.$deleteAccountBtn = document.querySelector(".btn-account-delete");
    this.$modal = document.querySelector(".modal");
    this.$email = document.querySelector(".email");
    this.$completeToast = document.querySelector(".toast-complete");

    new Header(document.querySelector(".header"));

    new Modal(document.querySelector("#modal-account-delete"), {
      title: "회원탈퇴 하시겠습니까?",
      content: "작성한 질문과 답변은 삭제됩니다.",
      onAccept: () => this.handleDeleteAccount(),
    });

    this.completeToast = new Toast(this.$completeToast, { msg: "수정 완료" });

    this.user = await this.handleGetProfile();

    this.$inputs.nickname.value = this.user.nickname;
    this.$email.textContent = this.user.email;
    this.$profileImage.src = await getUserProfile(this.user.profileImageName);
  }

  async handleGetProfile() {
    try {
      const response = await myPage();
      return parseData(response);
    } catch (e) {}
  }

  async handleDeleteAccount() {
    try {
      const response = await deleteAccount();

      if (isSuccess(response)) {
        alert("회원탈퇴가 완료되었습니다.");
        navigateTo(ROUTES.LOGIN);
        return;
      }

      alert("회원탈퇴에 실패했습니다.");
    } catch (e) {}
  }

  setEvents() {
    // 입력값 검증
    this.$inputs.nickname.addEventListener("blur", async (e) => {
      const nickname = e.target.value;

      if (nicknameValidator(nickname)) {
        return;
      }

      if (nickname === this.user.nickname) {
        return;
      }

      try {
        const response = await nicknameValidation({ nickname });

        if (!isSuccess(response)) {
          return;
        }

        const data = await parseData(response);
        if (!data.available) {
          this.$helperTexts.nickname.textContent = MESSAGES.duplicatedNickname;
          disableButton(this.$registerBtn);
          return;
        }

        this.request = { ...this.request, nickname };
        enableButton(this.$editBtn);
      } catch (e) {}
    });

    // 프로필 업로드
    this.$profilePreview.addEventListener("click", () => this.$inputs.profile.click());

    this.$inputs.profile.addEventListener("change", (e) => {
      const profileImage = e.target.files[0];

      if (!profileImage) return;

      const reader = new FileReader();
      reader.onload = () => {
        this.$profileImage.src = reader.result;
        this.$profileImage.classList.remove("hidden");
        this.$helperTexts.profile.textContent = "";
      };
      reader.readAsDataURL(profileImage);

      this.request = { ...this.request, profileImage };
      enableButton(this.$editBtn);
    });

    // 회원정보 수정 API 요청
    this.$editBtn.addEventListener("click", async () => {
      if (!isButtonEnabled(this.$editBtn)) {
        return;
      }

      try {
        const response = await editAccount(this.request);

        if (isSuccess(response)) {
          const data = await parseData(response);
          this.completeToast.show();
          if ("profileImage" in this.request) {
            Auth.updateProfile(data.profileImageName);
          }
          return;
        }

        alert("회원정보 수정에 실패했습니다.");
      } catch (e) {}
    });

    this.$deleteAccountBtn.addEventListener("click", () => {
      this.$modal.classList.toggle("hidden");
    });
  }

  template() {
    return /*html*/ `
      <h1>회원정보수정</h1>

      <form class="user-form">
        <div class="user-form-input-group profile-edit-form-input-group">
          <label for="image" class="label">프로필 사진 *</label>

          <p class="helper-text helper-text-profile text-red"></p>

          <div class="profile-preview bg-gray">
            <img class="profile-image" />
            <button
              type="button"
              class="btn-edit-image bg-black-alpha-half text-white">
              변경
            </button>
          </div>
          <input
            type="file"
            id="image"
            class="input-profile hidden"
            accept="image/*"
            autocomplete="off" />
        </div>

        <div class="user-form-input-group profile-edit-form-input-group">
          <span class="label">이메일</span>
          <p class="email"></p>
        </div>

        <div class="user-form-input-group profile-edit-form-input-group">
          <label for="nickname" class="label">닉네임 *</label>
          <input
            type="text"
            id="nickname"
            class="input-nickname"
            placeholder="닉네임을 입력하세요."
            required />

          <p class="helper-text helper-text-nickname text-red"></p>
        </div>

        <button
          type="button"
          class="btn-edit user-form-button bg-btn-disabled text-white">
          수정하기
        </button>
      </form>

      <button type="button" class="btn-account-delete text-black">
        회원탈퇴
      </button>

      <div class="toast-complete hidden"></div>

      <div
        id="modal-account-delete"
        class="modal bg-black-alpha-half hidden"></div>
    `;
  }
}

new ProfileEditPage(document.querySelector(".container"));
