export default class Component {
  target;
  props;

  constructor(target, props) {
    this.target = target;
    this.props = props;
    this.setUp();
    this.render();
    this.afterMounted();
    this.setEvents();
  }

  setUp() {}

  afterMounted() {}

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
