import { isSuccess, parseData } from "../../../api/base-api.js";
import { MESSAGES } from "../../../common/constants.js";
import {
  deleteAccount,
  editAccount,
  myPage,
  nicknameValidation,
} from "../../../api/user-api.js";
import Component from "../../../Component.js";
import Header from "../../../components/header/Header.js";
import Modal from "../../../components/modal/Modal.js";
import Toast from "../../../components/toast/Toast.js";
import { navigateTo, ROUTES } from "../../../router/router.js";
import {
  addUploadProfileImageEvent,
  addValidationEvents,
  disableButton,
  isButtonEnabled,
  parseInputValues,
  setInputElemets,
} from "../../../utils/form-utils.js";
import {
  nicknameValidator,
  profileImageValidator,
} from "../../../utils/validation-utils.js";

export default class ProfileEdit extends Component {
  setUp() {
    this.VALIDATORS = {
      nickname: nicknameValidator,
      // image: profileImageValidator,
    };
    this.$inputs = {};
    this.$helperTexts = {};
  }

  async afterMounted() {
    setInputElemets(this.$inputs, this.$helperTexts, this.VALIDATORS);

    this.$profilePreview = document.querySelector(".profile-preview");
    this.$profileImage = document.querySelector(".profile-image");
    this.$editBtn = document.querySelector(".btn-edit");
    this.$deleteAccountBtn = document.querySelector(".btn-account-delete");
    this.$modal = document.querySelector(".modal");

    new Header(document.querySelector(".header"), {
      hasBackBtn: true,
      hasProfileIcon: true,
    });

    new Modal(document.querySelector("#modal-account-delete"), {
      title: "회원탈퇴 하시겠습니까?",
      content: "작성한 게시글과 댓글은 삭제됩니다.",
      onAccept: () => this.handleDeleteAccount(),
    });

    this.$toast = new Toast();
    this.user = await this.handleGetProfile();

    this.$inputs.nickname.value = this.user.nickname;
    document.querySelector(".email").textContent = this.user.email;
  }

  async handleGetProfile() {
    const response = await myPage();
    return parseData(response);
  }

  async handleDeleteAccount() {
    const response = await deleteAccount();

    if (isSuccess(response)) {
      alert("회원탈퇴가 완료되었습니다.");
      navigateTo(ROUTES.LOGIN);
    }

    alert("회원탈퇴에 실패했습니다.");
  }

  setEvents() {
    // 입력값 검증
    addValidationEvents(
      this.$inputs,
      this.$helperTexts,
      this.$editBtn,
      this.VALIDATORS
    );

    this.$inputs.nickname.addEventListener("blur", async (e) => {
      const nickname = e.target.value;

      if (nicknameValidator(nickname)) {
        return;
      }

      if (nickname === this.user.nickname) {
        disableButton(this.$editBtn);
      }

      const response = await nicknameValidation({ nickname });
      if (isSuccess(response)) {
        return;
      }

      const data = await parseData(response);
      if (!data.available) {
        this.$helperTexts.nickname.textContent = MESSAGES.duplicatedNickname;
      }
    });

    // // todo: 이미지 업로드
    // addUploadProfileImageEvent(
    //   this.$inputs,
    //   this.$helperTexts,
    //   this.$profilePreview,
    //   this.$profileImage,
    //   this.$editBtn
    // );

    // 회원정보 수정 API 요청
    this.$editBtn.addEventListener("click", async () => {
      if (!isButtonEnabled(this.$editBtn)) {
        return;
      }

      const response = await editAccount(parseInputValues(this.$inputs));

      if (isSuccess(response)) {
        this.$toast.show();
        return;
      }

      alert("회원정보 수정에 실패했습니다.");
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

          <p class="helper-text helper-text-image text-red"></p>

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
            class="input-image hidden"
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

      <div class="toast-complete"></div>

      <div
        id="modal-account-delete"
        class="modal bg-black-alpha-half hidden"></div>
    `;
  }
}

new ProfileEdit(document.querySelector(".container"));
