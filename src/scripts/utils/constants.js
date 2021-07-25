const editPopupButton = document.querySelector('.profile__edit-button'); //Выбираем кнопку Редактировать профиль
const addCardPopupButton = document.querySelector('.profile__add-button'); //Выбираем кнопку Добавить карточку
const profileAvatar = document.querySelector('.profile__avatar-container'); //Выбираем аватар
const nameInput = document.querySelector('.popup__form-item_value_name'); //находим поле формы Имя
const jobInput = document.querySelector('.popup__form-item_value_job'); //Находим поле формы Работа


const config = {
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  invalidInputClass: 'popup__form-item_state_invalid'
}

const configApi = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: 'a37d820a-4f35-49a2-9bb2-cba80f833b0c',
    'Content-Type': 'application/json'
  }
}

export {editPopupButton, profileAvatar, addCardPopupButton, nameInput, jobInput, config, configApi}
