export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupSubmitButton = this._popup.querySelector('.popup__submit-button');
    this._handleEscClose = this._closePopupOnEscape.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _closePopupOnEscape(event) { //Функция закрытия попапа по клавише Escape
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _closePopupOnOverlay(event) {  //Функция закрытия попапа по клику на оверлей
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close-button').addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('mousedown', this._closePopupOnOverlay.bind(this));
  }

  setSubmitButtonMassage(massage) {
    this._popupSubmitButton.textContent = massage;
  }

}
