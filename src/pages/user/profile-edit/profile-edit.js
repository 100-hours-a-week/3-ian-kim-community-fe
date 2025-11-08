import Header from "../../../components/header/Header.js";
import Modal from "../../../components/modal/Modal.js";
import Toast from "../../../components/toast/Toast.js";
import {
  addUploadProfileImageEvent,
  addValidationEvents,
  isButtonEnabled,
  setInputElemets,
} from "../../../utils/form-utils.js";
import {
  nicknameValidator,
  profileImageValidator,
} from "../../../utils/validation-utils.js";

export default class ProfileEdit {
  #VALIDATORS = {
    nickname: nicknameValidator,
    image: profileImageValidator,
  };
  #inputs = {};
  #helperTexts = {};
  #profilePreview;
  #profileImage;
  #editBtn;
  #deleteAccountBtn;
  #modal;
  #toast;

  constructor() {
    this.#render();
  }

  #render() {
    new Header({ hasBackBtn: true, hasProfileIcon: true });
    new Modal({
      title: "회원탈퇴 하시겠습니까?",
      content: "작성한 게시글과 댓글은 삭제됩니다.",
      id: "modal-delete-account",
      acceptFunc: () => {}, // todo: 회원탈퇴 API 요청
    });
    this.#toast = new Toast();
    this.#selectElements();
    this.#addEvents();
  }

  #selectElements() {
    setInputElemets(this.#inputs, this.#helperTexts, this.#VALIDATORS);
    this.#profilePreview = document.querySelector(".profile-preview");
    this.#profileImage = document.querySelector(".profile-image");
    this.#editBtn = document.querySelector(".btn-edit");
    this.#deleteAccountBtn = document.querySelector(".btn-delete-account");
    this.#modal = document.querySelector(".modal");
  }

  #addEvents() {
    // 입력값 검증
    addValidationEvents(
      this.#inputs,
      this.#helperTexts,
      this.#editBtn,
      this.#VALIDATORS
    );

    this.#inputs.nickname.addEventListener("blur", (e) => {
      // todo: 닉네임 중복 검사 API 요청
      const isNicknameAvailable = true;

      if (!isNicknameAvailable) {
        this.#helperTexts.nickname.textContent = MESSAGES.duplicatedNickname;
      }
    });

    // 이미지 업로드
    addUploadProfileImageEvent(
      this.#inputs,
      this.#helperTexts,
      this.#profilePreview,
      this.#profileImage,
      this.#editBtn
    );

    // 회원정보 수정 API 요청
    this.#editBtn.addEventListener("click", () => {
      if (!isButtonEnabled(this.#editBtn)) {
        return;
      }

      // todo: 회원정보 수정 API 요청
      const isEditSuccess = true;

      if (isEditSuccess) {
        this.#toast.show();
      }
    });

    // 회원탈퇴 API 요청
    this.#deleteAccountBtn.addEventListener("click", () => {
      this.#modal.classList.toggle("hidden");
    });
  }
}

new ProfileEdit();
