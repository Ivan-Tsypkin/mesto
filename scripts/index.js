const editPopupButton = document.querySelector('.profile__edit-button'); //Выбираем кнопку Редактировать профиль
const addCardPopupButton = document.querySelector('.profile__add-button'); //Выбираем кнопку Добавить карточку
const popups = document.querySelectorAll('.popup'); // Выбираем все попапы
const editProfilePopup = document.querySelector('.popup_type_edit'); //Выбираем попап редактирования профиля
const closeProfilePopupButton = editProfilePopup.querySelector('.popup__close-button'); //Выбираем кнопку закрытия попапа профиля
const addCardPopup = document.querySelector('.popup_type_new-card'); //Выбираем попап добавления карточки
const closeAddCardPopupButton = addCardPopup.querySelector('.popup__close-button'); //Выбираем кнопку закрытия попапа добавления карточки
const popupShowImage = document.querySelector('.popup_type_image'); //Выбираем попап с картинкой
const closePopupShowImageButton = popupShowImage.querySelector('.popup__close-button'); //Выбираем кнопку закрытия попапа фото карточки
const popupCardPicture = popupShowImage.querySelector('.popup__image'); //Выбираем фото попапа с фото карточки
const popupCardTitle = popupShowImage.querySelector('.popup__caption'); //Выбираем подпись попапа с фото карточки
const profilePopupForm = editProfilePopup.querySelector('.popup__form'); //Находим форму редактирования профиля
const saveCardForm = addCardPopup.querySelector('.popup__form'); //Находим форму добавления карточки
const nameInput = editProfilePopup.querySelector('.popup__form-item_value_name'); //находим поле формы Имя
const jobInput = editProfilePopup.querySelector('.popup__form-item_value_job'); //Находим поле формы Работа
const profileName = document.querySelector('.profile__name'); //Выбираем имя профиля
const profileJob = document.querySelector('.profile__job'); //Выбираем название работы профиля
const closePopupButtons = document.querySelectorAll('.popup__close-button'); // Выбираем все кнопки закрытия попапа
const itemTemplate = document.querySelector('.cards__tamplate').content; //Выбираем шаблон карточки
const picNameInput = document.querySelector('.popup__form-item_value_pic-name'); //Находим инпут названия картинки
const linkInput = document.querySelector('.popup__form-item_value_link'); //Находим инпут ссылки на картинку
const cardsList = document.querySelector('.cards__list'); //Находим лист с картинками

function createNewCard(card) {  //Функция рендера отдельной карточки
  const htmlElement = itemTemplate.cloneNode(true); //Клонируем шаблон
  htmlElement.querySelector('.cards__image-caption').innerText = card.name; //Присваиваем имя карточки
  const cardImage = htmlElement.querySelector('.cards__image'); //Записываем элемент фото карточки
  cardImage.src = card.link; //Присваиваем ссылку на карточку
  cardImage.alt = card.alt; //Присваиваем описание карточки
  htmlElement.querySelector('.cards__remove-button').addEventListener('click', deleteCard); //Выбираем кнопку удалить карточку и сразу вешаем слушатель
  htmlElement.querySelector('.cards__like-button').addEventListener('click', handleLikeCard); //Выбираем кнопку лайк и сразу вешаем слушатель
  cardImage.addEventListener('click', () => openImagePopup(card.name, card.link)); //Выбираем картинку и сразу вешаем слушатель
  return htmlElement;
};

function renderCard(elem) { //Функция добавления карточки на страницу
  cardsList.prepend(elem);
}

function openPopup(popup) { //Функция открытия попапа
  popup.classList.add('popup_opened');
  popup.addEventListener('mousedown', closePopupOnOverlay); //Выбрал ивент mousedown т.к. при click, если сначала нажать клавишу мыши в области контейнера попапа, а потом перенести курсор на оверлей и отпустить клавишу, то попап закроется. Так не удобно редактировать поля формы (когда выделяешь текст и случайно вышел за пределы контейнера)
  document.addEventListener('keydown', closePopupOnEscape);
}

function closePopupOnOverlay(event) {  //Функция закрытия попапа по клику на оверлей
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}

function closePopupOnEscape (event) { //Функция закрытия попапа по клавише Escape
  if (event.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function closePopup(popup) { //Функция закрытия попапа
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', closePopupOnOverlay);
  document.removeEventListener('keydown', closePopupOnEscape);
}

function openEditPopup () { //Функция открытия попапа редактирования профиля
  openPopup(editProfilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
} //Решил просто убрать активацию кнопки при первом открытии попапа, ведь действительно, если данные не редактировались, то и пересохранять не имеет смысла

function submitProfileForm (evt) { //Функция сохранения профиля
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(editProfilePopup);
}

function openAddCardPopup () { //Функция открытия попапа добавления карточек
  openPopup(addCardPopup); //Открываем попап добавления карточек
} //Так же решил убрать добавление сообщений о заполнении полей, чтобы не нагромождать код ну и если уж не обязательно :)

function submitAddCardForm (evt) {  //Функция сохранения карточки
  evt.preventDefault();
  const card = {
      name: picNameInput.value,
      link: linkInput.value,
      alt: picNameInput.value //Alt для новых карточек берём из названия фото
    }
  const newCard = createNewCard(card);
  renderCard(newCard);
  closePopup(addCardPopup);
  const inputList = Array.from(addCardPopup.querySelectorAll('.popup__form-item'));
  const buttonElement = addCardPopup.querySelector('.popup__submit-button');
  saveCardForm.reset(); //Сбрасываю форму после сохранения карточки
  toggleButtonState(inputList, buttonElement, 'popup__submit-button_disabled'); //Вызываем функцию переключения сабмит-кнопки
}

function deleteCard(evt) {  //Функция удаления карточки
  evt.target.closest('.cards__item').remove();
}

function handleLikeCard(event) {  //Функция лайка карточки
  event.target.classList.toggle('cards__like-button_active');
}

function openImagePopup(name, link) { //Открываем попап с картинкой
  openPopup(popupShowImage);
  popupCardPicture.src = link;
  popupCardPicture.alt = name;
  popupCardTitle.textContent = name;
}

editPopupButton.addEventListener('click', openEditPopup); //Вешаем слушатель на кнопку Редактировать профиль
closeProfilePopupButton.addEventListener('click', () => closePopup(editProfilePopup)); //Вешаем слушатель на кнопкe закрытия попапа профиля
closeAddCardPopupButton.addEventListener('click', () => closePopup(addCardPopup)); //Вешаем слушатель на кнопкe закрытия попапа добавления карточки
closePopupShowImageButton.addEventListener('click', () => closePopup(popupShowImage)); //Вешаем слушатель на кнопкe закрытия попапа фото карточки
profilePopupForm.addEventListener('submit', submitProfileForm); //Вешаем слушатель submit на форму редактирования профиля
addCardPopupButton.addEventListener('click', openAddCardPopup); //Вешаем слушатель на кнопку добавления карточек
saveCardForm.addEventListener('submit', submitAddCardForm); //Вешаем слушатель submit на форму добавления карточки


cards.forEach((card) => { //Рендер стандартных карточек карточек
  const newCard = createNewCard(card);
  renderCard(newCard);
});
