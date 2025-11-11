import Component from "../../Component.js";
import { Auth } from "../../store/auth-store.js";
import Modal from "../modal/Modal.js";
import ProfileIcon from "../profile/ProfileIcon.js";

export default class CommentItem extends Component {
  beforeRendered() {
    this.comment = this.props.comment;
    this.isAuthor = Auth.getAuth() === this.comment.userId;
  }

  render() {
    this.target.insertAdjacentHTML("beforeend", this.template());
  }

  afterRendered() {
    this.$curr = document.querySelector(
      `.comment-item-${this.comment.commentId}`
    );
    this.$editBtn = this.$curr.querySelector(".btn-comment-edit");
    this.$deleteBtn = this.$curr.querySelector(".btn-comment-delete");
    this.$profileArea = document.querySelector(
      `#profile-area-comment-item-${this.comment.commentId}`
    );
    this.$commentActions = this.$curr.querySelector(".comment-actions");
    this.$commentDeleteModal = this.$curr.querySelector(
      `#modal-comment-delete-${this.comment.commentId}`
    );

    new Modal(this.$commentDeleteModal, {
      title: "댓글을 삭제하시겠습니까?",
      content: "삭제한 내용은 복구할 수 없습니다.",
      onAccept: () => this.props.onDelete(this.comment.commentId),
    });

    new ProfileIcon(this.$profileArea, {
      profilePath: this.comment.authorProfile,
      id: `profile-icon-comment-item-${this.comment.commentId}`,
    });

    if (!this.isAuthor) {
      this.$commentActions.classList.add("visibility-hidden");
    }
  }

  setEvents() {
    this.$deleteBtn.addEventListener("click", () => {
      this.$commentDeleteModal.classList.toggle("hidden");
    });

    this.$editBtn.addEventListener("click", () => {
      this.props.onClickEdit(this.comment);
    });
  }

  template() {
    return /*html*/ `
      <li class="comment-item-${this.comment.commentId}">
        <div class="comment-header">
          <div class="author-profile">
            <div id="profile-area-comment-item-${this.comment.commentId}"></div>
            <span class="author-name">${this.comment.authorNickname}</span>
          </div>

          <p class="created-date">${this.comment.createdDate}</p>

          <div class="comment-actions">
            <button class="btn-comment-edit">수정</button>
            <button class="btn-comment-delete">삭제</button>
          </div>
        </div>
        <p class="comment-content">${this.comment.content}</p>

        <div
          id="modal-comment-delete-${this.comment.commentId}"
          class="modal bg-black-alpha-half hidden"></div>
      </li>
    `;
  }
}
