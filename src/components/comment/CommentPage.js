import Component from "../core/Component.js";

export default class CommentPage extends Component {
  beforeRendered() {
    this.currentPage = 1;
    this.$activeBtn = "";
  }

  afterRendered() {
    this.$prevPage = document.querySelector(".btn-prev-page");
    this.$nextPage = document.querySelector(".btn-next-page");
    this.$pageNumberList = document.querySelector(".page-number-list");
    this.setPageButtons();
  }

  setEvents() {
    this.$prevPage.addEventListener("click", () => {
      if (this.currentPage > 1) {
        this.changePage(this.$activeBtn.previousElementSibling);
      }
    });

    this.$nextPage.addEventListener("click", () => {
      if (this.currentPage < this.props.totalPageCnt) {
        this.changePage(this.$activeBtn.nextElementSibling);
      }
    });

    this.$pageNumberList.childNodes.forEach(($pageNumber) => {
      $pageNumber.addEventListener("click", () => {
        this.changePage($pageNumber);
      });
    });
  }

  setPageButtons() {
    for (let i = 1; i <= this.props.totalPageCnt; i++) {
      const element = `<button class="btn-page-number btn-page">${i}</button>`;
      this.$pageNumberList.insertAdjacentHTML("beforeend", element);
    }

    this.changePage(document.querySelector(".btn-page-number"));
  }

  changePage($pageNumber) {
    if (this.$activeBtn) {
      this.$activeBtn.classList.remove("active");
    }

    this.$activeBtn = $pageNumber;
    this.$activeBtn.classList.add("active");
    this.currentPage = $pageNumber.textContent;
    this.props.onPageChange(this.currentPage);
  }

  template() {
    return /*html*/ `
      <button class="btn-prev-page btn-page"><</button>

      <div class="page-number-list"></div>

      <button class="btn-next-page btn-page">></button>
    `;
  }
}
