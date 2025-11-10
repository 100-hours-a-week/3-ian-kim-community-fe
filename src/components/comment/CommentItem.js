import Component from "../../Component.js";
import Modal from "../modal/Modal.js";

export default class CommentItem extends Component {
  setUp() {
    this.comment = this.props.comment;
  }

  render() {
    this.target.insertAdjacentHTML("beforeend", this.template());
  }

  afterMounted() {
    this.$editBtn = document.querySelector(
      `.comment-item-${this.comment.commentId} .btn-comment-edit`
    );

    this.$deleteBtn = document.querySelector(
      `.comment-item-${this.comment.commentId} .btn-comment-delete`
    );

    this.$commentDeleteModal = this.target.querySelector(
      `#modal-comment-delete-${this.comment.commentId}`
    );

    new Modal(this.$commentDeleteModal, {
      title: "댓글을 삭제하시겠습니까?",
      content: "삭제한 내용은 복구할 수 없습니다.",
      onAccept: () => this.props.onDelete(this.comment.commentId),
    });
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
            <img
              src=""
              alt="작성자 프로필"
              class="author-profile-icon bg-gray" />
            <span class="author-name">${this.comment.author}</span>
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
