export default class Toast {
  #target;
  #toast;

  constructor() {
    this.#target = document.querySelector(".toast-complete");
    this.#render();
  }

  #render() {
    this.#target.outerHTML = this.#template();
    this.#toast = document.querySelector(".toast-complete");
  }

  show() {
    this.#toast.classList.replace("hidden", "show");

    setTimeout(() => {
      this.#toast.classList.replace("show", "hidden");
    }, 2000);
  }

  #template() {
    return /*html*/ `
      <div class="toast-complete bg-purple text-white hidden">수정완료</div>
    `;
  }
}
