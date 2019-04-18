// main.js

import {renderFilms} from "./render-films";
import {renderFilters} from './render-filters.js';
import {Filter, filterFilms} from './filter-films.js';
import Stat from './stat.js';
import {api, storage} from './data-from-server.js';
import LoadMessage from './load-message.js';
import filterFilmsByPeriod from './filter-films-by-period.js';

const body = document.querySelector(`body`);
const filtersContainer = body.querySelector(`.main-navigation`);
const filmsContainer = body.querySelector(`.films`);

const stat = new Stat(storage.get());
const statsContainer = stat.element;
stat.create();
document.querySelector(`main`).appendChild(statsContainer);

const showFilms = (filter = Filter.ALL) => {
  filmsContainer.classList.remove(`visually-hidden`);
  statsContainer.classList.add(`visually-hidden`);
  renderFilms(filterFilms(storage.get(), filter));
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

api.getFilms().then((films) => {
  storage.set(films);
  filterFilmsByPeriod(storage.get(), `statistic-week`);
  body.removeChild(loadMessage.element);
  loadMessage.unrender();
  renderFilters(storage.get(), filtersContainer, switchScreen);
  showFilms();
}).catch(onError);

export default switchScreen;
