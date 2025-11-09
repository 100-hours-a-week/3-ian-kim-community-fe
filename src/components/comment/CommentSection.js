import Component from "../../Component.js";
import CommentCreate from "./CommentCreate.js";
import CommentItem from "./CommentItem.js";

export default class CommentSection extends Component {
  afterMounted() {
    this.commentCreate = new CommentCreate(
      document.querySelector(".comment-create")
    );

    const $commentList = document.querySelector(".comment-list");
    this.props.comments.forEach((comment) => {
      new CommentItem($commentList, {
        comment,
        onClickEdit: (comment) => this.handleCommentEdit(comment),
        onDelete: () => this.handleCommentDelete(),
      });
    });
  }

  handleCommentEdit(comment) {
    this.commentCreate.changeToEditMode(comment);
  }

  handleCommentDelete() {
    // todo: 댓글 삭제 API 요청
    const isCommentDeleteSuccess = true;
    if (isCommentDeleteSuccess) {
      alert("댓글이 삭제되었습니다.");
      window.location.reload();
    }
  }

  template() {
    return /*html*/ `
      <div class="comment-create"></div>
      <ul class="comment-list">
        <li class="comment-item"></li>
      </ul>
    `;
  }
}
