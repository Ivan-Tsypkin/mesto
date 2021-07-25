import './index.css'

import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupDeleteConfirm from "../scripts/components/PopupDeleteConfirm.js";
import PopupEditAvatar from "../scripts/components/PopupEditAvatar";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js"
import {editPopupButton, profileAvatar, addCardPopupButton, nameInput, jobInput, config, configApi} from "../scripts/utils/constants.js";

//======================================================================================================================================================================//

const cardSection = new Section({     //Создаем экземпляр класса Section для секции с карточками. Пришлось убрать data из конструктора, теперь она передаётся методу renderItems(data)
  renderer: (cardItem, userId) => cardGenerator(cardItem, userId)
  },
  '.cards__list'
);

const api = new Api(configApi); //Экземляр инструкций работы с сервером (API)

const profileEditFormValidator = new FormValidator(config, '.popup__form_type_profile'); //Экземпляр валидации формы профиля
profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, '.popup__form_type_add-card'); //Экземпляр валидации формы карточки
addCardFormValidator.enableValidation();

const editProfileAvatar = new FormValidator(config, '.popup_type_edit-avatar'); //Экземпляр валидации формы смены аватара
editProfileAvatar.enableValidation();

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

const deleteCardConfirmPop = new PopupDeleteConfirm('.popup_type_delete-card-confirm', (cardId, card) => {  //Экземпляр попапа подтверждения удаления карточки
  api.deleteCard(cardId, card)
    .then(card.deleteCard(), deleteCardConfirmPop.close())    //Здесь после потдверждения от сервера удаления карточки, удаляем карточку.
    .catch(err => console.log(err))
});
deleteCardConfirmPop.setEventListeners();

const editProfileAvatarPop = new PopupEditAvatar('.popup_type_edit-avatar', (formData) => submitProfileAvatar(formData)); //Экземпляр попапа смены аватара
editProfileAvatarPop.setEventListeners();

const userInfo = new UserInfo('.profile__name', '.profile__job', '.profile__avatar'); //Экземпляр инфо пользователя

//======================================================================================================================================================================//

function createCard(cardItem, userId) { //Функция создания карточки
  const card = new Card(
    cardItem, userId, '.cards__tamplate',
    () => {imagePopup.open(cardItem.link, cardItem.name)},  //Колбэк открытия фото
    () => {deleteCardConfirmPop.open(cardItem._id, card)}, //Колбэк при клике на "корзину", открываем попап удаления и передаём cardId для отправки на севрвер и объект card для вызова удаления
    () => {api.makeLike(cardItem._id)                      //Колбэк установки лайка
      .then(res => card.setLikeNumber(res.likes.length))
      .catch(err => console.log(err))
    },
    () => {api.makeUnlike(cardItem._id)                    //Колбэк снятия лайка
      .then(res => {if (res.likes.length === 0) {
        card.setLikeNumber('')
      } else {card.setLikeNumber(res.likes.length)}
      })
      .catch(err => console.log(err))
    }
  );
  return card.generateCard()
}

function cardGenerator(cardItem, userId) {  //Функция добавления карточки
  const newCard = createCard(cardItem, userId);
  cardSection.setItem(newCard);
}

function submitProfileForm (data) { //Функция сабмита сохранения профиля
  api.editUserInfo(data)
    .then(editProfilePop.setSubmitButtonMassage('Сохранение...'))
    .then(res => {
      const data = {
        userName: res.name,
        userJob: res.about,
      };
      userInfo.setUserInfo(data)})
    .catch(err => console.log(err))
    .finally(editProfilePop.close(), editProfilePop.setSubmitButtonMassage('Сохранить'))
}

function submitProfileAvatar (data) {  //Функция сабмита сохранения аватара
  api.editUserAvatar(data)
    .then(editProfileAvatarPop.setSubmitButtonMassage('Сохранение...'))
    .then(res => {
      const data = {
        userAvatar: res.avatar,
      };
      userInfo.setUserAvatar(data)
    })
    .catch(err => console.log(err))
    .finally(editProfileAvatarPop.close(), editProfileAvatarPop.setSubmitButtonMassage('Сохранить'))
}

function submitAddCardForm (data) {  //Функция сабмита сохранения карточки
  api.postCard(data)
    .then(addCardPop.setSubmitButtonMassage('Сохранение...'))
    .then(res => cardGenerator(res, res.owner._id))       //Т.к. добавленная нами карточка по умолчанию имеет наш id автора, то можно его взять из ответа сервера
    .catch(err => console.log(err))
    .finally(addCardPop.close(), addCardPop.setSubmitButtonMassage('Создать'), addCardFormValidator.resetValidation())
}

//======================================================================================================================================================================//

editPopupButton.addEventListener('click', () => {   //Вешаем слушатель на кнопку Редактировать профиль
  const userInfoData = userInfo.getUserInfo();
  nameInput.value = userInfoData.userName;
  jobInput.value = userInfoData.userJob;
  profileEditFormValidator.resetValidation()
  editProfilePop.open()
});

addCardPopupButton.addEventListener('click', () => {    //Вешаем слушатель на кнопку добавления карточек
  addCardFormValidator.resetValidation();
  addCardPop.open()
});


profileAvatar.addEventListener('click', () => {   //Вешаем слушатель на аватар
  editProfileAvatar.resetValidation();
  editProfileAvatarPop.open()
});

//======================================================================================================================================================================//

const promises = [api.getUserInfo(), api.getInitialCards()];

Promise.all(promises)
  .then(res => {
    const data = {
      userName: res[0].name,
      userJob: res[0].about,
      userAvatar: res[0].avatar
    };
    userInfo.setUserInfo(data);
    userInfo.setUserAvatar(data);
    cardSection.renderItems(res[1].reverse(), res[0]._id)
  })
  .catch(err => console.log(err))
