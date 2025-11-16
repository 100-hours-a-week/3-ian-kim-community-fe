import { isSuccess, parseData } from "../../../api/base-api.js";
import { getPostDetail, updatePost } from "../../../api/post-api.js";
import Component from "../../../components/core/Component.js";
import Header from "../../../components/header/Header.js";
import { getUrlSearchParam, navigateTo, ROUTES } from "../../../router/router.js";
import { Auth } from "../../../store/auth-store.js";
import PostForm from "../../../components/post/PostForm.js";
import { disableButton } from "../../../utils/form-utils.js";

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

    this.request = {};
    this.post;

    try {
      await this.requestPostDetail(getUrlSearchParam("id"));
    } catch (e) {}
  }

  afterRendered() {
    new Header(document.querySelector(".header"));

    new PostForm(this.target, {
      title: "게시글 수정",
      btnName: "완료",
      post: this.post,
      onSubmit: ($inputs, image) => this.handleSubmit($inputs, image),
    });

    this.$inputTitle = document.querySelector(".input-title");
    this.$inputContent = document.querySelector(".input-content");
    this.$postBtn = document.querySelector(".btn-post");
  }

  setEvents() {
    this.$inputTitle.addEventListener("blur", (e) => {
      const title = e.target.value;
      if (this.post.title === title) {
        disableButton(this.$postBtn);
        return;
      }

      this.request = { ...this.request, title };
    });

    this.$inputContent.addEventListener("blur", (e) => {
      const content = e.target.value;
      if (this.post.content === content) {
        disableButton(this.$postBtn);
        return;
      }

      this.request = { ...this.request, content };
    });
  }

  async requestPostDetail(postId) {
    try {
      const response = await getPostDetail(postId);
      this.post = await parseData(response);
    } catch (e) {}
  }

  async handleSubmit($inputs, image) {
    if (image) {
      this.request = { ...this.request, image };
    }

    try {
      const response = await updatePost(this.post.postId, this.request);

      if (isSuccess(response)) {
        alert("질문이 수정되었습니다.");
        navigateTo(`${ROUTES.POST_DETAIL}?id=${this.post.postId}`);
        return;
      }

      alert("질문 수정에 실패했습니다.");
    } catch (e) {}
  }

  template() {
    return /*html*/ ``;
  }
}

new PostEditPage(document.querySelector(".container"));
