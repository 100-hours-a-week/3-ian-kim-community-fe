import { isSuccess } from "../../api/base-api.js";
import { createComment, updateComment } from "../../api/comment-api.js";
import Component from "../../Component.js";
import {
  disableButton,
  enableButton,
  isButtonEnabled,
} from "../../utils/form-utils.js";

export default class CommentCreate extends Component {
  beforeRendered() {
    this.postId = this.props.postId;
  }

  afterRendered() {
    this.$createBtn = document.querySelector(".btn-create");
    this.$textArea = document.querySelector(".input-comment");

    this.commentCreateListener = async () => {
      if (!isButtonEnabled(this.$createBtn)) {
        return;
      }

      const response = await createComment(this.postId, {
        content: this.$textArea.value,
      });

      if (isSuccess(response)) {
        alert("댓글이 생성되었습니다.");
        window.location.reload();
        return;
      }

      alert("댓글 생성에 실패했습니다.");
    };
  }

  setEvents() {
    this.$textArea.addEventListener("input", (e) => {
      if (e.target.value) {
        enableButton(this.$createBtn);
        return;
      }
      disableButton(this.$createBtn);
    });

    this.$createBtn.addEventListener("click", this.commentCreateListener);
  }

  changeToEditMode(comment) {
    this.$textArea.value = comment.content;
    this.$createBtn.textContent = "댓글 수정";

    this.$createBtn.removeEventListener("click", this.commentCreateListener);

    this.$createBtn.addEventListener("click", async () => {
      if (!isButtonEnabled(this.$createBtn)) {
        return;
      }

      const response = await updateComment(comment.commentId, {
        content: this.$textArea.textContent,
      });
      if (isSuccess(response)) {
        alert("댓글이 수정되었습니다.");
        window.location.reload();
        return;
      }

      alert("댓글 수정에 실패했습니다.");
    });
  }

  template() {
    return /*html*/ `
      <textarea
        id="comment"
        class="input-comment"
        placeholder="댓글을 남겨주세요!"></textarea>

      <div class="btn-create-box">
        <button class="btn-create bg-btn-disabled text-white">댓글 등록</button>
      </div>
    `;
  }
}
