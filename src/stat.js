// stat.js

import {getStat, getChart} from './stat-genres.js';

const filmsContainer = document.querySelector(`.films`);
const statContainer = document.querySelector(`.statistic`);
statContainer.querySelector(`.statistic__filters`).classList.remove(`visually-hidden`);

const showFilms = () => filmsContainer.classList.remove(`visually-hidden`);
const hideFilms = () => filmsContainer.classList.add(`visually-hidden`);

const showStat = () => statContainer.classList.remove(`visually-hidden`);
const hideStat = () => statContainer.classList.add(`visually-hidden`);

const statCtx = document.querySelector(`.statistic__chart`);
const statChart = getChart(statCtx);

const activateStat = (downloadedFilms) => {
  const {names, quantites, youWatched, totalDuration, topGenre} = getStat(downloadedFilms);
  statChart.data.labels = names;
  statChart.data.datasets[0].data = quantites;
  statChart.update();
};

export {showFilms, hideFilms, showStat, hideStat, activateStat};
