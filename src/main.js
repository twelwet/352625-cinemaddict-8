// main.js

import downloaded from './mock-data.js';
import Film from './film.js';
import FilmDetails from './film-details.js';
import Filter from './filter.js';

console.log(downloaded.films.all)

const filtersContainer = document.querySelector(`.main-navigation`);
const allFilmsContainer = document.querySelector(`.films-list .films-list__container`);
const body = document.querySelector(`body`);

const filters = downloaded.filters.map((item) => {
  item = new Filter(item);
  return item;
});

filters.forEach((item) => filtersContainer.appendChild(item.render()));

const renderAllFilms = (films) => {
  allFilmsContainer.innerHTML = ``;

  for (const film of films) {
    const filmComponent = new Film(film);
    const filmDetailsComponent = new FilmDetails(film);

    filmComponent.onComments = () => {
      filmDetailsComponent.render();
      body.appendChild(filmDetailsComponent.element);
    };

    filmComponent.onAddToWatchList = () => {
      film.isOnWatchList = !film.isOnWatchList;
      filmDetailsComponent.update(film);
    };

    filmComponent.onMarkAsWatched = () => {
      film.isWatched = !film.isWatched;
      filmDetailsComponent.update(film);
    };

    filmComponent.onMarkAsFavorite = () => {
      film.isFavorite = !film.isFavorite;
      filmDetailsComponent.update(film);
    };

    filmDetailsComponent.onClose = (newObject) => {
      film.rating.user = newObject.rating.user;
      film.isOnWatchList = newObject.isOnWatchList;
      film.isWatched = newObject.isWatched;
      film.isFavorite = newObject.isFavorite;
      filmDetailsComponent.update(film);
      body.removeChild(filmDetailsComponent.element);
      filmDetailsComponent.unrender();
    };

    allFilmsContainer.appendChild(filmComponent.render());
  }
};

renderAllFilms(downloaded.films.all);
