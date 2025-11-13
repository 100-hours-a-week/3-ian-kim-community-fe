export default class Component {
  constructor(target, props) {
    this.target = target;
    this.props = props;
    this.init();
  }

  init() {
    this.beforeRendered();
    this.render();
    this.afterRendered();
    this.setEvents();
  }

  beforeRendered() {}

  afterRendered() {}

  render() {
    if (this.target) {
      this.target.innerHTML = this.template();
    }
  }

  setEvents() {}

  template() {
    return /*html*/ ``;
  }
}
