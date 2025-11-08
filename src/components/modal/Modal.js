export default class Modal {
  #title;
  #content;
  #target;
  #acceptFunc;

  constructor({ title, content, id, acceptFunc }) {
    this.#title = title;
    this.#content = content;
    this.#target = document.querySelector(`#${id}`);
    this.acceptFunc = acceptFunc;
    this.#render();
  }

  #render() {
    this.#target.innerHTML = this.#template();
    this.#addEvents();
  }

  #addEvents() {
    document.querySelector(".btn-cancel").addEventListener("click", () => {
      this.#target.classList.toggle("hidden");
    });

    document.querySelector(".btn-accept").addEventListener("click", () => {
      this.#acceptFunc();
    });
  }

  #template() {
    return /*html*/ `
      <div class="modal-content bg-white">
        <h3 class="modal-title">${this.#title}</h3>
        <p class="modal-detail">${this.#content}</p>
        <div class="modal-buttons">
          <button class="btn-cancel bg-black text-white">취소</button>
          <button class="btn-accept bg-purple">확인</button>
        </div>
      </div>
    `;
  }
}
