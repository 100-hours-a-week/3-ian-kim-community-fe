const btnDisabled = "bg-btn-disabled";
const btnEnabled = "bg-btn-enabled";

const enableButton = (button) => {
  button.classList.replace(btnDisabled, btnEnabled);
};

const disableButton = (button) => {
  button.classList.replace(btnEnabled, btnDisabled);
};

export const checkAllInputValid = (inputs, helperTexts, button) => {
  const isAllValid =
    Object.values(inputs).every((element) => element.value) &&
    Object.values(helperTexts).every((element) => !element.textContent);

  isAllValid ? enableButton(button) : disableButton(button);
};

export const addValidationEvents = (
  inputs,
  helperTexts,
  button,
  VALIDATORS
) => {
  Object.entries(inputs).forEach(([key, input]) => {
    input.addEventListener("blur", (e) => {
      const validator = VALIDATORS[key];
      helperTexts[key].textContent = validator(e.target.value, inputs);
      checkAllInputValid(inputs, helperTexts, button);
    });
  });
};

export const isButtonEnabled = (button) => {
  return button.classList.contains(btnEnabled);
};

export const setInputElemets = (inputs, helperTexts, VALIDATORS) => {
  Object.keys(VALIDATORS).forEach((key) => {
    inputs[key] = document.querySelector(`.input-${key}`);
    helperTexts[key] = document.querySelector(`.helper-text-${key}`);
  });
};
