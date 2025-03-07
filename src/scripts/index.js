import '../pages/index.css';
import {addCard, deleteCard, putLikeOnCard} from './card.js';
import {openModal, closeModal} from './modal.js';
import {clearValidation, enableValidation} from './validation.js';
import {getProfileApi, getCardsApi, editProfileApi, addNewCardApi, editProfileAvatarApi} from './api.js';

const cardContainer = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const popupImage = document.querySelector('.popup_type_image');
const popupCardImage = document.querySelector('.popup__image');
const popupCardImageTitle = document.querySelector('.popup__caption');
const cardPopup = document.querySelector('.popup_type_new-card');
const profilePopup = document.querySelector('.popup_type_edit');
const profileForm = document.forms['edit-profile'];
const cardForm = document.forms['new-place'];
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;
const cardFormName = cardForm.elements['place-name'];
const cardFormLink = cardForm.elements['place-link'];
const profileFormTitle = document.querySelector('.profile__title');
const profileFormDescr = document.querySelector('.profile__description');
const profileFormImage = document.querySelector('.profile__image');
const avatarEditButton = document.querySelector('.profile__image_edit-button');
const avatarPopup = document.querySelector('.popup_type_edit-avatar');
const avatarForm = document.forms['edit-profile-avatar'];
const avatarInput = avatarForm.elements['avatar-link'];
let myId = '';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

enableValidation(validationConfig);

function openCardImagePopup(cardImageSrc, cardImageTitle) {
  popupCardImage.src = cardImageSrc;
  popupCardImage.alt = cardImageSrc;
  popupCardImageTitle.textContent = cardImageTitle;
  openModal(popupImage);
}

addButton.addEventListener('click', () => {
  openModal(cardPopup);
  clearValidation(cardForm, validationConfig);
})

function fillProfileForm() {
  nameInput.value = profileFormTitle.textContent;
  jobInput.value = profileFormDescr.textContent;
}

editButton.addEventListener('click', () => {
  fillProfileForm();
  openModal(profilePopup);
  clearValidation(profileForm, validationConfig);
})

avatarEditButton.addEventListener('click', () => {
  openModal(avatarPopup);
  clearValidation(profileForm, validationConfig);
})

profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const saveButton = profileForm.querySelector('.popup__button');
  const userInfo = {
    name: nameInput.value,
    about: jobInput.value
  };
  saveButton.textContent = 'Сохранение...';
  
  editProfileApi(userInfo.name, userInfo.about)
    .then(newProfileInfo => {
      profileFormTitle.textContent = newProfileInfo.name;
      profileFormDescr.textContent = newProfileInfo.about;
      closeModal(profilePopup);
    })
    .catch(err => {
      console.log('Ошибка при изменение информации профиля:', err);
    })
    .finally(() => {
      saveButton.textContent = 'Сохранить';
    })
})

cardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const saveButton = cardForm.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';

  addNewCardApi(cardFormName.value, cardFormLink.value)
    .then(newCardInfo => {
      const newCard = addCard(newCardInfo, myId, deleteCard, putLikeOnCard, openCardImagePopup);

      cardContainer.prepend(newCard);
      closeModal(cardPopup);
      cardForm.reset();
    })
    .catch(err => {
      console.log('Ошибка при добавлении новой карточки:', err);
    })
    .finally(() => {
      saveButton.textContent = 'Сохранить';
    })
})

avatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const saveButton = avatarForm.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';

  editProfileAvatarApi(avatarInput.value)
    .then(userInfo => {
      profileFormImage.style.backgroundImage = `url(${userInfo.avatar})`;
      closeModal(avatarPopup);
      avatarForm.reset();
    })
    .catch(err => {
      console.log('Ошибка при изменение аватарки:', err);
    })
    .finally(() => {
      saveButton.textContent = 'Сохранить';
    })
})

Promise.all([getProfileApi(), getCardsApi()])
  .then(([userInfo, cards]) => {
    profileFormTitle.textContent = userInfo.name;
    profileFormDescr.textContent = userInfo.about;
    profileFormImage.style.backgroundImage = `url(${userInfo.avatar})`;
    myId = userInfo._id;

    cards.forEach(card => {
      const newCard = addCard(card, myId, deleteCard, putLikeOnCard, openCardImagePopup);
      cardContainer.append(newCard);
    })
  })