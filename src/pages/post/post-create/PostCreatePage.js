import { isSuccess } from "../../../api/base-api.js";
import { createPost } from "../../../api/post-api.js";
import Component from "../../../components/core/Component.js";
import Header from "../../../components/header/Header.js";
import PostForm from "../../../components/post/PostForm.js";
import { navigateTo, ROUTES } from "../../../router/router.js";
import { Auth } from "../../../store/auth-store.js";
import { parseInputValues } from "../../../utils/form-utils.js";

export default class PostCreatePage extends Component {
  beforeRendered() {
    if (!Auth.validateAuth()) {
      return;
    }
  }

  afterRendered() {
    new Header(document.querySelector(".header"));

    new PostForm(document.querySelector(".container"), {
      title: "질문 작성",
      btnName: "완료",
      onSubmit: ($inputs, image) => this.handleSubmit($inputs, image),
    });
  }

  async handleSubmit($inputs, image) {
    const request = image ? { ...parseInputValues($inputs), image } : parseInputValues($inputs);
    const response = await createPost(request);

    if (isSuccess(response)) {
      alert("질문이 생성되었습니다.");
      navigateTo(ROUTES.POST_LIST);
      return;
    }

    alert("질문 생성에 실패했습니다.");
  }

  template() {
    return /*html*/ ``;
  }
}

new PostCreatePage(document.querySelector(".container"));
