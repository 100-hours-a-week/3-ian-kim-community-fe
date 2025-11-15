import { isSuccess, parseData } from "../../../api/base-api.js";
import { getPostDetail, updatePost } from "../../../api/post-api.js";
import Component from "../../../components/core/Component.js";
import Header from "../../../components/header/Header.js";
import { getUrlSearchParam, navigateTo, ROUTES } from "../../../router/router.js";
import {
  addValidationEvents,
  checkAllInputValid,
  isButtonEnabled,
  setInputElemets,
} from "../../../utils/form-utils.js";
import { Auth } from "../../../store/auth-store.js";
import { postContentValidator, postTitleValidator } from "../../../utils/validation-utils.js";

export default class PostEditPage extends Component {
  async init() {
    await this.beforeRendered();
    this.render();
    this.afterRendered();
    this.setEvents();
  }

  async beforeRendered() {
    if (!Auth.validateAuth()) {
      return;
    }

    this.VALIDATORS = {
      title: postTitleValidator,
      content: postContentValidator,
    };
    this.$inputs = {};
    this.$helperTexts = {};
    this.request = {};
    this.image;
    this.post;

    await this.requestPostDetail(getUrlSearchParam("id"));
  }

  afterRendered() {
    new Header(document.querySelector(".header"));

    setInputElemets(this.$inputs, this.$helperTexts, this.VALIDATORS);

    this.$inputTitle = document.querySelector(".input-title");
    this.$inputContent = document.querySelector(".input-content");
    this.$inputImage = document.querySelector(".input-image");
    this.$editBtn = document.querySelector(".btn-post");
  }

  setEvents() {
    addValidationEvents(this.$inputs, this.$helperTexts, this.$editBtn, this.VALIDATORS);

    this.$inputTitle.addEventListener("blur", (e) => {
      const title = e.target.value;
      if (this.post.title !== title) {
        this.request = { ...this.request, title };
      }
    });

    this.$inputContent.addEventListener("blur", (e) => {
      const content = e.target.value;
      if (this.post.content !== content) {
        this.request = { ...this.request, content };
      }
    });

    this.$inputImage.addEventListener("change", (e) => {
      this.image = e.target.files[0];

      if (!this.image) {
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.$inputImage.src = reader.result;
      };
      reader.readAsDataURL(this.image);

      checkAllInputValid(this.$inputs, this.$helperTexts, this.$editBtn);
    });

    this.$editBtn.addEventListener("click", () => {
      if (!isButtonEnabled(this.$editBtn)) {
        return;
      }

      if (this.image) {
        this.request["image"] = this.image;
      }
      this.handleSubmit({ ...this.request });
    });
  }

  async requestPostDetail(postId) {
    const response = await getPostDetail(postId);
    this.post = await parseData(response);
  }

  async handleSubmit(request) {
    const response = await updatePost(this.post.postId, request);

    if (isSuccess(response)) {
      alert("게시글이 수정되었습니다.");
      navigateTo(`${ROUTES.POST_DETAIL}?id=${this.post.postId}`);
      return;
    }

    alert("게시글 수정에 실패했습니다.");
  }

  template() {
    return /*html*/ `
      <h1>게시글 수정</h1>

      <form class="post-form">
        <div class="input-group">
          <label for="input-title">제목 *</label>
          <input
            type="text"
            id="input-title"
            class="input-title"
            ${this.post?.title ? `value="${this.post.title}"` : ""}
            maxlength="26"
            placeholder="제목을 입력해주세요. (최대 26글자)" />
        </div>

        <div class="input-group">
          <label for="input-content">내용 *</label>
          <textarea
            id="input-content"
            class="input-content"
            placeholder="내용을 입력해주세요.">
${this.post?.content || ""}</textarea
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
          수정하기
        </button>
      </form>
    `;
  }
}

new PostEditPage(document.querySelector(".container"));
