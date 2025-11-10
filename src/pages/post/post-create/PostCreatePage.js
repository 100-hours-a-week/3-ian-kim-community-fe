import { isSuccess } from "../../../api/base-api.js";
import { createPost } from "../../../api/post-api.js";
import Component from "../../../Component.js";
import Header from "../../../components/header/Header.js";
import PostForm from "../../../components/post/PostForm.js";
import { navigateTo, ROUTES } from "../../../router/router.js";
import { Auth } from "../../../store/auth-store.js";

export default class PostCreatePage extends Component {
  beforeRendered() {
    if (!Auth.validateAuth()) {
      return;
    }
  }

  afterRendered() {
    new Header(document.querySelector(".header"), {
      hasBackBtn: true,
      hasProfileIcon: true,
    });

    new PostForm(document.querySelector(".container"), {
      title: "게시글 생성",
      btnName: "완료",
      onSubmit: (request) => this.handleSubmit(request),
    });
  }

  async handleSubmit(request) {
    const response = await createPost(request);

    if (isSuccess(response)) {
      alert("게시글이 생성되었습니다.");
      navigateTo(ROUTES.POST_LIST);
      return;
    }

    alert("게시글 생성에 실패했습니다.");
  }

  render() {
    this.target.outerHTML = this.template();
  }

  template() {
    return /*html*/ ` <main class="container"></main> `;
  }
}

new PostCreatePage(document.querySelector(".container"));
