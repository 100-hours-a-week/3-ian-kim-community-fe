import Header from "../header/Header.js";
import Component from "../../Component.js";
import {
  postContentValidator,
  postTitleValidator,
} from "../../utils/validation-utils.js";
import {
  addValidationEvents,
  isButtonEnabled,
  parseInputValues,
  setInputElemets,
} from "../../utils/form-utils.js";

export default class PostForm extends Component {
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

    this.$postBtn = document.querySelector(".btn-post");
  }

  setEvents() {
    // 입력값 검증
    addValidationEvents(
      this.$inputs,
      this.$helperTexts,
      this.$postBtn,
      this.VALIDATORS
    );

    this.$postBtn.addEventListener("click", () => {
      if (!isButtonEnabled(this.$postBtn)) {
        return;
      }

      const request = parseInputValues(this.$inputs);
      this.props.onSubmit(request);
    });
  }

  template() {
    return /*html*/ `
      <h1>${this.props.title}</h1>

      <form class="post-form">
        <div class="input-group">
          <label for="input-title">제목 *</label>
          <input
            type="text"
            id="input-title"
            class="input-title"
            ${this.props.post?.title ? `value="${this.props.post.title}"` : ""}
            maxlength="26"
            placeholder="제목을 입력해주세요. (최대 26글자)" />
        </div>

        <div class="input-group">
          <label for="input-content">내용 *</label>
          <textarea
            id="input-content"
            class="input-content"
            placeholder="내용을 입력해주세요.">
${this.props.post?.content || ""}</textarea
          >
        </div>

        <p
          class="helper-text helper-text-title helper-text-content text-red"></p>

        <div class="input-group">
          <label for="input-image">이미지</label>
          <input
            type="file"
            id="input-image"
            class="input-image"
            accept="image/*" />
        </div>

        <button type="button" class="btn-post bg-btn-disabled text-white">
          ${this.props.btnName}
        </button>
      </form>
    `;
  }
}
