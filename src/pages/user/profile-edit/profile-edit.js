import { isSuccess, parseData } from "../../../api/base-api.js";
import {
  editAccount,
  myPage,
  nicknameValidation,
} from "../../../api/user-api.js";
import Header from "../../../components/header/Header.js";
import Modal from "../../../components/modal/Modal.js";
import Toast from "../../../components/toast/Toast.js";
import { navigateTo, ROUTES } from "../../../router/router.js";
import { validateAuth } from "../../../store/auth-store.js";
import {
  addUploadProfileImageEvent,
  addValidationEvents,
  isButtonEnabled,
  parseInputValues,
  setInputElemets,
} from "../../../utils/form-utils.js";
import {
  nicknameValidator,
  profileImageValidator,
} from "../../../utils/validation-utils.js";

export default class ProfileEdit {
  #VALIDATORS = {
    nickname: nicknameValidator,
    // image: profileImageValidator,
  };
  #inputs = {};
  #helperTexts = {};
  #targetModal;
  #profilePreview;
  #profileImage;
  #editBtn;
  #deleteAccountBtn;
  #modal;
  #toast;

  constructor() {
    validateAuth();
    this.#targetModal = document.querySelector("#modal-account-delete");
    this.#render();
  }

  #render() {
    new Header({ hasBackBtn: true, hasProfileIcon: true });

    new Modal(this.#targetModal, {
      title: "회원탈퇴 하시겠습니까?",
      content: "작성한 게시글과 댓글은 삭제됩니다.",
      onAccept: () => {
        // todo: 회원탈퇴 API 요청
        alert("회원탈퇴가 완료되었습니다.");
        navigateTo(ROUTES.LOGIN);
      },
    });

    window.addEventListener("load", async () => {
      const response = await myPage();
      const user = await parseData(response);
      this.#inputs.nickname.value = user.nickname;
      document.querySelector(".email").textContent = user.email;
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
    this.#deleteAccountBtn = document.querySelector(".btn-account-delete");
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

    this.#inputs.nickname.addEventListener("blur", async (e) => {
      const nickname = e.target.value;

      if (nicknameValidator(nickname)) {
        return;
      }

      const response = await nicknameValidation({ nickname });
      const data = await parseData(response);

      if (isSuccess(response) && !data.available) {
        this.#helperTexts.nickname.textContent = MESSAGES.duplicatedNickname;
      }
    });

    // // todo: 이미지 업로드
    // addUploadProfileImageEvent(
    //   this.#inputs,
    //   this.#helperTexts,
    //   this.#profilePreview,
    //   this.#profileImage,
    //   this.#editBtn
    // );

    // 회원정보 수정 API 요청
    this.#editBtn.addEventListener("click", async () => {
      if (!isButtonEnabled(this.#editBtn)) {
        return;
      }

      const response = await editAccount(parseInputValues(this.#inputs));

      if (isSuccess(response)) {
        this.#toast.show();
      }
    });

    this.#deleteAccountBtn.addEventListener("click", () => {
      this.#modal.classList.toggle("hidden");
    });
  }
}

new ProfileEdit();
