import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

cards.forEach((item) => { //Рендер стандартных карточек
  const card = new Card(item, '.cards__tamplate');
  const newCard = card.generateCard();
  cardsList.prepend(newCard);
});

const config = {
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  invalidInputClass: 'popup__form-item_state_invalid'
}

const profileEditFormValidator = new FormValidator(config, '.popup__form_type_profile')
profileEditFormValidator.enableValidation()

const addCardFormValidator = new FormValidator(config, '.popup__form_type_add-card')
addCardFormValidator.enableValidation()

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
  const item = {
      name: picNameInput.value,
      link: linkInput.value,
      alt: picNameInput.value //Alt для новых карточек берём из названия фото
    }
  const card = new Card(item, '.cards__tamplate');
  const newCard = card.generateCard();
  cardsList.prepend(newCard);
  closePopup(addCardPopup);
  saveCardForm.reset(); //Сбрасываю форму после сохранения карточки
  addCardFormValidator._toggleButtonState(); //Вызываем функцию переключения сабмит-кнопки
}

editPopupButton.addEventListener('click', openEditPopup); //Вешаем слушатель на кнопку Редактировать профиль
closeProfilePopupButton.addEventListener('click', () => closePopup(editProfilePopup)); //Вешаем слушатель на кнопкe закрытия попапа профиля
closeAddCardPopupButton.addEventListener('click', () => closePopup(addCardPopup)); //Вешаем слушатель на кнопкe закрытия попапа добавления карточки
closePopupShowImageButton.addEventListener('click', () => closePopup(popupShowImage)); //Вешаем слушатель на кнопкe закрытия попапа фото карточки
profilePopupForm.addEventListener('submit', submitProfileForm); //Вешаем слушатель submit на форму редактирования профиля
addCardPopupButton.addEventListener('click', openAddCardPopup); //Вешаем слушатель на кнопку добавления карточек
saveCardForm.addEventListener('submit', submitAddCardForm); //Вешаем слушатель submit на форму добавления карточки

export default openPopup;
