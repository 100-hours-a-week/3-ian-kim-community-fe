import Component from "../../Component.js";
import { formatCompactNumber } from "../../utils/fomat-utils.js";

export default class PostDetail extends Component {
  afterMounted() {
    this.$deleteBtn = document.querySelector(".btn-post-delete");
    this.$editBtn = document.querySelector(".btn-post-edit");
    this.$likeBtn = document.querySelector(".btn-post-like");
    this.$likeCnt = document.querySelector(".like-cnt");
  }

  setEvents() {
    this.$deleteBtn.addEventListener("click", () => {
      this.props.onClickDelete();
    });

    this.$editBtn.addEventListener("click", () => {
      this.props.onClickEdit();
    });

    this.$likeBtn.addEventListener("click", () => {
      this.props.onClickLike(this.$likeBtn, this.$likeCnt);
    });
  }

  template() {
    return /*html*/ `
      <h3 class="post-title">${this.props.post.title}</h3>

      <div class="post-header">
        <div class="author-profile">
          <img src="" alt="작성자 프로필" class="author-profile-icon bg-gray" />
          <span class="author-name">${this.props.post.author}</span>
        </div>

        <span class="created-date">${this.props.post.createdDate}</span>

        <div class="post-actions">
          <button class="btn-post-edit">수정</button>
          <button class="btn-post-delete">삭제</button>
        </div>
      </div>

      <hr class="divider" />

      <div class="post-content">
        <img
          src=""
          alt="이미지"
          class="post-img ${this.props.post.image || "hidden"}" />
        <p>${this.props.post.content}</p>

        <div class="post-stats">
          <button
            class="stat-box btn-post-like ${
              this.props.post.liked ? "liked" : "not-liked"
            }">
            <span class="like-cnt"
              >${formatCompactNumber(this.props.post.likeCount)}</span
            >
            <span>좋아요</span>
          </button>
          <div class="stat-box bg-gray">
            <span>${formatCompactNumber(this.props.post.viewCount)}</span>
            <span>조회수</span>
          </div>
          <div class="stat-box bg-gray">
            <span>${formatCompactNumber(this.props.post.commentCount)}</span>
            <span>댓글</span>
          </div>
        </div>
      </div>
    `;
  }
}
