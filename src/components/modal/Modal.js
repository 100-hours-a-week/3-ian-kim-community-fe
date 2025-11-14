import Component from "../core/Component.js";

export default class Modal extends Component {
  afterRendered() {
    this.$cancelBtn = this.target.querySelector(".btn-cancel");
    this.$acceptBtn = this.target.querySelector(".btn-accept");
  }

  setEvents() {
    this.$cancelBtn.addEventListener("click", () => {
      this.target.classList.toggle("hidden");
    });

    this.$acceptBtn.addEventListener("click", () => {
      this.props.onAccept();
    });
  }

  template() {
    return /*html*/ `
      <div class="modal-content bg-white">
        <h3 class="modal-title">${this.props.title}</h3>
        <p class="modal-detail">${this.props.content}</p>
        <div class="modal-buttons">
          <button class="btn-cancel bg-black text-white">취소</button>
          <button class="btn-accept bg-purple">확인</button>
        </div>
      </div>
    `;
  }
}
