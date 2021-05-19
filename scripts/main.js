let openPopap = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopup = popup.querySelector('.popup__close-button');
let formElement = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__form-item_value_name');
let jobInput = popup.querySelector('.popup__form-item_value_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

function togglePopup() {
  if (!popup.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
  popup.classList.toggle('popup_opened')
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopup();
}

openPopap.addEventListener('click', togglePopup);
closePopup.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);
