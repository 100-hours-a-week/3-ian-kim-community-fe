import Component from "../core/Component.js";
import {
  postContentValidator,
  postTitleValidator,
} from "../../utils/validation-utils.js";
import {
  addValidationEvents,
  checkAllInputValid,
  isButtonEnabled,
  parseInputValues,
  setInputElemets,
} from "../../utils/form-utils.js";

export default class PostForm extends Component {
  beforeRendered() {
    this.VALIDATORS = {
      title: postTitleValidator,
      content: postContentValidator,
    };
    this.$inputs = {};
    this.$helperTexts = {};
    this.imageFile;
  }

  afterRendered() {
    setInputElemets(this.$inputs, this.$helperTexts, this.VALIDATORS);

    this.$postBtn = document.querySelector(".btn-post");
    this.$inputImage = document.querySelector(".input-image");
  }

  setEvents() {
    // 입력값 검증
    addValidationEvents(
      this.$inputs,
      this.$helperTexts,
      this.$postBtn,
      this.VALIDATORS
    );

    this.$inputImage.addEventListener("change", (e) => {
      this.imageFile = e.target.files[0];

      if (!this.imageFile) return;

      const reader = new FileReader();
      reader.onload = () => {
        this.$inputImage.src = reader.result;
      };
      reader.readAsDataURL(this.imageFile);

      checkAllInputValid(this.$inputs, this.$helperTexts, this.$postBtn);
    });

    this.$postBtn.addEventListener("click", () => {
      if (!isButtonEnabled(this.$postBtn)) {
        return;
      }

      const request = parseInputValues(this.$inputs);
      if (this.imageFile) {
        request["image"] = this.imageFile;
      }
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
