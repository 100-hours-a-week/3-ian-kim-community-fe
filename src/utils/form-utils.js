const btnDisabled = "bg-btn-disabled";
const btnEnabled = "bg-btn-enabled";

export const enableButton = (button) => {
  button.classList.replace(btnDisabled, btnEnabled);
};

export const disableButton = (button) => {
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

export const addUploadProfileImageEvent = (
  inputs,
  helperTexts,
  profilePreview,
  profileImage,
  button
) => {
  profilePreview.addEventListener("click", () => inputs.image.click());

  inputs.image.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      profileImage.src = reader.result;
      profileImage.classList.remove("hidden");
      helperTexts.image.textContent = "";
      checkAllInputValid(inputs, helperTexts, button);
    };
    reader.readAsDataURL(file);
  });
};
