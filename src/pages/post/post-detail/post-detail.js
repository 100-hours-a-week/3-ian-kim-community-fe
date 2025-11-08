import Header from "../../../components/header/Header.js";

export default class PostCreate {
  constructor() {
    new Header({ hasBackBtn: true, hasProfileIcon: true });
  }
}

new PostCreate();
