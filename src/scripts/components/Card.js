class Card { //Инициализация класса карточки
  constructor(data, userId, cardTemplateSelector, handleCardClick, handleCardDelete, handleCardLike, handleCardUnlike) {
    this._cardName = data.name;
    this._cardImageLink = data.link;
    this._cardImageAlt = data.name;
    this._cardOwnerId = data.owner._id;
    this._cardId = data._id;
    this._userId = userId;
    this._likesArray = data.likes;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    this._handleCardUnlike = handleCardUnlike;
  }

  _getTemplate() { //функция получения образца разметки карточки
    const cardElement = document.querySelector(this._cardTemplateSelector).content.querySelector('.cards__item').cloneNode(true)
    return cardElement;
  }

  generateCard() { //Функция наполнения карточки контентом
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector('.cards__image-caption').innerText = this._cardName;
    this._cardImage = this._cardElement.querySelector('.cards__image');
    this._likeCard = this._cardElement.querySelector('.cards__like-button');
    this._likesNumber = this._cardElement.querySelector('.cards__likes-number');
    this._hasMyLike = this._likesArray.some(item => item._id === this._userId);
    if (this._hasMyLike) {                                                            //Если есть мой лайк, тогда закрась сердечко!
      this._likeCard.classList.add('cards__like-button_active');
    };
    if (this._likesArray.length === 0) {
      this.setLikeNumber('')
    } else {this.setLikeNumber(this._likesArray.length)}
    /* this.setLikeNumber(this._likesArray.length); */
    this._deleteCardButton = this._cardElement.querySelector('.cards__remove-button');
    if (!(this._userId === this._cardOwnerId)) {                                      //Если мой id не совпадает с id автора карточки, то удали "ведёрко"
      this._deleteCardButton.remove();
    };
    this._setEventListeners();
    this._cardImage.src = this._cardImageLink;
    this._cardImage.alt = this._cardImageAlt;
    return this._cardElement;
  }

  setLikeNumber(likeNumber) { //Функция обнволения счетчика лайков
    this._likesNumber.textContent = likeNumber;
  }

  _setEventListeners() { //Функция установки слушателей
    if (this._userId === this._cardOwnerId) {
      this._deleteCardButton.addEventListener('click', this._handleCardDelete);     //Если я автор карточки, то повесь слушатель удаления
    };
    this._likeCard.addEventListener('click', () => this._handleLikeCard());
    this._cardImage.addEventListener('click', this._handleCardClick);
  }

  _handleLikeCard() { //Функция лайка
    if (this._likeCard.classList.contains('cards__like-button_active')) {     //Если лайк уже поставлен, то вызови функцию снятия лайка
      this._handleCardUnlike()
    } else {
      this._handleCardLike()
    };
  }

  handleLikeActiveStateToggle() {                                           //Публичный метод переключения состояния кнопки лайка
    this._likeCard.classList.toggle('cards__like-button_active');
  }

  deleteCard() {  //Функция удаления карточки. Пришлось сделать метод публичным, чтобы вызывать удаление после получания ответа от сервера на команду DELETE
    this._cardElement.remove();
  }

}

export default Card;
