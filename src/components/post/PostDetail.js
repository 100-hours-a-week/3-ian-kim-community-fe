import { getImage } from "../../api/image-api.js";
import Component from "../core/Component.js";
import { Auth } from "../../store/auth-store.js";
import { formatCompactNumber } from "../../utils/fomat-utils.js";
import ProfileIcon from "../profile/ProfileIcon.js";

export default class PostDetail extends Component {
  beforeRendered() {
    this.post = this.props.post;
    this.isAuthor = Auth.getAuth() === this.post.authorId;
  }

  afterRendered() {
    this.$deleteBtn = document.querySelector(".btn-post-delete");
    this.$editBtn = document.querySelector(".btn-post-edit");
    this.$likeBtn = document.querySelector(".btn-post-like");
    this.$likeCnt = document.querySelector(".like-cnt");
    this.$postActions = document.querySelector(".post-actions");
    this.$postImage = document.querySelector(".post-img");

    this.$profileArea = document.querySelector(`#profile-area-post-detail-${this.post.postId}`);

    new ProfileIcon(this.$profileArea, {
      profilePath: this.post.authorProfileImageName,
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
      try {
        const response = await getImage(this.post.imagePath);
        const blob = await response.blob();
        this.$postImage.src = URL.createObjectURL(blob);
        this.$postImage.classList.remove("hidden");
      } catch (e) {}
    }
  }

  template() {
    return /*html*/ `
      <h3 class="post-title">${this.post.title}</h3>

      <div class="post-header">
        <div class="post-detaul-header-info">
          <div class="author-profile">
            <div id="profile-area-post-detail-${this.post.postId}"></div>
            <span class="author-name">${this.post.authorNickname}</span>
          </div>

          <div class="post-detail-info">
            <div>
              <span class="post-detail-header-name">작성일</span>
              <span class="created-date">${this.post.createdDate}</span>
            </div>

            <div>
              <span class="post-detail-header-name">수정일</span>
              <span class="updated-date">${this.post.updatedDate}</span>
            </div>

            <div>
              <span class="post-detail-header-name">조회수</span>
              <span class="post-detail-view-count"
                >${formatCompactNumber(this.post.viewCount)}</span
              >
            </div>
          </div>
        </div>

        <div class="post-actions">
          <button class="btn-post-edit">수정</button>
          <button class="btn-post-delete">삭제</button>
        </div>
      </div>

      <div class="post-content">
        <img src="" alt="이미지" class="post-img hidden" />
        <p>${this.post.content}</p>

        <div class="post-stats">
          <button
            class="like-box btn-post-like ${this.post.liked && "liked"}">
            <span class="thumbs-emoji">👍</span>
            <span class="like-cnt"
              >${formatCompactNumber(this.post.likeCount)}</span
            >
          </button>
          <!--
          <button
            class="like-box btn-post-unlike">
            <span class="thumbs-emoji">👎</span>
            <span class="like-cnt"
              >0</span
            >
          </button>
          -->
        </div>
      </div>
    `;
  }
}
