const btnDisabled = "bg-btn-disabled";
const btnEnabled = "bg-btn-enabled";

export const enableButton = (button) => {
  button.classList.replace(btnDisabled, btnEnabled);
  return true;
};

export const disableButton = (button) => {
  button.classList.replace(btnEnabled, btnDisabled);
  return false;
};
