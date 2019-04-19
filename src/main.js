// main.js

import {renderFilms} from "./render-films";
import {renderFilters} from './render-filters.js';
import {Filter, filterFilms} from './filter-films.js';
import Films from './films.js';
import Stat from './stat.js';
import {api, storage} from './data-from-server.js';
import LoadMessage from './load-message.js';
import filterFilmsByPeriod from './filter-films-by-period.js';

const body = document.querySelector(`body`);
const main = body.querySelector(`main`);
const filtersContainer = body.querySelector(`.main-navigation`);

const films = new Films();
const filmsContainer = films.element;
main.appendChild(filmsContainer);
const allFilmsContainer = filmsContainer.querySelector(`.films-list .films-list__container`);

const showMoreButton = filmsContainer.querySelector(`.films-list__show-more`);

const stat = new Stat(storage.get());
const statsContainer = stat.element;
stat.create();
main.appendChild(statsContainer);

const onShowMoreClick = () => films.showNext(5);

const activateShowMore = () => {
  films.displayShowMoreButton();
  showMoreButton.removeEventListener(`click`, onShowMoreClick);
  films.hideAll();
  films.show(5);
  showMoreButton.addEventListener(`click`, onShowMoreClick);
};

const showFilms = (filter = Filter.ALL) => {
  filmsContainer.classList.remove(`visually-hidden`);
  statsContainer.classList.add(`visually-hidden`);
  renderFilms(filterFilms(storage.get(), filter), allFilmsContainer);
  activateShowMore();
};

const showStats = () => {
  statsContainer.classList.remove(`visually-hidden`);
  filmsContainer.classList.add(`visually-hidden`);
  stat.update(storage.get());

  const statFilters = [...statsContainer.querySelectorAll(`.statistic__filters-input`)];
  statFilters.forEach((filter) =>
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
}).catch(onError);

export default switchScreen;
