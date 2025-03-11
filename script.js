const editPopup = document.querySelector('.nav__edit_btn');
const popup = document.getElementById('popup-edit-profile');
const closeButton = document.getElementById('closePopup');
const saveButton=document.getElementById('saveBtn');
const likeBtns=document.querySelectorAll('.card__btn_like');

// Открытие поп-апа
const createPopup = () => {
  popup.classList.add('popup_opened');
document.body.classList.add('body_opened');
};

// Закрытие поп-апа
closeButton.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
  document.body.classList.remove('body_opened');
});

// Открытие поп-апа при клике на кнопку редактирования
editPopup.addEventListener('click', createPopup);


saveButton.addEventListener('click', ()=>{
  const name=document.getElementById('name').value;
  const description= document.getElementById('description').value;

  document.getElementById('profileName').textContent = name;
  document.getElementById('profileDescription').textContent=description;

  popup.classList.remove('popup_opened');
  document.body.classList.remove('body_opened');
})
likeBtns.forEach( button => {
  button.addEventListener('click',(event)=>{
    const clickedButton= event.target;
    clickedButton.classList.toogle('liked');


  })
})