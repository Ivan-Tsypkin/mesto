class FormValidator {
  constructor(config, formSelector) {
    this._form = document.querySelector(formSelector);
    this._inputList = this._form.querySelectorAll(config.inputSelector);
    this._submitButton = this._form.querySelector(config.submitButtonSelector);
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._invalidInputClass = config.invalidInputClass
  }

  _isValid(inputElement) { //Функция проверки валидности полей формы
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _showInputError(inputElement) { //Функция отображения текста ошибки
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._invalidInputClass);
    errorElement.textContent = inputElement.validationMessage;
  };

  _hideInputError(inputElement) { //Функция скрытия текста ошибки
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._invalidInputClass);
    errorElement.textContent = '';
  };

  _hasInvalidInput() { //Функция проверки наличия невалидных полей
    return Array.from(this._inputList).some((inputElement) => {
    return !inputElement.validity.valid;})
  }

  _toggleButtonState() { //Функция переключения состояния сабмит-кнопки
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled', true);
    }
  }

  _setEventListeners() { //Установка слушателей
    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() { //Включение валидации
    this._setEventListeners();
  }

  repeatValidation() { //Публичная функция повторной проверки валидации полей после закрытия/открытия попапа профиля и после сабмита добавления карточки
    this._inputList.forEach((inputElement) => {
      this._isValid(inputElement);
      this._toggleButtonState();
    });
  }

}

export default FormValidator;
