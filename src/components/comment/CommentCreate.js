import Component from "../../Component.js";
import {
  disableButton,
  enableButton,
  isButtonEnabled,
} from "../../utils/form-utils.js";

export default class CommentCreate extends Component {
  afterMounted() {
    this.$createBtn = document.querySelector(".btn-create");
    this.$textArea = document.querySelector(".input-comment");
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
    this.$textArea.textContent = comment.content;
    this.$createBtn.textContent = "댓글 수정";

    this.$createBtn.removeEventListener("click", this.commentCreateListener);

    this.$createBtn.addEventListener("click", () => {
      if (!isButtonEnabled(this.$createBtn)) {
        return;
      }

      // 댓글 수정 API 요청
      const isCommentUpdateSuccess = true;
      if (isCommentUpdateSuccess) {
        alert("댓글이 수정되었습니다.");
        window.location.reload();
      }
    });
  }

  commentCreateListener() {
    if (!isButtonEnabled(this.$createBtn)) {
      return;
    }

    // 댓글 생성 API 요청
    const isCommentCreateSuccess = true;
    if (isCommentCreateSuccess) {
      alert("댓글이 생성되었습니다.");
      window.location.reload();
    }
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
