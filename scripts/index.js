const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');

function addCard(cardItem, removeCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const removeButton = cardElement.querySelector('.card__delete-button');
  cardImage.src = cardItem.link;
  cardImage.alt = cardItem.name;
  cardTitle.textContent = cardItem.name;
  removeButton.addEventListener('click', () => {
    removeCard(cardElement);
  });
  return cardElement;
}

function renderCard(cardItem, removeCard) {
  const newCard = addCard(cardItem, removeCard);
  cardContainer.append(newCard);
}

initialCards.forEach((cardItem) => {
  renderCard(cardItem, removeCard);
});

function removeCard(cardElement) {
  cardElement.remove();
}