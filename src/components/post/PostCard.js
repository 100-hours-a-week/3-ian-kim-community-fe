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
    this.$profileArea = document.querySelector(
      `#profile-area-post-card-${this.post.postId}`
    );

    new ProfileIcon(this.$profileArea, {
      profilePath: this.post.authorProfile,
      id: `profile-icon-post-card-${this.post.postId}`,
    });
  }

  setEvents() {
    document
      .querySelector(`.post-card-${this.post.postId}`)
      .addEventListener("click", () => {
        navigateTo(`${ROUTES.POST_DETAIL}?id=${this.post.postId}`);
      });
  }

  template() {
    return /*html*/ `
      <article class="post-card post-card-${this.post.postId}">
        <h3 class="post-title">${this.post.title.slice(0, 26)}</h3>
        <div class="post-info">
          <div class="post-stats">
            <span class="like-cnt"
              >좋아요 ${formatCompactNumber(this.post.likeCount)}</span
            >
            <span class="comment-cnt"
              >댓글 ${formatCompactNumber(this.post.commentCount)}</span
            >
            <span class="view-cnt"
              >조회수 ${formatCompactNumber(this.post.viewCount)}</span
            >
          </div>
          <span class="created-date">${this.post.createdDate}</span>
        </div>

        <hr class="divider" />

        <div class="author-profile">
          <div id="profile-area-post-card-${this.post.postId}"></div>
          <span class="author-name">${this.post.authorNickname}</span>
        </div>
      </article>
    `;
  }
}
