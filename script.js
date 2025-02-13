const editPopup = document.querySelector('.nav__edit_btn');
const popup = document.getElementById('popup-edit-profile');
const closeButton = document.getElementById('closePopup');

// Открытие поп-апа
const createPopup = () => {
  popup.classList.add('popup_opened');
};

// Закрытие поп-апа
closeButton.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
});

// Открытие поп-апа при клике на кнопку редактирования
editPopup.addEventListener('click', createPopup);
