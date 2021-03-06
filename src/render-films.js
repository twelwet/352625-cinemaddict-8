import {api, storage} from "./data-from-server";
import FilmDetails from "./film-details";
import {renderFilters} from "./render-filters";
import {activateFilmsScreen, switchScreen} from './main.js';
import {header, onError} from './main.js';

const body = document.querySelector(`body`);
const filtersContainer = body.querySelector(`.main-navigation`);

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

      component.updateCommentColor();
      component.updateLabelColor();
    });
};

const updateWatchingDate = (film) => {

  if (film.isWatched && film.watchingDate === null) {
    film.watchingDate = Date.now();
  }

  if (!film.isWatched) {
    film.watchingDate = null;
  }

};

export const renderFilms = (films, container, Cmpnt) => {
  container.innerHTML = ``;

  for (const film of films) {
    const filmComponent = new Cmpnt(film);
    const filmDetailsComponent = new FilmDetails(film);

    filmComponent.onComments = () => {
      const openedPopup = body.querySelector(`.film-details`);
      if (openedPopup) {
        body.removeChild(openedPopup);
      }
      filmDetailsComponent.update(film);
      filmDetailsComponent.render();
      filmDetailsComponent.activateRatingControls();
      body.appendChild(filmDetailsComponent.element);
      filmDetailsComponent.closeButton.focus();
    };

    filmComponent.onAddToWatchList = () => {
      film.isOnWatchList = !film.isOnWatchList;
      api.updateFilm({id: film.id, data: film.toRAW()})
        .then(() => {
          storage.update(film);
          renderFilters(storage.get(), filtersContainer, switchScreen);
        }).catch(onError);
    };

    filmComponent.onMarkAsWatched = () => {
      film.isWatched = !film.isWatched;
      updateWatchingDate(film);
      api.updateFilm({id: film.id, data: film.toRAW()})
        .then(() => {
          storage.update(film);
          header.updateRank(storage.get());
          renderFilters(storage.get(), filtersContainer, switchScreen);
        }).catch(onError);
    };

    filmComponent.onMarkAsFavorite = () => {
      film.isFavorite = !film.isFavorite;
      api.updateFilm({id: film.id, data: film.toRAW()})
        .then(() => {
          storage.update(film);
          renderFilters(storage.get(), filtersContainer, switchScreen);
        }).catch(onError);
    };

    filmDetailsComponent.onClose = (newObject) => {
      Object.assign(film, newObject);
      updateWatchingDate(film);
      updateFilmData(film, filmDetailsComponent).then(() => {
        body.removeChild(filmDetailsComponent.element);
        filmDetailsComponent.unrender();
        storage.update(film);
        header.updateRank(storage.get());
        renderFilters(storage.get(), filtersContainer, switchScreen);
        const activeFilterName = filtersContainer.querySelector(`.main-navigation__item--active`).attributes[2].value;
        activateFilmsScreen(activeFilterName);
      });
    };

    filmDetailsComponent.onUserRating = (newObject) => {
      Object.assign(film, newObject);
      filmDetailsComponent.blockRatingField();
      updateFilmData(film, filmDetailsComponent).then(() => {
        filmDetailsComponent.updateUserRating(film.rating.user);
      });
    };

    filmDetailsComponent.onCtrlEnter = (newObject) => {
      Object.assign(film, newObject);

      if (film.newComment.comment !== ``) {
        film.comments.push(film.newComment);
      }

      filmDetailsComponent.blockCommentField();
      updateFilmData(film, filmDetailsComponent);
    };

    container.appendChild(filmComponent.render());
  }
};
