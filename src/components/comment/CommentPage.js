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

    this.$pageNumberList.addEventListener("click", (e) => {
      const $target = e.target.closest(".btn-page-number");
      if ($target) {
        this.changePage($target);
      }
    });
  }

  setPageButtons() {
    for (let i = 1; i <= this.props.totalPageCnt; i++) {
      this.$pageNumberList.insertAdjacentHTML("beforeend", this.createPageButton(i));
    }

    this.changePage(document.querySelector(".btn-page-number"));
  }

  addPageButton(newPageNumber) {
    this.$pageNumberList.insertAdjacentHTML("beforeend", this.createPageButton(newPageNumber));
    this.changePage(document.querySelector(".btn-page-number"));
  }

  removeLastPageButton(totalPageCnt) {
    this.$pageNumberList.removeChild(this.$pageNumberList.lastChild);
    if (this.currentPage > totalPageCnt) {
      this.changePage(this.$pageNumberList.lastChild);
    }
  }

  createPageButton(pageNumber) {
    return `<button class="btn-page-number btn-page">${pageNumber}</button>`;
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

  setProps(props) {
    this.props = { ...this.props, ...props };
  }

  template() {
    return /*html*/ `
      <button class="btn-prev-page btn-page"><</button>

      <div class="page-number-list"></div>

      <button class="btn-next-page btn-page">></button>
    `;
  }
}
