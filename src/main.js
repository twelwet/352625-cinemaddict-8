// main.js

import Film from './film.js';
import FilmDetails from './film-details.js';
import {filtersData, renderFilters} from './render-filters.js';
import {FILTERS_NAMES, filterFilms} from './filter-films.js';
import {showFilms, hideFilms, showStat, hideStat, activateStat} from './stat.js';
import {api, storage} from './data-from-server.js';
import LoadMessage from './load-message.js';

const filtersContainer = document.querySelector(`.main-navigation`);
const allFilmsContainer = document.querySelector(`.films-list .films-list__container`);
const body = document.querySelector(`body`);

const addFiltersHandlers = () => {
  const filtersButtons = [...filtersContainer.querySelectorAll(`.main-navigation__item`)];

  filtersButtons.forEach((it) => {

    it.addEventListener(`click`, (evt) => {
      const currentActiveItem = filtersContainer.querySelector(`.main-navigation__item--active`);

      currentActiveItem.classList.remove(`main-navigation__item--active`);
      evt.currentTarget.classList.add(`main-navigation__item--active`);

      const filterName = evt.currentTarget.getAttribute(`value`);
      filtersData.updateActiveField(filterName);

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
  return api.updateFilm({id: entry.id, data: entry.toRAW()})
    .then(() => {
      component.resetCommentColor();
      component.resetLabelsColor();

      component.renderComments();
      component.resetCommentField();

      component.unblockRatingField();
      component.unblockCommentField();
    })
    .catch(() => {
      component.resetCommentColor();
      component.resetLabelsColor();

      component.unblockRatingField();
      component.unblockCommentField();

      component.shake();
      // FIXME Как отключить повторную анимацию карточки справа-налево?

      component.updateCommentColor();
      component.updateLabelColor();
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
      api.updateFilm({id: film.id, data: film.toRAW()})
        .then(() => {
          storage.update(film);
          renderFilters(storage.get(), filtersContainer);
          addFiltersHandlers();
        }).catch(console.log);
    };

    filmComponent.onMarkAsWatched = () => {
      film.isWatched = !film.isWatched;
      api.updateFilm({id: film.id, data: film.toRAW()})
        .then(() => {
          storage.update(film);
          renderFilters(storage.get(), filtersContainer);
          addFiltersHandlers();
        }).catch(console.log);
    };

    filmComponent.onMarkAsFavorite = () => {
      film.isFavorite = !film.isFavorite;
      api.updateFilm({id: film.id, data: film.toRAW()})
        .then(() => {
          storage.update(film);
          renderFilters(storage.get(), filtersContainer);
          addFiltersHandlers();
        }).catch(console.log);
    };

    filmDetailsComponent.onClose = (newObject) => {
      Object.assign(film, newObject);
      updateFilmData(film, filmDetailsComponent).then(() => {
        body.removeChild(filmDetailsComponent.element);
        filmDetailsComponent.unrender();
        storage.update(film);
        renderFilters(storage.get(), filtersContainer);
        addFiltersHandlers();
      });
    };

    filmDetailsComponent.onUserRating = (newObject) => {
      Object.assign(film, newObject);
      filmDetailsComponent.blockRatingField();
      updateFilmData(film, filmDetailsComponent);
      filmDetailsComponent.element.querySelector(`.film-details__user-rating`).innerHTML = `Your rate ${film.rating.user}`;
    };

    filmDetailsComponent.onCtrlEnter = (newObject) => {
      Object.assign(film, newObject);

      if (film.newComment.comment !== ``) {
        film.comments.push(film.newComment);
      }

      filmDetailsComponent.blockCommentField();
      updateFilmData(film, filmDetailsComponent);
    };

    allFilmsContainer.appendChild(filmComponent.render());
  }
};

const onError = () => {
  const node = document.createElement(`div`);
  node.style = `width: auto; margin: 0 auto; text-align: center; background-color: red; font-size: 20px`;

  node.textContent = `Something went wrong while loading movies. Check your connection or try again later`;
  body.insertAdjacentElement(`afterbegin`, node);
};

const loadMessage = new LoadMessage();
body.insertAdjacentElement(`afterbegin`, loadMessage.render());

// TODO лучше сделать отдельный модуль и в нем собрать все методы для работы с данными
api.getFilms().then((films) => {
  storage.set(films);
  loadMessage.unrender();
  body.removeChild(document.querySelector(`.load-message`));
  renderFilters(storage.get(), filtersContainer);
  addFiltersHandlers();
  renderFilms(storage.get());
}).catch(onError);
