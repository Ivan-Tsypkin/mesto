import './index.css'

import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js"
import {editPopupButton, addCardPopupButton, nameInput, jobInput, cards, config} from "../scripts/utils/constants.js";


const cardSection = new Section({     //Создаем экземпляр класса Section для секции с карточками
  data: cards,
  renderer: (cardItem) => cardGenerator(cardItem)
  },
  '.cards__list'
);

cardSection.renderItems();

const profileEditFormValidator = new FormValidator(config, '.popup__form_type_profile') //Экземпляр валидации формы профиля
profileEditFormValidator.enableValidation()

const addCardFormValidator = new FormValidator(config, '.popup__form_type_add-card') //Экземпляр валидации формы карточки
addCardFormValidator.enableValidation()

const imagePopup = new PopupWithImage('.popup_type_image'); //Экземпляр попапа картинки карточки
imagePopup.setEventListeners();

const addCardPop = new PopupWithForm('.popup_type_new-card', (formData) => {  //Экземпляр попапа добавления карточки
  submitAddCardForm(formData);
});
addCardPop.setEventListeners();

const editProfilePop = new PopupWithForm('.popup_type_edit', (formData) => {  //Экземпляр попапа профиля
  submitProfileForm(formData);
});
editProfilePop.setEventListeners();

const userInfo = new UserInfo('.profile__name', '.profile__job'); //Экземпляр инфо пользователя


function createCard(cardItem) { //Функция создания карточки
  const card = new Card(cardItem, '.cards__tamplate', () => {imagePopup.open(cardItem.link, cardItem.name)});
  return card.generateCard()
}

function cardGenerator(cardItem) {  //Функция добавления карточки
  const newCard = createCard(cardItem);
  cardSection.setItem(newCard);
}

function submitProfileForm (data) { //Функция сохранения профиля
  userInfo.setUserInfo(data)
  editProfilePop.close();
}

function submitAddCardForm (data) {  //Функция сохранения карточки
  const item = {
      name: data.picName,
      link: data.picLink,
      alt: data.picName //Alt для новых карточек берём из названия фото
    }
  cardGenerator(item);
  addCardPop.close();
  addCardFormValidator.resetValidation();
}


editPopupButton.addEventListener('click', () => {
  const userInfoData = userInfo.getUserInfo();
  nameInput.value = userInfoData.userName;
  jobInput.value = userInfoData.userJob;
  profileEditFormValidator.resetValidation()
  editProfilePop.open()
}); //Вешаем слушатель на кнопку Редактировать профиль

addCardPopupButton.addEventListener('click', () => {
  addCardFormValidator.resetValidation();
  addCardPop.open()}); //Вешаем слушатель на кнопку добавления карточек
