// main.js

import Film from './film.js';
import FilmDetails from './film-details.js';
import renderFilters from './render-filters.js';
import {FILTERS_NAMES, filterFilms} from './filter-films.js';
import {showFilms, hideFilms, showStat, hideStat, activateStat} from './stat.js';
import {api, storage} from './data-from-server.js';

const filtersContainer = document.querySelector(`.main-navigation`);
const allFilmsContainer = document.querySelector(`.films-list .films-list__container`);
const body = document.querySelector(`body`);

const addFiltersHandlers = () => {
  const filtersButtons = [...filtersContainer.querySelectorAll(`.main-navigation__item`)];

  filtersButtons.forEach((it) => {

    it.addEventListener(`click`, (evt) => {
      filtersButtons.forEach((item) => item.classList.remove(`main-navigation__item--active`));
      evt.currentTarget.classList.add(`main-navigation__item--active`);

      const filterName = evt.currentTarget.getAttribute(`value`);

      switch (filterName) {
        case FILTERS_NAMES.STATS:
          hideFilms();
          showStat();
          activateStat(storage.get()); // TODO самое простое это передавать актуальные фильмы туда где они нужны
          break;

        default:
          showFilms();
          hideStat();
          const filteredFilms = filterFilms(storage.get(), filterName);
          renderFilms(filteredFilms);
      }

    });
  });
};

const updateFilmData = (entry, component) => {
  api.updateFilm({id: entry.id, data: entry.toRAW()})
    .then((newFilm) => {
      component.update(newFilm);
      if (component.element) {
        body.removeChild(component.element);
        component.unrender();
      }
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
      renderFilters(storage.get(), filtersContainer);
      addFiltersHandlers();
    };

    filmComponent.onMarkAsWatched = () => {
      film.isWatched = !film.isWatched;
      updateFilmData(film, filmDetailsComponent);
      renderFilters(storage.get(), filtersContainer);
      addFiltersHandlers();
    };

    filmComponent.onMarkAsFavorite = () => {
      film.isFavorite = !film.isFavorite;
      updateFilmData(film, filmDetailsComponent);
      renderFilters(storage.get(), filtersContainer);
      addFiltersHandlers();
    };

    filmDetailsComponent.onClose = (newObject) => {
      // TODO посмотри на Object.assign
      Object.assign(film, newObject);
      updateFilmData(film, filmDetailsComponent);
      renderFilters(storage.get(), filtersContainer);
      addFiltersHandlers();
    };

    allFilmsContainer.appendChild(filmComponent.render());
  }
};

// TODO лучше сделать отдельный модуль и в нем собрать все методы для работы с данными
api.getFilms().then((films) => {
  storage.set(films);
  renderFilters(storage.get(), filtersContainer);
  addFiltersHandlers();
  renderFilms(storage.get());
});
