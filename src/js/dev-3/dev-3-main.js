import movieModalTpl from '../../templates/film-details.hbs';
import { renderMovies, clearFilmsGallery, moviesLibraryMarkup } from '../dev-5/dev-5-main.js';
import ApiService from '../dev-1/api.js';
import * as basicLightbox from 'basiclightbox';
const apiService = new ApiService();
import {
  removeQueueId,
  removeWatcheId,
  addQueueIdFilm,
  addWatcheIdFilm,
  textModalBtn,
  inArrayKey,
  test,
  remove,
  save,
  get,
} from '../dev-4/dev-4-main.js';

const openModal = document.querySelector('[data-film-modal-open]');
const closeModal = document.querySelector('[data-film-modal-close]');
const modalFilm = document.querySelector('[data-film-modal]');
const backdrop = document.querySelector('.backdrop__film');
const boxFilm = document.querySelector('.modal__film-detalies');

openModal.addEventListener('click', onOpenModalFilm);
closeModal.addEventListener('click', onCloseModalFilm);
window.addEventListener('keydown', closeModalByEsc);
backdrop.addEventListener('click', closeModalByClick);
modalFilm.addEventListener('click', closeModalByClick);

function onOpenModalFilm(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const filmId = event.target.parentNode.id;
  save('filmId', filmId);

  const filmItem = get('filmInfo');
  const watchList = get('watched');
  const queueList = get('queue');
  //   console.log(3);
  // }

  const newList =
    filmItem.find(elem => elem.id === Number(filmId)) ||
    watchList.find(elem => elem.id === Number(filmId)) ||
    queueList.find(elem => elem.id === Number(filmId));

  // const newList = filmItem.find(elem => elem.id === Number(filmId));

  save('newList', newList);
  renderModal(newList);

  document.querySelector('body').classList.add('is-overflow');
  backdrop.classList.remove('is-hidden');

  window.addEventListener('keydown', closeModalByEsc);
  backdrop.addEventListener('click', closeModalByClick);

  const btnWatch = document.querySelector('.modal-details_watched-button');
  const btnQueue = document.querySelector('.modal-details_queue-button');
  const btnWatchTrailer = document.querySelector('.btn_trailer');

  btnWatch.addEventListener('click', addWatcheIdFilm);
  btnQueue.addEventListener('click', addQueueIdFilm);
  btnWatchTrailer.addEventListener('click', onTrailerBtnClick);

  apiService.getTrailerKey(Number(filmId)).then(key => {
    let trailerKey = key;
    save('trailer', trailerKey);
  });

  textModalBtn(Number(filmId));
}

function renderModal(data) {
  const markup = movieModalTpl(data);
  boxFilm.innerHTML = markup;
}

function onCloseModalFilm(event) {
  document.querySelector('body').classList.remove('is-overflow');
  backdrop.classList.add('is-hidden');
}

function closeModalByEsc(e) {
  if (e.code === 'Escape') {
    onCloseModalFilm();

    window.removeEventListener('keydown', closeModalByEsc);
  }
}

function closeModalByClick(e) {
  if (e.target === backdrop) {
    onCloseModalFilm();
    backdrop.removeEventListener('click', closeModalByClick);
  }
}
//--------------------------------------------------------

// Функция открытия трейлера
function onTrailerBtnClick(e) {
  let trailerKey = get('trailer');
  const trailer = basicLightbox
    .create(
      `<iframe width="300" height="300" src='https://www.youtube.com/embed/${trailerKey}'frameborder="0" allowfullscreen class="trailer"></iframe>`,
    )
    .show();
}

export { renderModal, onOpenModalFilm };
