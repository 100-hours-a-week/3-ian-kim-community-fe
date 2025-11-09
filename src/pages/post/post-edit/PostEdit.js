import { parseData } from "../../../api/base-api.js";
import { getPostDetail, updatePost } from "../../../api/post-api.js";
import Component from "../../../Component.js";
import PostForm from "../../../components/post/PostForm.js";
import {
  getUrlSearchParam,
  navigateTo,
  ROUTES,
} from "../../../router/router.js";

export default class PostEdit extends Component {
  async afterMounted() {
    const postId = getUrlSearchParam("id");
    const response = await getPostDetail(postId);
    this.post = await parseData(response);

    new PostForm(document.querySelector(".container"), {
      title: "게시글 수정",
      btnName: "수정하기",
      onSubmit: (request) => this.handleSubmit(request),
      post: this.post,
    });
  }

  async handleSubmit(request) {
    const response = await updatePost(this.post.postId, request);

    if (isSuccess(response)) {
      alert("게시글이 수정되었습니다.");
      navigateTo(`${ROUTES.POST_DETAIL}?id=${this.states.post.postId}`);
    }

    alert("게시글 수정에 실패했습니다.");
  }

  render() {
    this.target.outerHTML = this.template();
  }

  template() {
    return /*html*/ ` <main class="container"></main> `;
  }
}

new PostEdit(document.querySelector(".container"));
