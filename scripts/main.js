const editPopupButton = document.querySelector('.profile__edit-button'); //Выбираем кнопку Редактировать профиль
const addCardPopupButton = document.querySelector('.profile__add-button'); //Выбираем кнопку Добавить карточку
const popups = document.querySelectorAll('.popup'); // Выбираем все попапы
const profilePopupForm = Array.from(popups).find(function (popup) {return popup.classList.contains('popup_type_edit')}).querySelector('.popup__form'); //Находим форму редактирования профиля
const saveCardForm = Array.from(popups).find(function (popup) {return popup.classList.contains('popup_type_new-card')}).querySelector('.popup__form'); //Находим форму добавления карточки
let nameInput = Array.from(popups).find(function (popup) {return popup.classList.contains('popup_type_edit')}).querySelector('.popup__form-item_value_name'); //находим поле формы Имя
let jobInput = Array.from(popups).find(function (popup) {return popup.classList.contains('popup_type_edit')}).querySelector('.popup__form-item_value_job'); //Находим поле формы Работа
let profileName = document.querySelector('.profile__name'); //Выбираем имя профиля
let profileJob = document.querySelector('.profile__job'); //Выбираем название работы профиля
const closePopupButtons = document.querySelectorAll('.popup__close-button'); // Выбираем все кнопки закрытия попапа
const itemTemplate = document.querySelector('.cards__tamplate').content; //Выбираем шаблон карточки
let picNameInput = document.querySelector('.popup__form-item_value_pic-name'); //Находим инпут названия картинки
let linkInput = document.querySelector('.popup__form-item_value_link'); //Находим инпут ссылки на картинку
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


function renderCards() {  //Функция рендера карточек
  cards.forEach(renderCard);
}

function renderCard(card) {  //Функция рендера отдельной карточки
  const htmlElement = itemTemplate.cloneNode(true); //Клонируем шаблон
  htmlElement.querySelector('.cards__image-caption').innerText = card.name; //Присваиваем имя карточки
  htmlElement.querySelector('.cards__image').setAttribute('src', card.link); //Присваиваем ссылку на карточку
  htmlElement.querySelector('.cards__image').setAttribute('alt', card.alt); //Присваиваем описание карточки
  htmlElement.querySelector('.cards__remove-button').addEventListener('click', deleteCard); //Выбираем кнопку удалить карточку и сразу вешаем слушатель
  htmlElement.querySelector('.cards__like-button').addEventListener('click', likeCard); //Выбираем кнопку лайк и сразу вешаем слушатель
  htmlElement.querySelector('.cards__image').addEventListener('click', openImagePopup); //Выбираем картинку и сразу вешаем слушатель
  cardsList.prepend(htmlElement); //Добавляем карточку
}

function openEditPopup () { //Функция открытия попапа редактирования профиля
  if (!Array.from(popups).find(function (popup) {return popup.classList.contains('popup_opened')})) {  //Заполняем поля формы редактирования профиля имеющимися значениями
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
  Array.from(popups).find(function (popup) {return popup.classList.contains('popup_type_edit')}).classList.add('popup_opened'); //Открываем попап редактирования профиля
}

function formSubmitProfileEdit (evt) { //Функция сохранения профиля
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

function openAddCardPopup () { //Функция открытия попапа добавления карточек
  Array.from(popups).find(function (popup) {return popup.classList.contains('popup_type_new-card')}).classList.add('popup_opened'); //Открываем попап добавления карточек
}

function formSubmitAddCard (evt) {  //Функция сохранения карточки
  evt.preventDefault();
  const card = {
      name: picNameInput.value,
      link: linkInput.value,
      alt: '' //В будушем можно внести в форму добавления карточки поле "Опишите фото" и использовать значение для альта. В задании такого нет - не стал делать.
    }
  closePopup();
  renderCard(card);
}

function deleteCard(evt) {  //Функция удаления карточки
  evt.target.closest('.cards__item').remove();
}

function likeCard(event) {  //Функция лайка карточки
  event.target.classList.toggle('cards__like-button_active');
}

function openImagePopup(evt) { //Открываем попап с картинкой
  document.querySelector('.popup__image').setAttribute('src', evt.target.getAttribute('src'));
  document.querySelector('.popup__caption').textContent = evt.target.nextElementSibling.firstElementChild.textContent;
  Array.from(popups).find(function (popup) {return popup.classList.contains('popup_type_image')}).classList.add('popup_opened'); //Находим попап с картинкой
}

function closePopup () { //Закрываем попап
  Array.from(popups).find(function (popup) {return popup.classList.contains('popup_opened')}).classList.remove('popup_opened'); //Убираем модификатор
}


editPopupButton.addEventListener('click', openEditPopup); //Вешаем слушатель на кнопку Редактировать профиль
closePopupButtons.forEach((button) => {button.addEventListener('click', closePopup)}); //Вешаем слушатель на кнопки закрытия попапа
profilePopupForm.addEventListener('submit', formSubmitProfileEdit); //на кнопку сохранить профиль вешаем слушатель
addCardPopupButton.addEventListener('click', openAddCardPopup); //Вешаем слушатель на кнопку добавления карточек
saveCardForm.addEventListener('submit', formSubmitAddCard); //Вешаем слушатель на кнопку сохранить карточку


renderCards(); //Рендер карточек
