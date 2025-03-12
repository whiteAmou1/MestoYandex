const editPopup = document.querySelector('.nav__edit_btn');
const popup = document.getElementById('popup-edit-profile');
const closeButton = document.getElementById('closePopup');
const saveButton=document.getElementById('saveBtn');

// Открытие поп-апа
const createPopup = () => {
  popup.classList.add('popup_opened');
document.body.classList.add('body_opened');
};

if(editPopup) editPopup.addEventListener('click', createPopup);

// Закрытие поп-апа
if(closeButton) closeButton.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
  document.body.classList.remove('body_opened');
});




if(saveButton) saveButton.addEventListener('click', ()=>{
  const name=document.getElementById('name').value;
  const description= document.getElementById('description').value;

  document.getElementById('profileName').textContent = name;
  document.getElementById('profileDescription').textContent=description;

  popup.classList.remove('popup_opened');
  document.body.classList.remove('body_opened');
});

const likeBtns=document.querySelectorAll('.card__btn_like');

likeBtns.forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('liked');

    const img=button.querySelector('.like__card_img');
    if(img){
      img.src=button.classList.contains('liked')
      ? './logos/Like_black.svg'
      : './logos/Like.svg'
    }
  });
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
