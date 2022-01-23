import axios from 'axios';
import { openSpinner, closeSpinner } from '../dev-5/spinner';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.API_KEY = '90cb713cbad21b579532fb5c59ca1f23';
    this.BASE_URL = `https://api.themoviedb.org/3`;
  }

  // Запрос популярных фильмов
  async fetchMovieTrends() {
    openSpinner();
    const url = `${this.BASE_URL}/movie/popular?api_key=${this.API_KEY}&page=${this.page}`;
setInterval(closeSpinner, 500);
    return await fetch(url)
      .then(response => response.json())
      .then(data => {
        // Добавляет запись в хранилище при фетче
        localStorage.setItem('filmInfo', JSON.stringify(data.results));

        console.log(data.total_pages);
        this.incrementPage();
        return data.results;
      });
  }
  // Запрос с использованием поисковой строки
  async fetchSearchMovies() {
    const url = `${this.BASE_URL}/search/movie?api_key=${this.API_KEY}&language=en-US&page=${this.page}&query=${this.searchQuery}`;
    return await fetch(url)
      .then(response => response.json())
      .then(data => {
        // Добавляет запись в хранилище при фетче
        localStorage.setItem('filmInfo', JSON.stringify(data.results));

        this.incrementPage();

        return data.results;
      });
  }

  //Запрос для полной информации о фильме
  async fetchFullInfo(id) {
    const url = `${this.BASE_URL}/movie/${id}/videos?api_key=${this.API_KEY}&language=en-US`;
    return await fetch(url).then(response => response.json());
  }

  //Запрос для жанров
  async fetchMovieGenre() {
    const url = `${this.BASE_URL}/genre/movie/list?api_key=${this.API_KEY}&language=en-US`;
    return await fetch(url)
      .then(response => response.json())
      .then(data => {
        return data.genres;
      });
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  set pageNumber(pageNumber) {
    this.page = pageNumber;
  }
  get pageNumber() {
    return this.page;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
