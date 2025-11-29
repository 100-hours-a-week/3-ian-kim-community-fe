import Component from "../core/Component.js";

export default class Toast extends Component {
  show() {
    this.target.classList.replace("hidden", "show");

    setTimeout(() => {
      this.target.classList.replace("show", "hidden");
    }, 2000);
  }

  template() {
    return /*html*/ `${this.props.msg}`;
  }
}
