// main.js

import downloaded from './mock-data.js';
import Film from './film.js';
import FilmDetails from './film-details.js';
import Filter from './filter.js';

const film = downloaded.films.all[0];

const filtersContainer = document.querySelector(`.main-navigation`);
const allFilmsContainer = document.querySelector(`.films-list .films-list__container`);
const body = document.querySelector(`body`);

const filters = downloaded.filters.map((item) => {
  item = new Filter(item);
  return item;
});

const firstFilm = new Film(film);
const firstFilmDetails = new FilmDetails(film);

filters.forEach((item) => filtersContainer.appendChild(item.render()));
allFilmsContainer.appendChild(firstFilm.render());

firstFilm.onComments = () => {
  firstFilmDetails.render();
  body.appendChild(firstFilmDetails.element);
};

firstFilm.onAddToWatchList = () => {
  film.isOnWatchList = !film.isOnWatchList;
  firstFilmDetails.update(film);
};

firstFilm.onMarkAsWatched = () => {
  film.isWatched = !film.isWatched;
  firstFilmDetails.update(film);
};

firstFilm.onMarkAsFavorite = () => {
  film.isFavorite = !film.isFavorite;
  firstFilmDetails.update(film);
};

firstFilmDetails.onClose = (newObject) => {
  film.rating.user = newObject.rating.user;
  film.isOnWatchList = newObject.isOnWatchList;
  film.isWatched = newObject.isWatched;
  film.isFavorite = newObject.isFavorite;
  firstFilmDetails.update(film);
  body.removeChild(firstFilmDetails.element);
  firstFilmDetails.unrender();
};
