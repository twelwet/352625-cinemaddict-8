// main.js

import downloaded from './mock-data.js';
import Film from './film.js';
import FilmDetails from './film-details.js';
import Filter from './filter.js';

const filtersContainer = document.querySelector(`.main-navigation`);
const allFilmsContainer = document.querySelector(`.films-list .films-list__container`);
const body = document.querySelector(`body`);

const filters = downloaded.filters.map((item) => {
  item = new Filter(item);
  return item;
});

const firstFilm = new Film(downloaded.films.all[0]);
const firstFilmDetails = new FilmDetails(downloaded.films.all[0]);

filters.forEach((item) => filtersContainer.appendChild(item.render()));
allFilmsContainer.appendChild(firstFilm.render());

firstFilm.onComments = () => {
  firstFilmDetails.render();
  body.appendChild(firstFilmDetails.element);
};

firstFilmDetails.onClose = () => {
  body.removeChild(firstFilmDetails.element);
  firstFilmDetails.unrender();
};
