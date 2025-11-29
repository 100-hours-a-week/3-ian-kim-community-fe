import Component from "../core/Component.js";
import { navigateTo, ROUTES } from "../../router/router.js";

export default class AuthHeader extends Component {
  render() {
    this.target.outerHTML = this.template();
  }

  async afterRendered() {
    this.$headerTitle = document.querySelector(".header-title");
  }

  setEvents() {
    this.$headerTitle.addEventListener("click", () => {
      navigateTo(ROUTES.POST_LIST);
    });
  }

  template() {
    return /*html*/ `
      <header class="auth-header">
        <h1 class="header-title">DevTalk</h1>
      </header>
    `;
  }
}
