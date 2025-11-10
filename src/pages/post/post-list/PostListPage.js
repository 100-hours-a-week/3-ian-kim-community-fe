import Component from "../../../Component.js";
import { isSuccess, parseData } from "../../../api/base-api.js";
import { getPostList } from "../../../api/post-api.js";
import Header from "../../../components/header/Header.js";
import PostCard from "../../../components/post/PostCard.js";
import { navigateTo, ROUTES } from "../../../router/router.js";
import { Auth } from "../../../store/auth-store.js";

export default class PostListPage extends Component {
  beforeRendered() {
    if (!Auth.validateAuth()) {
      return;
    }

    this.page = 0;
    this.hasNextPage = false;
    this.$lastPostCard;
    this.$postList;
    this.posts = [];
  }

  async afterRendered() {
    new Header(document.querySelector(".header"), {
      hasProfileIcon: true,
    });

    this.$postList = document.querySelector(".post-list");
    this.observer = new IntersectionObserver(
      (entries) => this.handleObserve(entries),
      {
        root: this.$postList,
        rootMargin: "0px",
        scrollMargin: "0px",
        threshold: 0.5,
      }
    );

    await this.handleGetPostList(this.$postList);
  }

  setEvents() {
    document.querySelector(".btn-write").addEventListener("click", () => {
      navigateTo(ROUTES.POST_CREATE);
    });
  }

  handleObserve(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting && this.hasNextPage) {
        this.handleGetPostList();
      }
    });
  }

  async handleGetPostList() {
    const response = await getPostList(this.page++);

    if (!isSuccess(response)) {
      alert("게시글 목록 조회에 실패했습니다.");
      return;
    }

    const data = await parseData(response);
    if (!data?.content) {
      return;
    }

    this.posts = data.content;
    this.hasNextPage = data.page.number < data.page.totalPages;
    this.addPostCards();
  }

  addPostCards() {
    this.posts.forEach((post) => {
      new PostCard(this.$postList, {
        post,
      });
    });

    const $nextPostCard = this.$postList.querySelector(".post-card:last-child");
    if ($nextPostCard) {
      if (this.$lastPostCard) {
        this.observer.unobserve(this.$lastPostCard);
      }
      this.$lastPostCard = $nextPostCard;
      this.observer.observe(this.$lastPostCard);
    }
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

new PostListPage(document.querySelector(".container"));
