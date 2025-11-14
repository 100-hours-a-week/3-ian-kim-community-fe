import { getImage } from "../../api/image-api.js";
import Component from "../core/Component.js";
import { Auth } from "../../store/auth-store.js";
import { formatCompactNumber } from "../../utils/fomat-utils.js";
import ProfileIcon from "../profile/ProfileIcon.js";

export default class PostDetail extends Component {
  beforeRendered() {
    this.post = this.props.post;
    this.isAuthor = Auth.getAuth() === this.post.userId;
  }

  afterRendered() {
    this.$deleteBtn = document.querySelector(".btn-post-delete");
    this.$editBtn = document.querySelector(".btn-post-edit");
    this.$likeBtn = document.querySelector(".btn-post-like");
    this.$likeCnt = document.querySelector(".like-cnt");
    this.$postActions = document.querySelector(".post-actions");
    this.$postImage = document.querySelector(".post-img");

    this.$profileArea = document.querySelector(
      `#profile-area-post-detail-${this.post.postId}`
    );

    new ProfileIcon(this.$profileArea, {
      profilePath: this.post.authorProfile,
      id: `profile-icon-post-detail-${this.post.postId}`,
    });

    if (!this.isAuthor) {
      this.$postActions.classList.add("visibility-hidden");
    }

    this.getPostImage();
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

  async getPostImage() {
    if (this.post.imagePath) {
      const response = await getImage(this.post.imagePath);
      const blob = await response.blob();
      this.$postImage.src = URL.createObjectURL(blob);
      this.$postImage.classList.remove("hidden");
    }
  }

  template() {
    return /*html*/ `
      <h3 class="post-title">${this.post.title}</h3>

      <div class="post-header">
        <div class="author-profile">
          <div id="profile-area-post-detail-${this.post.postId}"></div>
          <span class="author-name">${this.post.authorNickname}</span>
        </div>

        <span class="created-date">${this.post.createdDate}</span>

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
          class="post-img hidden" />
        <p>${this.post.content}</p>

        <div class="post-stats">
          <button
            class="stat-box btn-post-like ${
              this.post.liked ? "liked" : "not-liked"
            }">
            <span class="like-cnt"
              >${formatCompactNumber(this.post.likeCount)}</span
            >
            <span>좋아요</span>
          </button>
          <div class="stat-box bg-gray">
            <span>${formatCompactNumber(this.post.viewCount)}</span>
            <span>조회수</span>
          </div>
          <div class="stat-box bg-gray">
            <span>${formatCompactNumber(this.post.commentCount)}</span>
            <span>댓글</span>
          </div>
        </div>
      </div>
    `;
  }
}
