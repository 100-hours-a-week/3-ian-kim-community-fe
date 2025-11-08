import Header from "../../../components/header/Header.js";

export default class ProfileEdit {
  constructor() {
    new Header({ hasBackBtn: true, hasProfileIcon: true });
  }
}

new ProfileEdit();
