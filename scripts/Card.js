import openPopup from "./index.js"; //Без этого импорта не работает метод класса _openImagePopup()
import {popupShowImage, popupCardPicture, popupCardTitle} from "./constants.js"


class Card { //Инициализация класса карточки
  constructor(data, cardTemplateSelector) {
    this._cardName = data.name;
    this._cardImageLink = data.link;
    this._cardImageAlt = data.alt;
    this._cardTemplateSelector = cardTemplateSelector
  }

  _getTemplate() { //функция получения образца разметки карточки
    const cardElement = document.querySelector(this._cardTemplateSelector).content.querySelector('.cards__item').cloneNode(true)
    return cardElement;
  }

  generateCard() { //Функция наполнения карточки контентом
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    this._cardElement.querySelector('.cards__image-caption').innerText = this._cardName;
    const cardImage = this._cardElement.querySelector('.cards__image');
    cardImage.src = this._cardImageLink;
    cardImage.alt = this._cardImageAlt;
    return this._cardElement;
  }

  _setEventListeners() { //Функция установки слушателей
    this._cardElement.querySelector('.cards__remove-button').addEventListener('click', () => this._deleteCard());
    this._cardElement.querySelector('.cards__like-button').addEventListener('click', () => this._handleLikeCard());
    this._cardElement.querySelector('.cards__image').addEventListener('click', () => this._openImagePopup());
  }

  _handleLikeCard() { //Функция лайка
    this._cardElement.querySelector('.cards__like-button').classList.toggle('cards__like-button_active');
  }

  _deleteCard() {  //Функция удаления карточки
    this._cardElement.remove();
  }

  _openImagePopup() { //Открываем попап с картинкой
    popupCardPicture.src = this._cardImageLink;
    popupCardPicture.alt = this._cardName;
    popupCardTitle.textContent = this._cardName;
    openPopup(popupShowImage);
  }

}

export default Card;
