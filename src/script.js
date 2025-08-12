import './main.css';

const initialCards = [
  { name: 'Архыз', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg' },
  { name: 'Челябинская область', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg' },
  { name: 'Иваново', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg' },
  { name: 'Камчатка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg' },
  { name: 'Холмогорский район', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg' },
  { name: 'Байкал', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg' }
];

import likeIcon from './logos/Like.svg';
import likeIconBlack from './logos/Like_black.svg';
import trashIcon from './logos/Trash.svg';

const editPopup = document.querySelector('.nav__edit_btn');
const popup = document.getElementById('popup-edit-profile');
const closeButton = document.getElementById('closePopup');
const saveButton = document.getElementById('saveBtn');
const cardGrid = document.querySelector('.card__grid');

// Валидация попапа редактирования профиля
const form = document.getElementById('popup-edit-profile');
const nameInput = form.querySelector('#name');
const nameError = form.querySelector('#name-error');
const descriptionError = form.querySelector('#description-error');

// Открытие попапа редактирования профиля
const createPopup = () => {
  popup.classList.add('popup_opened');
  // document.body.classList.add('body_opened');
};

if (editPopup) {
  editPopup.addEventListener('click', (event) => {
    event.preventDefault();
    createPopup();
  });
}

// Закрытие попапа
if (closeButton) closeButton.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
  // document.body.classList.remove('body_opened');
});

if (saveButton) saveButton.addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;

  document.getElementById('profileName').textContent = name;
  document.getElementById('profileDescription').textContent = description;

  popup.classList.remove('popup_opened');
  document.body.classList.remove('body_opened');
});

// Обработчик лайка и удаления карточек — единый
if (cardGrid) {
  cardGrid.addEventListener('click', function (event) {
    const likeBtn = event.target.closest('.card__btn_like');
    if (likeBtn) {
      likeBtn.classList.toggle('liked');
      const img = likeBtn.querySelector('.like__card_img');
      if (img) {
        img.src = likeBtn.classList.contains('liked') ? likeIconBlack : likeIcon;
      }
    }
    const deleteBtn = event.target.closest('.card__btn_delete');
    if (deleteBtn) {
      const card = deleteBtn.closest('.card');
      if (card) card.remove();
    }

    if (event.target.matches('.card__img')) {
      const card = event.target.closest('.card');
      const cardTitle = card.querySelector('.card__title').textContent;
      openImagePopup(event.target.src, cardTitle);
    }
  });
}

// Отрисовка начальных карточек
function renderInitialCards() {
  if (!cardGrid) return;
  cardGrid.innerHTML = '';
  initialCards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');

    cardElement.innerHTML = `
      <button class="card__btn_delete">
        <img class="delete__icon" src="${trashIcon}" alt="Delete">
      </button>
      <img class="card__img" src="${card.link}" alt="${card.name}">
      <div class="card__container">
        <h4 class="card__title">${card.name}</h4>
        <button class="card__btn_like">
          <img class="like__card_img" src="${likeIcon}">
        </button>
      </div>
    `;
    cardGrid.appendChild(cardElement);
  });
}
renderInitialCards();


// Попап для увеличения изображения
const imagePopup = document.createElement('div');
imagePopup.classList.add('popup__zoom');
imagePopup.innerHTML = `
  <div class="popup__zoom_container">
    <span class="popup__zoom_close">&times;</span>
    <img class="popup__img" src="" alt="Photo">
    <p class="popup__zoom_title"></p>
  </div>
`;
document.body.appendChild(imagePopup);

const popupImg = imagePopup.querySelector('.popup__img');
const popupTitle = imagePopup.querySelector('.popup__zoom_title');
const popupClose = imagePopup.querySelector('.popup__zoom_close');

function openImagePopup(imageSrc, title) {
  popupImg.src = imageSrc;
  popupTitle.textContent = title;
  popupImg.onload = () => {
    imagePopup.classList.add('popup__zoom_opened');
    document.body.classList.add('body__zoom_opened');
  };
}

function closeImagePopup() {
  imagePopup.classList.remove('popup__zoom_opened');
  document.body.classList.remove('body__zoom_opened');
}

popupClose.addEventListener('click', closeImagePopup);
imagePopup.addEventListener('click', (event) => {
  if (!event.target.closest('.popup__zoom_container')) {
    closeImagePopup();
  }
});


// Работа с добавлением новых карточек и валидацией — внутри DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const addPopupOpen = document.getElementById('nav__add_plus');
  const popupAdd = document.querySelector('.popup__add');
  const popupAddClose = document.getElementById('popup__add_close');
  const addCardForm = document.querySelector('.popup__add_form'); // Форма
  const cardNameInput = document.getElementById('cardName');
  const cardImageInput = document.getElementById('cardImage');
  const addButton = addCardForm.querySelector('.popup__add__button');

  if (addPopupOpen) {
    addPopupOpen.addEventListener('click', openAddPopup);
  }
  if (popupAddClose) {
    popupAddClose.addEventListener('click', closeAddPopup);
  }

  if (addCardForm) {
    addCardForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = cardNameInput.value.trim();
      const link = cardImageInput.value.trim();

      if (!name || !link) return; // Простая проверка

      addCardToArray(name, link);
      renderCards();
      closeAddPopup();
      addCardForm.reset();
    });
  }

  function openAddPopup() {
    const inputs = Array.from(addCardForm.querySelectorAll('.popup__add_input'));
    inputs.forEach(input => hideInputError(addCardForm, input, {
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__error_visible'
    }));
    addButton.classList.add('popup__button_disabled');
    addButton.disabled = true;

    popupAdd.style.display = "flex";
    addCardForm.reset();
  }

  function closeAddPopup() {
    popupAdd.style.display = 'none';
  }

  function addCardToArray(name, link) {
    initialCards.push({ name, link });
  }

  function renderCards() {
    if (!cardGrid) return;
    cardGrid.innerHTML = '';
    initialCards.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');

      cardElement.innerHTML = `
        <button class="card__btn_delete">
          <img class="delete__icon" src="${trashIcon}" alt="Delete">
        </button>
        <img class="card__img" src="${card.link}" alt="${card.name}">
        <div class="card__container">
          <h4 class="card__title">${card.name}</h4>
          <button class="card__btn_like">
            <img class="like__card_img" src="${likeIcon}">
          </button>
        </div>
      `;

      cardGrid.appendChild(cardElement);
    });
  }

});

// Функции валидации (если нужны)
function showInputError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}

function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
}

function getErrorMessage(inputElement) {
  if (inputElement.validity.valueMissing) {
    return 'Вы пропустили это поле.';
  }
  if (inputElement.validity.typeMismatch && inputElement.type === 'url') {
    return 'Введите адрес сайта';
  }
  return inputElement.validationMessage;
}

function checkInputValidity(formElement, inputElement, settings) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, getErrorMessage(inputElement), settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
}

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  });
}

enableValidation({
  formSelector: '.popup__add_form',
  inputSelector: '.popup__add_input',
  submitButtonSelector: '.popup__add__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
