import Component from "../core/Component.js";
import { navigateTo, ROUTES } from "../../router/router.js";
import { formatCompactNumber } from "../../utils/fomat-utils.js";
import ProfileIcon from "../profile/ProfileIcon.js";

export default class PostCard extends Component {
  beforeRendered() {
    this.post = this.props.post;
  }

  render() {
    this.target.insertAdjacentHTML("beforeend", this.template());
  }

  afterRendered() {
    this.$profileArea = document.querySelector(`#profile-area-post-card-${this.post.postId}`);

    new ProfileIcon(this.$profileArea, {
      profilePath: this.post.authorProfileImageName,
      id: `profile-icon-post-card-${this.post.postId}`,
    });
  }

  template() {
    return /*html*/ `
      <article class="post-card post-card-${this.post.postId}" data-post-id="${this.post.postId}">
        <div class="post-card-body">
          <div class="post-card-title">${this.post.title.slice(0, 26)}</div>
          <div class="post-card-content">
            ${
              this.post.content.length >= 40
                ? this.post.content.slice(0, 40) + "..."
                : this.post.content
            }
          </div>
        </div>

        <div class="post-card-footer">
          <div class="post-stats">
            <span class="like-cnt"
              >추천 ${formatCompactNumber(this.post.likeCount)}</span
            >
            <span class="comment-cnt"
              >답변 ${formatCompactNumber(this.post.commentCount)}</span
            >
            <span class="view-cnt"
              >조회수 ${formatCompactNumber(this.post.viewCount)}</span
            >
          </div>

          <div class="author-profile post-card-author-profile">
            <div id="profile-area-post-card-${this.post.postId}"></div>
            <span class="author-name">${this.post.authorNickname}</span>
            <span class="created-date">${this.post.createdDate}</span>
          </div>
        </div>
      </article>
    `;
  }
}
