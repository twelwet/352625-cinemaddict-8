// main.js

import {renderFilms} from "./render-films";
import {renderFilters} from './render-filters.js';
import {Filter, filterFilms} from './filter-films.js';
import Films from './films.js';
import Stat from './stat.js';
import {api, storage} from './data-from-server.js';
import LoadMessage from './load-message.js';
import filterFilmsByPeriod from './filter-films-by-period.js';
import Film from './film';
import {getTopRated, getMostCommented, FilmExtra} from './film-extra.js';

const body = document.querySelector(`body`);
const main = body.querySelector(`main`);
const filtersContainer = body.querySelector(`.main-navigation`);

const films = new Films();
const filmsContainer = films.element;
main.appendChild(filmsContainer);
const allFilmsContainer = filmsContainer.querySelector(`.films-list .films-list__container`);
const topRatedContainer = filmsContainer.querySelectorAll(`.films-list--extra .films-list__container`)[0];
const mostCommentedContainer = filmsContainer.querySelectorAll(`.films-list--extra .films-list__container`)[1];

const stat = new Stat(storage.get());
const statsContainer = stat.element;
stat.create();
main.appendChild(statsContainer);

films.onShowMore = () => films.showNext(5);

const activateFilmsScreen = (filter) => {
  renderFilms(filterFilms(storage.get(), filter), allFilmsContainer, Film);
  films.activateShowMore(5);
  renderFilms(getMostCommented(storage.get(), 2), mostCommentedContainer, FilmExtra);
};

const showFilms = (filter = Filter.ALL) => {
  filmsContainer.classList.remove(`visually-hidden`);
  statsContainer.classList.add(`visually-hidden`);
  activateFilmsScreen(filter);
};

const showStats = () => {
  statsContainer.classList.remove(`visually-hidden`);
  filmsContainer.classList.add(`visually-hidden`);
  stat.updateRank(storage.get());
  stat.update(filterFilmsByPeriod(storage.get(), stat.checkedPeriodInput.id));

  stat.periodInputs.forEach((filter) =>
    filter.addEventListener(`click`, (evt) =>
      stat.update(filterFilmsByPeriod(storage.get(), evt.currentTarget.id))));

};

const onError = () => {
  const node = document.createElement(`div`);
  node.style = `width: auto; margin: 0 auto; text-align: center; background-color: red; font-size: 20px`;

  node.textContent = `Something went wrong while loading movies. Check your connection or try again later`;
  body.insertAdjacentElement(`afterbegin`, node);
};
const switchScreen = (name) => {
  if (name === Filter.STATS) {
    showStats();
  } else {
    showFilms(name);
  }
};

const loadMessage = new LoadMessage();
body.insertAdjacentElement(`afterbegin`, loadMessage.element);

api.getFilms().then((downloadedFilms) => {
  storage.set(downloadedFilms);
  body.removeChild(loadMessage.element);
  loadMessage.unrender();
  renderFilters(storage.get(), filtersContainer, switchScreen);
  showFilms();
  renderFilms(getTopRated(storage.get(), 2), topRatedContainer, FilmExtra);
  renderFilms(getMostCommented(storage.get(), 2), mostCommentedContainer, FilmExtra);
}).catch(onError);

export {activateFilmsScreen, switchScreen};
