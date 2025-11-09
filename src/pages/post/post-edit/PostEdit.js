import Component from "../../../Component.js";
import PostForm from "../../../components/post/PostForm.js";
import { dummyPostDetails } from "../../../data/dummy-post-details.js";
import {
  getUrlSearchParam,
  navigateTo,
  ROUTES,
} from "../../../router/router.js";

export default class PostEdit extends Component {
  setUp() {
    // todo: 게시글 상세 조회 API 요청
    const postId = getUrlSearchParam("id");
    this.states.post = dummyPostDetails[postId];
  }

  afterMounted() {
    new PostForm(document.querySelector(".container"), {
      title: "게시글 수정",
      btnName: "수정하기",
      onSubmit: () => this.handleSubmit(),
      post: this.states.post,
    });
  }

  handleSubmit() {
    // todo: 게시글 수정 API 요청
    const isPostUpdateSuccess = true;

    if (isPostUpdateSuccess) {
      alert("게시글이 수정되었습니다.");
      navigateTo(`${ROUTES.POST_DETAIL}?id=${this.states.post.postId}`);
    }
  }

  render() {
    this.target.outerHTML = this.template();
  }

  template() {
    return /*html*/ ` <main class="container"></main> `;
  }
}

new PostEdit(document.querySelector(".container"));
