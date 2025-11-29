import { isSuccess } from "../../api/base-api.js";
import { createComment, updateComment } from "../../api/comment-api.js";
import Component from "../core/Component.js";
import { disableButton, enableButton, isButtonEnabled } from "../../utils/form-utils.js";

export default class CommentCreate extends Component {
  beforeRendered() {
    this.postId = this.props.postId;
  }

  afterRendered() {
    this.$createBtn = document.querySelector(".btn-create");
    this.$textArea = document.querySelector(".input-comment");

    this.commentWriteListener = async (requestFn, successHandler, successMsg, failMsg) => {
      if (!isButtonEnabled(this.$createBtn)) {
        return;
      }

      try {
        const response = await requestFn();

        if (isSuccess(response)) {
          alert(successMsg);
          successHandler();
          return;
        }

        alert(failMsg);
      } catch (e) {}
    };

    this.commentCreateListener = () =>
      this.commentWriteListener(
        () => createComment(this.postId, { content: this.$textArea.value }),
        () => {
          this.props.onCreate();
          this.$textArea.value = "";
        },
        "답변이 생성되었습니다.",
        "답변 생성에 실패했습니다."
      );

    this.commentUpdateListener = (comment, content) =>
      this.commentWriteListener(
        () => updateComment(comment.commentId, { content }),
        () => this.props.onUpdate(comment.commentId, content),
        "답변이 수정되었습니다.",
        "답변 수정에 실패했습니다."
      );

    this.onClickUpdateBtn = () => {
      if (!this.targetComment) {
        return;
      }
      this.commentUpdateListener(this.targetComment, this.$textArea.value);
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

  changeToCreateMode() {
    this.$textArea.value = "";
    this.$createBtn.textContent = "답변 등록하기";
    this.$createBtn.removeEventListener("click", this.onClickUpdateBtn);
    this.$createBtn.addEventListener("click", this.commentCreateListener);
  }

  changeToEditMode(comment) {
    this.targetComment = comment;
    this.$textArea.value = comment.content;
    this.$createBtn.textContent = "답변 수정하기";
    this.$createBtn.removeEventListener("click", this.commentCreateListener);
    this.$createBtn.addEventListener("click", this.onClickUpdateBtn);
  }

  template() {
    return /*html*/ `
      <textarea
        id="comment"
        class="input-comment"
        placeholder="답변을 남겨주세요!"></textarea>

      <div class="btn-create-box">
        <button class="btn-create bg-btn-disabled text-white">답변 등록하기</button>
      </div>
    `;
  }
}
