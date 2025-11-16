import { isSuccess } from "../../api/base-api.js";
import { deleteComment } from "../../api/comment-api.js";
import Component from "../core/Component.js";
import CommentCreate from "./CommentCreate.js";
import CommentItem from "./CommentItem.js";
import CommentPage from "./CommentPage.js";

const COMMENTS_PER_PAGE = 5;

export default class CommentSection extends Component {
  beforeRendered() {
    this.postId = this.props.postId;
    this.comments = this.props.comments;
  }

  afterRendered() {
    this.commentCreate = new CommentCreate(document.querySelector(".comment-create"), {
      postId: this.postId,
    });

    this.$commentList = document.querySelector(".comment-list");
    this.$commentPagination = document.querySelector(".comment-pagination");

    this.loadCommentsOnPage(1);

    new CommentPage(this.$commentPagination, {
      totalPageCnt: Math.max(1, Math.ceil(this.comments.length / COMMENTS_PER_PAGE)),
      onPageChange: (page) => this.loadCommentsOnPage(page),
    });
  }

  loadCommentsOnPage(page) {
    this.currentPage = page;
    this.$commentList.innerHTML = "";
    const start = (this.currentPage - 1) * COMMENTS_PER_PAGE;
    const end = start + COMMENTS_PER_PAGE;

    this.comments.slice(start, end).forEach((comment) => {
      new CommentItem(this.$commentList, {
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
    try {
      const response = await deleteComment(commentId);

      if (isSuccess(response)) {
        alert("답변이 삭제되었습니다.");
        window.location.reload();
        return;
      }

      alert("답변 삭제에 실패했습니다.");
    } catch (e) {}
  }

  template() {
    return /*html*/ `
      <div class="comment-stat">
        <span class="comment-stat-name">답변</span>
        <span class="comment-cnt">${this.comments.length}</span>
      </div>

      <div class="comment-create"></div>

      <ul class="comment-list">
        <li class="comment-item"></li>
      </ul>

      <div class="comment-pagination"></div>
    `;
  }
}
