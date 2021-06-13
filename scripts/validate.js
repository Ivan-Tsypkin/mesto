function enableValidation(setup) {  //Функция активации валидации форм
  const form = document.querySelector(setup.formSelector);
  const inputList = Array.from(form.querySelectorAll(setup.inputSelector));
  const buttonElement = form.querySelector(setup.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, setup.inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(form, inputElement);
      toggleButtonState(inputList, buttonElement, setup.inactiveButtonClass);
    });
  });
};

function isValid(formElement, inputElement) { //Функция проверки валидности полей формы
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

function showInputError(formElement, inputElement, errorMessage) { //Функция отображения текста ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
};

function hideInputError(formElement, inputElement) { //Функция скрытия текста ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = '';
};

function hasInvalidInput(inputList) { //Функция проверки наличия невалидных полей
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;})
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) { //Функция переключения состояния сабмит-кнопки
  if (hasInvalidInput(inputList)) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
  } else {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled', true);
  }
}

enableValidation({ //Вызываем функцию активации валидации для формы редактирования профиля
  formSelector: '.popup__form_type_profile',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
});

enableValidation({ //Вызываем функцию активации валидации для формы добавления карточки
  formSelector: '.popup__form_type_add-card',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
});
