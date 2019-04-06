// main.js

import downloaded from './mock-data.js';
import Film from './film.js';
import FilmDetails from './film-details.js';
import Filter from './filter.js';
import {showFilms, hideFilms, showStat, hideStat, activateStat} from './stat.js';

const FILTERS_NAMES = downloaded.filters.map((it) => it.name);

const filtersContainer = document.querySelector(`.main-navigation`);
const allFilmsContainer = document.querySelector(`.films-list .films-list__container`);
const body = document.querySelector(`body`);

const filters = downloaded.filters.map((item) => {
  return new Filter(item);
});

filters.forEach((item) => filtersContainer.appendChild(item.render()));

const filterFilms = (films, filterName) => {
  switch (filterName) {

    case FILTERS_NAMES[0]: // TODO такое лучше в константы перенести
      return films;

    case FILTERS_NAMES[1]:
      return films.filter((it) => it.isOnWatchList === true);

    case FILTERS_NAMES[2]:
      return films.filter((it) => it.isWatched === true);

    case FILTERS_NAMES[3]:
      return films.filter((it) => it.isFavorite === true);

    case FILTERS_NAMES[4]:
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
      // TODO посмотри на Object.assign
      Object.assign(film, newObject);
      filmDetailsComponent.update(film);
      body.removeChild(filmDetailsComponent.element);
      filmDetailsComponent.unrender();
    };

    allFilmsContainer.appendChild(filmComponent.render());
  }
};

renderFilms(downloaded.films.all);
