// main.js

import Film from './film.js';
import FilmDetails from './film-details.js';
import {filtersData, Filter} from './filter.js';
import {showFilms, hideFilms, showStat, hideStat, activateStat} from './stat.js';
import api from './data-from-server.js';

const FILTERS_NAMES = filtersData.map((it) => it.name);

const filtersContainer = document.querySelector(`.main-navigation`);
const allFilmsContainer = document.querySelector(`.films-list .films-list__container`);
const body = document.querySelector(`body`);

const filters = filtersData.map((item) => {
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

const filtersButtons = [...filtersContainer.querySelectorAll(`a`)];

filtersButtons.forEach((it) => {

  it.addEventListener(`click`, (evt) => {
    // FIXME Уместна ли в main.js активации кликнутого фильтра?
    filtersButtons.forEach((item) => item.classList.remove(`main-navigation__item--active`));
    evt.currentTarget.classList.add(`main-navigation__item--active`);

    const filterName = evt.currentTarget.getAttribute(`value`);

    switch (filterName) {
      case FILTERS_NAMES[4]:
        hideFilms();
        showStat();
        activateStat();
        break;
      default:
        showFilms();
        hideStat();
        const filteredFilms = filterFilms(downloadedFilms, filterName);
        renderFilms(filteredFilms);
    }

  });
});

const updateFilmData = (entry, component) => {
  api.updateFilm({id: entry.id, data: entry.toRAW()})
    .then((newFilm) => {
      component.update(newFilm);
      body.removeChild(component.element);
      component.unrender();
    });
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
      updateFilmData(film, filmDetailsComponent);
    };

    filmComponent.onMarkAsWatched = () => {
      film.isWatched = !film.isWatched;
      updateFilmData(film, filmDetailsComponent);
    };

    filmComponent.onMarkAsFavorite = () => {
      film.isFavorite = !film.isFavorite;
      updateFilmData(film, filmDetailsComponent);
    };

    filmDetailsComponent.onClose = (newObject) => {
      // TODO посмотри на Object.assign
      Object.assign(film, newObject);
      updateFilmData(film, filmDetailsComponent);
    };

    allFilmsContainer.appendChild(filmComponent.render());
  }
};

let downloadedFilms;
api.getFilms().then((films) => {
  downloadedFilms = films;
  renderFilms(downloadedFilms);
});
