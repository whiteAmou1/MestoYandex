
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];



const editPopup = document.querySelector('.nav__edit_btn');
const popup = document.getElementById('popup-edit-profile');
const closeButton = document.getElementById('closePopup');
const saveButton = document.getElementById('saveBtn');
const cardGrid = document.querySelector('.card__grid');

// Открытие поп-апа
const createPopup = () => {
  popup.classList.add('popup_opened');
  // document.body.classList.add('body_opened');
};

if (editPopup) editPopup.addEventListener('click', createPopup);

// Закрытие поп-апа
if (closeButton) closeButton.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
  document.body.classList.remove('body_opened');
});

if (saveButton) saveButton.addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;

  document.getElementById('profileName').textContent = name;
  document.getElementById('profileDescription').textContent = description;

  popup.classList.remove('popup_opened');
  document.body.classList.remove('body_opened');
});

// Логика кнопки лайка
const likeBtns = document.querySelectorAll('.card__btn_like');
cardGrid.addEventListener('click', function (event) {
  const likeBtn = event.target.closest('.card__btn_like');
  if (likeBtn) {
    likeBtn.classList.toggle('liked');
    const img = likeBtn.querySelector('.like__card_img');
    if (img) {
      img.src = likeBtn.classList.contains('liked') ? './logos/Like_black.svg'
        : './logos/Like.svg';
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".card__btn_delete").forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".card");
      if (card) {
        card.remove(); // Удаляем карточку из DOM
      }
    });
  });
});

initialCards.forEach(card => {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card');

  cardElement.innerHTML = `<button class="card__btn_delete">
    <img class="delete__icon" src="./logos/Trash.svg" alt="Delete">
  </button>
  <img class="card__img" src="${card.link}" alt="${card.name}">
  <div class="card__container">
    <h4 class="card__title">${card.name}</h4>
    <button class="card__btn_like">
      <img class="like__card_img" src='./logos/Like.svg'>
    </button>
  </div>
  `;
  cardGrid.appendChild(cardElement);
});









// Создаем попап
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

// Получаем элементы попапа
const popupImg = imagePopup.querySelector('.popup__img');
const popupTitle = imagePopup.querySelector('.popup__zoom_title');
const popupClose = imagePopup.querySelector('.popup__zoom_close');

// Функция открытия попапа
function openImagePopup(imageSrc, title) {
  popupImg.src = imageSrc;
  popupImg.onload = () => {// он лоуда тут не было 
    imagePopup.classList.add('popup__zoom_opened');
    document.body.classList.add('body__zoom_opened');  //  не вижу смысла держать его ради слайда 
  };
  popupTitle.textContent = title;
}

// Функция закрытия попапа
function closeImagePopup() {
  imagePopup.classList.remove('popup__zoom_opened');
  document.body.classList.remove('body__zoom_opened');
}

// Закрытие попапа при клике на крестик
popupClose.addEventListener('click', closeImagePopup);

// Закрытие попапа при клике вне контейнера
imagePopup.addEventListener('click', (event) => {
  if (!event.target.closest('.popup__zoom_container')) {
    closeImagePopup();
  }
});


// Открытие попапа при клике на изображение карточки
  cardGrid.addEventListener('click', function (event) {
    if (event.target.matches('.card__img')) {
      const card = event.target.closest('.card');
    const cardTitle = card.querySelector('.card__title').textContent;
    openImagePopup(event.target.src, cardTitle);
  }
    });









    document.addEventListener('DOMContentLoaded', () => {
      const addPopupOpen = document.getElementById('nav__add_plus');
      const popupAdd = document.querySelector('.popup__add');
      const popupAddClose = document.getElementById('popup__add_close');
      
      // Форма и поля ввода
      const addCardForm = document.querySelector('.popup__add_form'); // Форма
      const cardNameInput = document.getElementById('cardName'); // Поле ввода названия
      const cardImageInput = document.getElementById('cardImage'); // Поле ввода ссылки
      const addButton = document.querySelector('.popup__add__button'); // Кнопка отправки формы
    
      // Обработчики событий
      addPopupOpen.addEventListener('click', openAddPopup);
      popupAddClose.addEventListener('click', closeAddPopup);
    
      // Обработчик для отправки формы
      addButton.addEventListener('click', (event) => {
        console.log('button clicked');
        event.preventDefault(); // Отключаем стандартное поведение кнопки
        console.log('button clicked'); // Проверяем, срабатывает ли обработчик
    
        const name = cardNameInput.value; // Получаем имя из поля ввода
        const link = cardImageInput.value; // Получаем ссылку из поля ввода
    
        // Проверка, что поля заполнены
        if (name && link) {
          addCardToArray(name, link); // Добавляем карточку в массив
          renderCards(); // Рендерим карточки с обновленным массивом
          closeAddPopup(); // Закрываем попап
          addCardForm.reset(); // Сбрасываем форму
        } else {
          alert('Пожалуйста, заполните все поля!'); // Показываем ошибку, если не все поля заполнены
        }
      });
      
      // Функция открытия попапа
      function openAddPopup() {
        popupAdd.style.display = "flex";
      }
    
      // Функция закрытия попапа
      function closeAddPopup() {
        popupAdd.style.display = 'none';
      }
    
      // Функция добавления карточки в массив
      function addCardToArray(name, link) {
        initialCards.push({ name, link });
      }
    
      // Функция рендеринга карточек
      function renderCards() {
        cardGrid.innerHTML = ''; // Очистим старые карточки
        initialCards.forEach(card => {
          const cardElement = document.createElement('div');
          cardElement.classList.add('card');
      
          cardElement.innerHTML = `
            <button class="card__btn_delete">
              <img class="delete__icon" src="./logos/Trash.svg" alt="Delete">
            </button>
            <img class="card__img" src="${card.link}" alt="${card.name}">
            <div class="card__container">
              <h4 class="card__title">${card.name}</h4>
              <button class="card__btn_like">
                <img class="like__card_img" src='./logos/Like.svg'>
              </button>
            </div>
          `;
      
          cardGrid.insertBefore(cardElement,cardGrid.firstChild); // Добавляем карточку в DOM
        });
      }
    });
    
