import Component from "../../../Component.js";
import PostForm from "../../../components/post/PostForm.js";
import { navigateTo, ROUTES } from "../../../router/router.js";

export default class PostCreate extends Component {
  afterMounted() {
    new PostForm(document.querySelector(".container"), {
      title: "게시글 생성",
      btnName: "완료",
      onSubmit: () => this.handleSubmit(),
    });
  }

  handleSubmit() {
    // todo: 게시글 생성 API 요청
    const isPostCreateSuccess = true;

    if (isPostCreateSuccess) {
      alert("게시글이 생성되었습니다.");
      navigateTo(ROUTES.POST_LIST);
    }
  }

  render() {
    this.target.outerHTML = this.template();
  }

  template() {
    return /*html*/ ` <main class="container"></main> `;
  }
}

new PostCreate(document.querySelector(".container"));
