import Component from "../../../Component.js";
import { parseData } from "../../../api/base-api.js";
import { getPostList } from "../../../api/post-api.js";
import Header from "../../../components/header/Header.js";
import PostCard from "../../../components/post/PostCard.js";
import { navigateTo, ROUTES } from "../../../router/router.js";

export default class PostList extends Component {
  setUp() {
    this.page = 0;
    this.hasNextPage = false;
  }

  async afterMounted() {
    new Header(document.querySelector(".header"), {
      hasProfileIcon: true,
    });

    // todo: 무한스크롤 구현
    const response = await getPostList(this.page);
    const data = await parseData(response);

    this.hasNextPage = data.page.number < data.page.totalPages;

    data.content.forEach((post) => {
      new PostCard(document.querySelector(".post-list"), {
        post,
      });
    });
  }

  setEvents() {
    document.querySelector(".btn-write").addEventListener("click", () => {
      navigateTo(ROUTES.POST_CREATE);
    });
  }

  template() {
    return /*html*/ `
      <div class="greeting">
        <p>안녕하세요,</p>
        <p>아무 말 대잔치 <strong>게시판</strong>입니다.</p>
      </div>

      <button class="btn-write bg-purple text-white">게시글 작성</button>

      <section class="post-list"></section>
    `;
  }
}

new PostList(document.querySelector(".container"));
