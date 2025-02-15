export {openModal, closeModal};

function openModal(el) {
  el.classList.add('popup_is-opened');
  document.addEventListener('click', closePopupOnButton);
  document.addEventListener('keydown', closePopupOnEscKey);
  window.addEventListener('click', closePopupOnOverlay);
}

function closeModal(el) {
  el.classList.remove('popup_is-opened');
  document.removeEventListener('click', closePopupOnButton);
  document.removeEventListener('keydown', closePopupOnEscKey);
  window.removeEventListener('click', closePopupOnOverlay);
}

function closePopupOnButton(evt) {
  if (evt.target.classList.contains('popup__close')) {
    const modalPopup = evt.target.closest('.popup');
    closeModal(modalPopup);
  }
}

function closePopupOnEscKey (evt) {
  if (evt.key === 'Escape') {
    const openedModalPopup = document.querySelector('.popup_is-opened');
    closeModal(openedModalPopup);
  }
}

function closePopupOnOverlay (evt) {
  if (evt.target.classList.contains('popup')) {
    closeModal(evt.target);
  }
}