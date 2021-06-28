import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {editPopupButton, addCardPopupButton, editProfilePopup, closeProfilePopupButton, addCardPopup, closeAddCardPopupButton, popupShowImage, closePopupShowImageButton,
  profilePopupForm, saveCardForm, nameInput, jobInput, profileName, profileJob, picNameInput, linkInput, cardsList, cards, config} from "./constants.js"

cards.forEach((item) => { //Рендер стандартных карточек
  cardGenerator(item);
});

const profileEditFormValidator = new FormValidator(config, '.popup__form_type_profile')
profileEditFormValidator.enableValidation()

const addCardFormValidator = new FormValidator(config, '.popup__form_type_add-card')
addCardFormValidator.enableValidation()

function cardGenerator(cardItem) {
  const card = new Card(cardItem, '.cards__tamplate');
  const newCard = card.generateCard();
  cardsList.prepend(newCard);
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
  profileEditFormValidator.repeatValidation();
}

function submitProfileForm (evt) { //Функция сохранения профиля
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(editProfilePopup);
}

function submitAddCardForm (evt) {  //Функция сохранения карточки
  evt.preventDefault();
  const item = {
      name: picNameInput.value,
      link: linkInput.value,
      alt: picNameInput.value //Alt для новых карточек берём из названия фото
    }
  cardGenerator(item);
  closePopup(addCardPopup);
  saveCardForm.reset(); //Сбрасываю форму после сохранения карточки
  addCardFormValidator.repeatValidation();
}

editPopupButton.addEventListener('click', openEditPopup); //Вешаем слушатель на кнопку Редактировать профиль
closeProfilePopupButton.addEventListener('click', () => closePopup(editProfilePopup)); //Вешаем слушатель на кнопкe закрытия попапа профиля
closeAddCardPopupButton.addEventListener('click', () => closePopup(addCardPopup)); //Вешаем слушатель на кнопкe закрытия попапа добавления карточки
closePopupShowImageButton.addEventListener('click', () => closePopup(popupShowImage)); //Вешаем слушатель на кнопкe закрытия попапа фото карточки
profilePopupForm.addEventListener('submit', submitProfileForm); //Вешаем слушатель submit на форму редактирования профиля
addCardPopupButton.addEventListener('click', () => openPopup(addCardPopup)); //Вешаем слушатель на кнопку добавления карточек
saveCardForm.addEventListener('submit', submitAddCardForm); //Вешаем слушатель submit на форму добавления карточки

export default openPopup;
