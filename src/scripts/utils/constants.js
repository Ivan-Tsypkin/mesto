import elbrus from '../../images/Elbrus.png';
import komi from '../../images/Komi.png';
import moscow from '../../images/Moscow.png';
import peterburg from '../../images/Saint-Petersburg.png';
import sochi from '../../images/Sochi.png';
import vladivostok from '../../images/Vladivostok.png';


const editPopupButton = document.querySelector('.profile__edit-button'); //Выбираем кнопку Редактировать профиль
const addCardPopupButton = document.querySelector('.profile__add-button'); //Выбираем кнопку Добавить карточку
const nameInput = document.querySelector('.popup__form-item_value_name'); //находим поле формы Имя
const jobInput = document.querySelector('.popup__form-item_value_job'); //Находим поле формы Работа

const cards = [  //Массив стандартных карточек
  { name: 'Эльбрус',
    link: elbrus,
    alt: 'Гора Эльбрус, Солнце скрылось за вершину'},
  { name: 'Коми',
    link: komi,
    alt: 'Коми, река, лес, Зима'},
  { name: 'Москва',
    link: moscow,
    alt: 'Москва, центр города, день, небоскрёбы'},
  { name: 'Санкт-Петербург',
    link: peterburg,
    alt: 'Санкт-Петербург, вечер, разведённый мост'},
  { name: 'Сочи',
    link: sochi,
    alt: 'Сочи, побережье, огни ночного города с высоты птичьего полёта'},
  { name: 'Владивосток',
    link: vladivostok,
    alt: 'Владивосток, день, люди смотрят на Золотой мост'},
]

const config = {
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  invalidInputClass: 'popup__form-item_state_invalid'
}

export {editPopupButton, addCardPopupButton, nameInput, jobInput, cards, config}
