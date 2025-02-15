import '../pages/index.css';
import initialCards from './cards.js';
import {addCard, removeCard, likeCard} from './card.js';
import {openModal, closeModal} from './modal.js';

const cardContainer = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const popupImage = document.querySelector('.popup_type_image');
const popupCardImage = document.querySelector('.popup__image');
const popupCardImageTitle = document.querySelector('.popup__caption');
const addCardPopup = document.querySelector('.popup_type_new-card');
const editProfilePopup = document.querySelector('.popup_type_edit');
const editProfileForm = document.forms['edit-profile'];
const addCardForm = document.forms['new-place'];
const nameInput = editProfileForm.elements.name;
const jobInput = editProfileForm.elements.description;
const cardFormName = addCardForm.elements['place-name'];
const cardFormLink = addCardForm.elements['link'];
const editProfileFormTitle = document.querySelector('.profile__title');
const editProfileFormDescr = document.querySelector('.profile__description');
const closeFormButton = document.querySelector('.popup__close');

function renderCard(cardItem, removeCard, likeCard, openCardImagePopup) {
  const newCard = addCard(cardItem, removeCard, likeCard, openCardImagePopup);
  cardContainer.append(newCard);
}

initialCards.forEach((cardItem) => {
  renderCard(cardItem, removeCard, likeCard, openCardImagePopup);
});

function openCardImagePopup(cardImage, cardTitle) {
  popupCardImage.src = cardImage.src;
  popupCardImage.alt = cardImage.alt;
  popupCardImageTitle.textContent = cardTitle.textContent;
  openModal(popupImage);
}

function fillingEditProfileForm() {
  nameInput.value = editProfileFormTitle.textContent;
  jobInput.value = editProfileFormDescr.textContent;
  closeFormButton.addEventListener('click', () => {
    fillingEditProfileForm();
  })
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  editProfileFormTitle.textContent = nameInput.value;
  editProfileFormDescr.textContent = jobInput.value;
  closeModal(editProfilePopup);
}

function addingNewCardByUser(evt, item) {
  evt.preventDefault();
  item = {
    name: cardFormName.value,
    link: cardFormLink.value
  };
  const userNewCard = addCard(item, removeCard, likeCard, openCardImagePopup);
  cardContainer.prepend(userNewCard);
  closeModal(addCardPopup);
  addCardForm.reset();
}

addButton.addEventListener('click', () => openModal(addCardPopup));
addCardForm.addEventListener('submit', addingNewCardByUser);
editButton.addEventListener('click', () => openModal(editProfilePopup), fillingEditProfileForm());
editProfileForm.addEventListener('submit', handleFormSubmit);
