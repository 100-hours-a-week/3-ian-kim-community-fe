import Header from "../../../components/header/Header.js";
import Component from "../../../Component.js";
import {
  postContentValidator,
  postTitleValidator,
} from "../../../utils/validation-utils.js";
import {
  addValidationEvents,
  isButtonEnabled,
  setInputElemets,
} from "../../../utils/form-utils.js";
import { navigateTo, ROUTES } from "../../../router/router.js";

export default class PostCreate extends Component {
  setUp() {
    this.VALIDATORS = {
      title: postTitleValidator,
      content: postContentValidator,
    };
    this.$inputs = {};
    this.$helperTexts = {};
  }

  afterMounted() {
    new Header({ hasBackBtn: true, hasProfileIcon: true });

    setInputElemets(this.$inputs, this.$helperTexts, this.VALIDATORS);

    this.$createBtn = document.querySelector(".btn-post-create");
  }

  setEvents() {
    // 입력값 검증
    addValidationEvents(
      this.$inputs,
      this.$helperTexts,
      this.$createBtn,
      this.VALIDATORS
    );

    // 게시글 생성 API 요청
    this.$createBtn.addEventListener("click", () => {
      if (!isButtonEnabled(this.$createBtn)) {
        return;
      }

      // todo: 게시글 생성 API 요청
      const isPostCreateSuccess = true;

      if (isPostCreateSuccess) {
        alert("게시글이 생성되었습니다.");
        navigateTo(ROUTES.POST_LIST);
      }
    });
  }

  template() {
    return /*html*/ `
      <h1>게시글 작성</h1>

      <form class="post-create-form">
        <div class="input-group">
          <label for="input-title">제목 *</label>
          <input
            type="text"
            id="input-title"
            class="input-title"
            maxlength=
            placeholder="제목을 입력해주세요. (최대 26글자)"
            />
        </div>

        <div class="input-group">
          <label for="input-content">내용 *</label>
          <textarea
            id="input-content"
            class="input-content"
            placeholder="내용을 입력해주세요."></textarea>
        </div>

        <p class="helper-text helper-text-title helper-text-content text-red"></p>

        <div class="input-group">
          <label for="input-image">이미지</label>
          <input
            type="file"
            id="input-image"
            class="input-image"
            accept="image/*" />
        </div>

        <button type="button" class="btn-post-create bg-btn-disabled text-white">
          완료
        </button>
      </form>
    `;
  }
}

new PostCreate(document.querySelector(".container"));
