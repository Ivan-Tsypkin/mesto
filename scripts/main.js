let openPopap = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopup = popup.querySelector('.popup__close-button');

openPopap.addEventListener('click', togglePopup);
closePopup.addEventListener('click', togglePopup);
popup.addEventListener('click', togglePopup);

function togglePopup(event) {
  if (event.target === event.currentTarget) {
    popup.classList.toggle('popup_opened')
  }
}

let formElement = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__form-item_value_name');
let jobInput = popup.querySelector('.popup__form-item_value_job');

function formSubmitHandler (evt) {
    evt.preventDefault();

    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;

    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__job');

    profileName.textContent = nameInputValue;
    profileJob.textContent = jobInputValue;
    popup.classList.toggle('popup_opened')
}

formElement.addEventListener('submit', formSubmitHandler);

const like = document.querySelectorAll('.main__like-button');

function toggleLike(event) {
  if (event.target === event.currentTarget) {
    event.target.classList.toggle('main__like-button_active')
  }
}

for (let i = 0; i <= (like.length - 1); i = i + 1 ) {
like[i].addEventListener('click', toggleLike);
}


