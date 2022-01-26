import { renderMovies, clearFilmsGallery, moviesLibraryMarkup } from '../dev-5/dev-5-main.js';
import { renderModal, onOpenModalFilm } from '../dev-3/dev-3-main.js';
import ApiService from '../dev-1/api.js';

const libraryBtn = document.querySelector('.btn-myLibrary-js');

function textModalBtn(id) {
  const btnWatch = document.querySelector('.modal-details_watched-button');
  const btnQueue = document.querySelector('.modal-details_queue-button');
  if (inArrayKey(id, 'watched')) {
    // console.log('есть такой в watched');

    btnWatch.textContent = 'Add to watched';
    btnWatch.disabled = true;
    function changeText() {
      btnWatch.disabled = false;
      btnWatch.textContent = 'Remove from watched';
      btnWatch.classList.add('active');
    }
    changeText();
  } else {
    // console.log('нет такого в watched');

    btnWatch.textContent = 'Add to watched';
    btnWatch.classList.remove('active');
    btnWatch.disabled = false;
  }

  if (inArrayKey(id, 'queue')) {
    // console.log('есть такой в queue');

    btnQueue.textContent = 'Add to queue';
    btnQueue.disabled = true;
    function changeText() {
      btnQueue.disabled = false;
      btnQueue.textContent = 'Remove from queue';
      btnQueue.classList.add('active');
    }
    changeText();
  } else {
    // console.log('нет такого в queue');

    btnQueue.textContent = 'Add to queue';
    btnQueue.classList.remove('active');
    btnQueue.disabled = false;
  }
}
const watchedBtn = document.querySelector('.btn-watched-js');
const queueBtn = document.querySelector('.btn-queue-js');

function addWatcheIdFilm(event) {
  const btnWatch = document.querySelector('.modal-details_watched-button');

  const filmId = Number(get('filmId'));
  const newList = get('newList');

  if (btnWatch.classList.contains('active')) {
    removeWatcheId(filmId);
  } else {
    let watchList = [];
    watchList = get('watched');
    watchList.push(newList);
    save('watched', watchList);
    textModalBtn(filmId);
    if (watchedBtn.classList.contains('active') && libraryBtn.classList.contains('current-link')) {
      queueBtn.classList.remove('active');
      watchList = get('watched');

      renderMovies(watchList);
    }
  }
}

function addQueueIdFilm() {
  const btnQueue = document.querySelector('.modal-details_queue-button');

  const filmId = Number(get('filmId'));
  const newList = get('newList');
  let queueList = [];
  queueList = get('queue');

  if (btnQueue.classList.contains('active')) {
    removeQueueId(filmId);
  } else {
    let queueList = [];
    queueList = get('queue');
    queueList.push(newList);
    save('queue', queueList);
    textModalBtn(filmId);
    if (queueBtn.classList.contains('active') && libraryBtn.classList.contains('current-link')) {
      watchedBtn.classList.remove('active');
      queueList = get('queue');

      renderMovies(queueList);
    }
  }
  // if (libraryBtn.classList.contains('current-link') && queueBtn.classList.contains('active')) {
  //   queueList = get('queue');

  //   renderMovies(queueList);
  // }
}

function removeWatcheId() {
  const btnWatch = document.querySelector('.modal-details_queue-button');
  const libraryBtn = document.querySelector('.btn-myLibrary-js');

  let watchList = [];
  watchList = get('watched');
  const filmId = Number(get('filmId'));

  if (get('watched')) {
    if (inArrayKey(filmId, 'watched')) {
      const filterNevArr = watchList.filter(el => el.id !== filmId);
      remove('watched');
      save('watched', filterNevArr);

      if (
        watchedBtn.classList.contains('active') &&
        libraryBtn.classList.contains('current-link')
      ) {
        watchList = get('watched');

        if (watchList === null || watchList.length === 0) {
          moviesLibraryMarkup();
        } else {
          renderMovies(watchList);
        }
      }
    }
  }

  textModalBtn(filmId);
}

function removeQueueId() {
  const btnQueue = document.querySelector('.modal-details_watched-button');

  let queueList = [];
  queueList = get('queue');
  const filmId = Number(get('filmId'));

  if (get('queue')) {
    if (inArrayKey(filmId, 'queue')) {
      const filterNevArrQueue = queueList.filter(el => el.id !== filmId); //-удаляет со списка
      remove('queue');
      save('queue', filterNevArrQueue); // ключ куда записывается

      if (queueBtn.classList.contains('active') && libraryBtn.classList.contains('current-link')) {
        queueList = get('queue');

        if (queueList === null || queueList.length === 0) {
          moviesLibraryMarkup();
        } else {
          renderMovies(queueList);
        }
      }
    }
  }
  textModalBtn(filmId);
}

function inArrayKey(id, key) {
  let localListJson = JSON.parse(localStorage.getItem(key));
  let obj = localListJson.find(el => el.id === id);
  // const filtr = obj.includes(id);

  if (!obj) {
    return;
  }

  return true;
}

// Проверяет есть ли сохраненный ключ
function test() {
  if (get('watched')) {
    return get('watched');
  } else {
    save('watched', []);
  }
  if (get('queue')) {
    return get('queue');
  } else {
    save('queue', []);
  }
}

// Принимает ключ `key` и значение `value`.
const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error('Set state error: ', err);
  }
};

const get = key => {
  try {
    let serializedState = localStorage.getItem(key);

    return (serializedState = JSON.parse(serializedState) || undefined);
  } catch (err) {
    console.error('Get state error: ', err);
  }
};

// Принимает ключ `key`
const remove = key => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error('Remove state error: ', err);
  }
};
export {
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
};
