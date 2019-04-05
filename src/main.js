// main.js

import downloaded from './mock-data.js';
import Film from './film.js';
import FilmDetails from './film-details.js';
import Filter from './filter.js';
import {showFilms, hideFilms, showStat, hideStat, activateStat} from './stat.js';

const filtersContainer = document.querySelector(`.main-navigation`);
const allFilmsContainer = document.querySelector(`.films-list .films-list__container`);
const body = document.querySelector(`body`);

const filters = downloaded.filters.map((item) => {
  item = new Filter(item);
  return item;
});

filters.forEach((item) => filtersContainer.appendChild(item.render()));

const filterFilms = (films, filterName) => {
  switch (filterName) {

    case `All movies`:
      return films;

    case `Watchlist`:
      return films.filter((it) => it.isOnWatchList === true);

    case `History`:
      return films.filter((it) => it.isWatched === true);

    case `Favorites`:
      return films.filter((it) => it.isFavorite === true);

    case `Stats`:
      return [];

    default:
      throw new Error(`Unknown filter name`);
  }
};

filtersContainer.onclick = (evt) => {
  const filterName = evt.target.getAttribute(`value`);
  switch (filterName) {
    case `Stats`:
      hideFilms();
      showStat();
      activateStat();
      break;
    default:
      showFilms();
      hideStat();
      const filteredFilms = filterFilms(downloaded.films.all, filterName);
      renderFilms(filteredFilms);
  }
};

const renderFilms = (films) => {
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

renderFilms(downloaded.films.all);
