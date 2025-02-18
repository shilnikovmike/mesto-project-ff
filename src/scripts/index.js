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
const cardPopup = document.querySelector('.popup_type_new-card');
const profilePopup = document.querySelector('.popup_type_edit');
const profileForm = document.forms['edit-profile'];
const cardForm = document.forms['new-place'];
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;
const cardFormName = cardForm.elements['place-name'];
const cardFormLink = cardForm.elements['link'];
const profileFormTitle = document.querySelector('.profile__title');
const profileFormDescr = document.querySelector('.profile__description');

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

function fillingProfileForm() {
  nameInput.value = profileFormTitle.textContent;
  jobInput.value = profileFormDescr.textContent;
}

function profileFormSubmit(evt) {
  evt.preventDefault();
  profileFormTitle.textContent = nameInput.value;
  profileFormDescr.textContent = jobInput.value;
  closeModal(profilePopup);
}

function addingNewCardByUser(evt, item) {
  evt.preventDefault();
  item = {
    name: cardFormName.value,
    link: cardFormLink.value
  };
  const userNewCard = addCard(item, removeCard, likeCard, openCardImagePopup);
  cardContainer.prepend(userNewCard);
  closeModal(cardPopup);
  cardForm.reset();
}

editButton.addEventListener('click', () => {
  openModal(profilePopup);
  fillingProfileForm();
});
addButton.addEventListener('click', () => openModal(cardPopup));
cardForm.addEventListener('submit', addingNewCardByUser);
profileForm.addEventListener('submit', profileFormSubmit);
