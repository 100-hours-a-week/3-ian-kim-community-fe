import { isSuccess } from "../../api/base-api.js";
import { deleteComment } from "../../api/comment-api.js";
import Component from "../core/Component.js";
import CommentCreate from "./CommentCreate.js";
import CommentItem from "./CommentItem.js";

export default class CommentSection extends Component {
  beforeRendered() {
    this.postId = this.props.postId;
    this.comments = this.props.comments;
  }

  afterRendered() {
    this.commentCreate = new CommentCreate(
      document.querySelector(".comment-create"),
      {
        postId: this.postId,
      }
    );

    const $commentList = document.querySelector(".comment-list");
    this.comments.forEach((comment) => {
      new CommentItem($commentList, {
        comment,
        onClickEdit: (comment) => this.handleCommentEdit(comment),
        onDelete: (commentId) => this.handleCommentDelete(commentId),
      });
    });
  }

  handleCommentEdit(comment) {
    this.commentCreate.changeToEditMode(comment);
  }

  async handleCommentDelete(commentId) {
    const response = await deleteComment(commentId);

    if (isSuccess(response)) {
      alert("댓글이 삭제되었습니다.");
      window.location.reload();
      return;
    }

    alert("댓글 삭제에 실패했습니다.");
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
