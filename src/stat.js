// stat.js

import {getStat, getChart} from './stat-genres.js';
import api from './data-from-server.js';

const filmsContainer = document.querySelector(`.films`);
const statContainer = document.querySelector(`.statistic`);

const showFilms = () => filmsContainer.classList.remove(`visually-hidden`);
const hideFilms = () => filmsContainer.classList.add(`visually-hidden`);

const showStat = () => statContainer.classList.remove(`visually-hidden`);
const hideStat = () => statContainer.classList.add(`visually-hidden`);

const statCtx = document.querySelector(`.statistic__chart`);
const statChart = getChart(statCtx);

const activateStat = () => {
  // FIXME не получается забрать из промиса данные о фильмах для функции статистики getStat(films)
  const {names, quantites, youWatched, totalDuration, topGenre} = api.getFilms().then((films) => getStat(films));
  statChart.data.labels = names;
  statChart.data.datasets[0].data = quantites;
  statChart.update();
};

export {showFilms, hideFilms, showStat, hideStat, activateStat};
