import Component from "../../../components/core/Component.js";
import { isSuccess, parseData } from "../../../api/base-api.js";
import { getPostList } from "../../../api/post-api.js";
import Header from "../../../components/header/Header.js";
import PostCard from "../../../components/post/PostCard.js";
import { navigateTo, ROUTES } from "../../../router/router.js";

export default class PostListPage extends Component {
  beforeRendered() {
    this.page = 0;
    this.hasNextPage = false;
    this.isLoading = false;
    this.$lastPostCard;
    this.$postList;
    this.posts = [];
  }

  async afterRendered() {
    new Header(document.querySelector(".header"));

    this.$postListPage = document.querySelector(".post-list-page");
    this.$postList = document.querySelector(".post-list");
    this.observer = new IntersectionObserver((entries) => this.handleObserve(entries), {
      root: this.$postListPage,
      rootMargin: "0px",
      scrollMargin: "0px",
      threshold: 1.0,
    });

    this.$filterBtns = document.querySelectorAll(".btn-filter");
    this.$sortBtns = document.querySelectorAll(".btn-sort");
    this.$categoryBtns = document.querySelectorAll(".btn-post-category");
    this.$activeCategoryBtn = document.querySelector(".btn-category-all");
    this.$activeFilterBtn = document.querySelector(".btn-all-post");
    this.$activeSortBtn = document.querySelector(".btn-sort-latest");

    await this.handleGetPostList(this.$postList);
  }

  setEvents() {
    document.querySelector(".btn-write").addEventListener("click", () => {
      navigateTo(ROUTES.POST_CREATE);
    });

    this.setbtnClickActivelistener(this.$filterBtns, this.$activeFilterBtn);
    this.setbtnClickActivelistener(this.$sortBtns, this.$activeSortBtn);
    this.setbtnClickActivelistener(this.$categoryBtns, this.$activeCategoryBtn);

    this.$postList.addEventListener("click", (e) => {
      const $postCard = e.target.closest(".post-card");
      if ($postCard) {
        navigateTo(`${ROUTES.POST_DETAIL}?id=${$postCard.dataset.postId}`);
      }
    });
  }

  setbtnClickActivelistener($btns, $activeBtn) {
    $btns.forEach(($btn) => {
      $btn.addEventListener("click", () => {
        $activeBtn.classList.remove("active");
        $activeBtn = $btn;
        $activeBtn.classList.add("active");
      });
    });
  }

  handleObserve(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting && this.hasNextPage && !this.isLoading) {
        this.isLoading = true;
        this.handleGetPostList();
        this.isLoading = false;
      }
    });
  }

  async handleGetPostList() {
    try {
      const response = await getPostList(this.page++);

      if (!isSuccess(response)) {
        alert("질문 목록 조회에 실패했습니다.");
        return;
      }

      const data = await parseData(response);
      if (!data?.content) {
        return;
      }

      this.posts = data.content;
      this.hasNextPage = data.page.number < data.page.totalPages;
      this.addPostCards();
    } catch (e) {}
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
      <div class="post-list-page">
        <div class="post-list-header">
          <div class="post-category-btns">
            <button class="btn-post-category btn-category-all active">전체</button>
            <button class="btn-post-category btn-category-backend">백엔드</button>
            <button class="btn-post-category btn-category-frontend">프론트엔드</button>
            <button class="btn-post-category btn-category-ai">AI</button>
            <button class="btn-post-category btn-category-cloud">클라우드</button>
            <button class="btn-post-category btn-category-career">커리어</button>
            <button class="btn-post-category btn-category-etc">기타</button>
          </div>

          <div class="search-write-group">
            <input
              type="text"
              id="post-search"
              class="post-search"
              placeholder="질문을 검색해보세요." />

            <button class="btn-write">질문 작성하기</button>
          </div>

          <div class="filter-sort-group">
            <div class="filter-btns">
              <button class="btn-all-post btn-filter active">전체</button>
              <button class="btn-my-question btn-filter">내가 작성한 질문</button>
              <button class="btn-my-answer btn-filter">내가 작성한 답변</button>
            </div>

            <div class="sort-btns">
              <button class="btn-sort-latest btn-sort active">최신순</button>
              <button class="btn-sort-like btn-sort">추천순</button>
              <button class="btn-sort-view btn-sort">조회순</button>
            </div>
          </div>
        </div>
        <section class="post-list"></section>
      </div>
    `;
  }
}

new PostListPage(document.querySelector(".post-container"));
