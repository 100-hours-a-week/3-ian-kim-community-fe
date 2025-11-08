import { formatCompactNumber } from "../../../utils/fomat-utils.js";

export default class PostCard {
  #post;

  constructor({ post }) {
    this.#post = post;
  }

  template() {
    return /*html*/ `
      <article class="post-card" data-post-id=${this.#post.postId}>
        <h3 class="post-title">${this.#post.title.slice(0, 26)}</h3>
        <div class="post-info">
          <div class="post-stats">
            <span class="like-cnt"
              >좋아요 ${formatCompactNumber(this.#post.likeCount)}</span
            >
            <span class="comment-cnt"
              >댓글 ${formatCompactNumber(this.#post.commentCount)}</span
            >
            <span class="view-cnt"
              >조회수 ${formatCompactNumber(this.#post.viewCount)}</span
            >
          </div>
          <span class="created-date">${this.#post.createdDate}</span>
        </div>

        <hr class="divider" />

        <div class="author-profile">
          <img src="" alt="작성자 프로필" class="author-profile-icon bg-gray" />
          <span class="author-name">${this.#post.author}</span>
        </div>
      </article>
    `;
  }
}
