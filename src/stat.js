// stat.js

import downloaded from './mock-data.js';
import {getStat, getChart} from './stat-genres.js';

const filmsContainer = document.querySelector(`.films`);
const statContainer = document.querySelector(`.statistic`);

const showFilms = () => filmsContainer.classList.remove(`visually-hidden`);
const hideFilms = () => filmsContainer.classList.add(`visually-hidden`);

const showStat = () => statContainer.classList.remove(`visually-hidden`);
const hideStat = () => statContainer.classList.add(`visually-hidden`);

const statCtx = document.querySelector(`.statistic__chart`);
const statChart = getChart(statCtx);

const activateStat = () => {
  const {names, quantites, youWatched, totalDuration, topGenre} = getStat(downloaded.films.all);
  statChart.data.labels = names;
  statChart.data.datasets[0].data = quantites;
  statChart.update();
};

export {showFilms, hideFilms, showStat, hideStat, activateStat};
