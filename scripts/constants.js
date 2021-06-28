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

const cards = [  //Массив стандартных карточек
  { name: 'Эльбрус',
    link: './images/Elbrus.png',
    alt: 'Гора Эльбрус, Солнце скрылось за вершину'},
  { name: 'Коми',
    link: './images/Komi.png',
    alt: 'Коми, река, лес, Зима'},
  { name: 'Москва',
    link: './images/Moscow.png',
    alt: 'Москва, центр города, день, небоскрёбы'},
  { name: 'Санкт-Петербург',
    link: './images/Saint-Petersburg.png',
    alt: 'Санкт-Петербург, вечер, разведённый мост'},
  { name: 'Сочи',
    link: './images/Sochi.png',
    alt: 'Сочи, побережье, огни ночного города с высоты птичьего полёта'},
  { name: 'Владивосток',
    link: './images/Vladivostok.png',
    alt: 'Владивосток, день, люди смотрят на Золотой мост'},
]

const config = {
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  invalidInputClass: 'popup__form-item_state_invalid'
}

export {editPopupButton, addCardPopupButton, popups, editProfilePopup, closeProfilePopupButton, addCardPopup, closeAddCardPopupButton, popupShowImage, closePopupShowImageButton,
  popupCardPicture, popupCardTitle, profilePopupForm, saveCardForm, nameInput, jobInput, profileName, profileJob, closePopupButtons, itemTemplate, picNameInput, linkInput, cardsList, cards, config}
