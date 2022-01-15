console.log(1);
import movieTpl from '../../templates/film-card-main.hbs'
import movieLibraryTpl from '../../templates/film-card-library.hbs'



const gallery = document.querySelector(".cards-gallery__list");

// Для рендера популярных фильмов
function renderTrends(data) {
  const markup = movieTpl(data);
  console.log(data);

  gallery.insertAdjacentHTML('beforeend', markup);
}

// Рендер библиотеки
function renderLibrary(data) {
  const markup = movieLibraryTpl(data);

  gallery.insertAdjacentHTML('beforeend', markup);
}

export { renderTrends, renderLibrary };