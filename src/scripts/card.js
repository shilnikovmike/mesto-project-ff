import {removeCardApi, likeCardApi, dislikeCardApi} from './api.js';
export {addCard, deleteCard, putLikeOnCard};

const cardTemplate = document.querySelector('#card-template').content;

function addCard(cardItem, userId, removeCard, likeCard, openCardImage) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const removeButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  const cardId = cardItem._id;
  const ownerId = cardItem.owner._id;
  
  cardImage.src = cardItem.link;
  cardImage.alt = cardItem.name;
  cardTitle.textContent = cardItem.name;
  likeCounter.textContent = cardItem.likes.length;

  if (cardItem.likes.some(like => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (userId !== ownerId) {
    removeButton.style.display = 'none';
  } else {
    removeButton.addEventListener('click', () => {
      removeCard(cardElement, cardId);
    })
  }

  likeButton.addEventListener('click', () => {
    likeCard(likeButton, cardId, likeCounter);
  })

  cardImage.addEventListener('click', () => {
    openCardImage(cardItem.link, cardItem.name);
  })

  return cardElement;
}

function deleteCard(cardElement, cardId) {
  removeCardApi(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch(err => {
      console.log('При удалении карточки возникла ошибка:', err);
    })
}

function putLikeOnCard(likeButton, cardId, likeCounter) {
  const checkLike = likeButton.classList.contains('card__like-button_is-active');
  
  if (!checkLike) {
    likeCardApi(cardId)
      .then(cardItem => {
        likeButton.classList.add('card__like-button_is-active');
        likeCounter.textContent = cardItem.likes.length;
      })
      .catch(err => {
        console.log('При попытке лайкнуть карточку возникла ошибка:', err);
      })
  } else {
    dislikeCardApi(cardId)
      .then(cardItem => {
        likeButton.classList.remove('card__like-button_is-active');
        likeCounter.textContent = cardItem.likes.length;
      })
      .catch(err => {
        console.log('При попытке дизлайкнуть карточку возникла ошибка:', err);
      })
  }
}