// stat.js

import Component from './component.js';
import getChart from './get-chart.js';
import moment from 'moment';
import {createElement} from "./utils";

const getRank = (data) => {
  const count = data.filter((it) => it.isWatched).length;
  let rank = `Watch anything`;
  if (count > 0 && count <= 10) {
    rank = `Novice`;
  } else if (count > 10 && count < 20) {
    rank = `Fan`;
  } else if (count >= 20) {
    rank = `Movie buff`;
  }
  return rank;
};

const getStat = (films) => {
  const watchedFilms = films.filter((it) => it.isWatched);
  const bunch = [].concat(...watchedFilms.map((film) => Array.from(film.genres)));
  const names = [...new Set(bunch)];
  const quantites = names.map((genre) => bunch.filter((it) => it === genre).length);
  const youWatched = watchedFilms.length;
  const totalDuration = [].concat(...watchedFilms.map((film) => film.duration)).reduce((acc, duration) => acc + duration, 0);
  const topGenre = names[quantites.indexOf(Math.max(...quantites))] === undefined ? `Unknown Genre` : names[quantites.indexOf(Math.max(...quantites))];
  return {names, quantites, youWatched, totalDuration, topGenre};
};

class Stat extends Component {
  constructor(data) {
    super();
    this._chart = null;
    this._rank = getRank(data);
    this._youWatched = getStat(data).youWatched;
    this._totalDuration = getStat(data).totalDuration;
    this._topGenre = getStat(data).topGenre;
  }

  get template() {
    return `
      <section class="statistic visually-hidden">

        ${this._rankTemplate}

        ${this._periodFiltersTemplate}

        ${this._statTemplate}

        <div class="statistic__chart-wrap">
          <canvas class="statistic__chart" width="1000"></canvas>
        </div>

      </section>
    `.trim();
  }

  get periodInputs() {
    return [...this._element.querySelectorAll(`.statistic__filters-input`)];
  }

  get checkedPeriodInput() {
    return this.periodInputs.filter((input) => input.checked)[0];
  }

  get _periodFiltersTemplate() {
    return `
      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>
    `.trim();
  }

  get _rankTemplate() {
    return `
      <p class="statistic__rank">Your rank <span class="statistic__rank-label">${this._rank}</span></p>
    `.trim();
  }

  get _statTemplate() {
    return `
      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${this._youWatched} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">
            ${moment.duration(this._totalDuration, `minutes`).hours()} <span class="statistic__item-description">h</span>
            ${moment.duration(this._totalDuration, `minutes`).minutes()} <span class="statistic__item-description">m</span>
          </p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${this._topGenre}</p>
        </li>
      </ul>
    `.trim();
  }

  create() {
    this._chart = getChart(this._ctx());
  }

  partialUpdate() {
    this._element.replaceChild(createElement(this._statTemplate), this._element.querySelector(`.statistic__text-list`));
    this._element.replaceChild(createElement(this._rankTemplate), this._element.querySelector(`.statistic__rank`));
  }

  update(downloaded) {
    const {names, quantites, youWatched, totalDuration, topGenre} = getStat(downloaded);
    this._chart.data.labels = names;
    this._chart.data.datasets[0].data = quantites;
    this._youWatched = youWatched;
    this._totalDuration = totalDuration;
    this._topGenre = topGenre;
    this._chart.update();
    this.partialUpdate();
  }

  updateRank(downloaded) {
    this._rank = getRank(downloaded);
  }

  _ctx() {
    return this._element.querySelector(`.statistic__chart`);
  }

}

export {getRank, Stat};
