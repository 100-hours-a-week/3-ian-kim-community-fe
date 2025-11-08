import Header from "../../../components/header/Header.js";
import { dummyPosts } from "../../../data/dummy-posts.js";
import { navigateTo, ROUTES } from "../../../router/router.js";
import PostCard from "./post-card.js";

export default class PostList {
  #target;
  #posts;
  #writeBtn;

  constructor() {
    new Header({ hasProfileIcon: true });
    this.#target = document.querySelector(".post-list");
    this.#render();
  }

  #render() {
    // todo: 게시글 목록 조회 API 요청
    this.#posts = dummyPosts;

    this.#posts.forEach((post) => {
      new PostCard({ target: this.#target, post });
    });

    this.#setElements();
    this.#addEvents();
  }

  #setElements() {
    this.#writeBtn = document.querySelector(".btn-write");
  }

  #addEvents() {
    this.#writeBtn.addEventListener("click", () => {
      navigateTo(ROUTES.POST_CREATE);
    });

    document.querySelectorAll(".post-card").forEach((postCard) =>
      postCard.addEventListener("click", (e) => {
        const postId = e.currentTarget.dataset.postId;
        navigateTo(`${ROUTES.POST_DETAIL}?id=${postId}`);
      })
    );
  }
}

new PostList();
