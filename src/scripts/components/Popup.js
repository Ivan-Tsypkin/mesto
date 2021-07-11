export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
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
    document.addEventListener('keydown', this._closePopupOnEscape.bind(this));
  }


}
