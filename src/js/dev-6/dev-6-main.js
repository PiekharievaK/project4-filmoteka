import { devInfo } from "./developers-info";
import devCards from '../../templates/modal-developer-card.hbs';

const footerModalOpen = document.querySelector('.copyright_modal-open-button');
const teamModal = document.querySelector('.modal-project-developers');
const modalDevList = document.querySelector('.modal-project-developers__list');
const devModalCloseBtn = document.querySelector('.dev-modal-close-button');
const mybutton = document.querySelector('.btn-To-Top');


footerModalOpen.addEventListener('click', footerModalAction);



function footerModalAction() {
  // Показывает и прячет модальное окно
  teamModal.classList.toggle('is-open');
  document.body.classList.toggle('is-overflow');
  const modalIsOpen = teamModal.classList.contains('is-open');
  
  // Рендер карточек только если модака открывается
  if (modalIsOpen) {renderModalDev(devInfo)};
  const modalMoreInfoBtn = document.querySelectorAll('.dev-card-btn');

   //  Вешает и снимает слушатель на кнопкe закрытия модального окна
  toggleButtons(modalIsOpen, devModalCloseBtn, 'click', footerModalAction );
 
   //  Вешает и снимает слушатель на кнопках у карточек
  toggleButtonsforAll(modalIsOpen, modalMoreInfoBtn, 'click',  onCardBtnClick);
      
   // Убирает унопку UP, при открытой модалке
      if (modalIsOpen) {
        mybutton.style.display = 'none';
      } else {
        mybutton.style.display = 'block';
  };

      // Обнуляет открытые карточки послее закрытия модального окна.
      if (teamModal.querySelector('card-open-details')) {
  teamModal.querySelectorAll('card-open-details').classList ='developer-card';
  teamModal.querySelectorAll('developer-card__comment is-open').classList.remove('is-open');
  }
};


function onCardBtnClick(evt) {
  const CardMoreBtn = evt.currentTarget.parentNode;

  evt.currentTarget.classList.toggle('button-active');
  CardMoreBtn.querySelector('.developer-card__comment').classList.toggle('is-open');
  
  
  if (CardMoreBtn.parentNode.classList == 'developer-card') {
    CardMoreBtn.parentNode.classList = 'card-open-details';
  
    CardMoreBtn.parentNode.scrollIntoView()
  
    return
  }
  if (CardMoreBtn.parentNode.classList == 'card-open-details') {
    
    CardMoreBtn.parentNode.classList = 'developer-card';
    return
  }
 };
 
 function renderModalDev(dataArray) { 
   const cards = devCards(dataArray);
  modalDevList.innerHTML = cards;
};
 
 function toggleButtons(condition, target, event, foo) {    
   if (condition === true) {
      target.addEventListener(event, foo);
   } else {
      target.removeEventListener(event, foo); 
 }
};

function toggleButtonsforAll(condition, target, evt, foo) {    
   if (condition === true) {
      target.forEach( elem => elem.addEventListener(evt, foo))
   } else {
      target.forEach (elem =>elem.removeEventListener(evt, foo)); 
 }
};
