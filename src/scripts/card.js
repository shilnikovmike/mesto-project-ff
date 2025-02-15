export {addCard, removeCard, likeCard};

const cardTemplate = document.querySelector('#card-template').content;

function addCard(cardItem, removeCard, likeCard, openCardImagePopup) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const removeButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  cardImage.src = cardItem.link;
  cardImage.alt = cardItem.name;
  cardTitle.textContent = cardItem.name;
  removeButton.addEventListener('click', () => {
    removeCard(cardElement);
  });
  likeButton.addEventListener('click', () => {
    likeCard(likeButton);
  });
  cardImage.addEventListener('click', () => {
    openCardImagePopup(cardImage, cardTitle);
  });
  return cardElement;
}

function removeCard(cardElement) {
  cardElement.remove();
}

function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}