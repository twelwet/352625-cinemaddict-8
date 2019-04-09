// filter.js

import Component from './component.js';
import api from './data-from-server.js';

const getFiltersCounts = (films) => {
  return {
    isOnWatchList: films.filter((film) => film.isOnWatchList).length,
    isWatched: films.filter((film) => film.isWatched).length,
    isFavorite: films.filter((film) => film.isFavorite).length
  };
};

const filtersData = [
  {
    name: `All movies`,
    link: `#all`,
    active: true,
    isStats: false,
    isCount: false,
    count: ``,
  },
  {
    name: `Watchlist`,
    link: `#watchlist`,
    active: false,
    isStats: false,
    isCount: true,
    count: api.getFilms().then((films) => getFiltersCounts(films).isOnWatchList)
  },
  {
    name: `History`,
    link: `#history`,
    active: false,
    isStats: false,
    isCount: true,
    count: api.getFilms().then((films) => getFiltersCounts(films).isWatched)
  },
  {
    name: `Favorites`,
    link: `#favorites`,
    active: false,
    isStats: false,
    isCount: true,
    count: api.getFilms().then((films) => getFiltersCounts(films).isFavorite)
  },
  {
    name: `Stats`,
    link: `#stats`,
    active: false,
    isStats: true,
    isCount: false,
    count: ``
  },
];

class Filter extends Component {
  constructor(data) {
    super();
    this._name = data.name;
    this._link = data.link;
    this._active = data.active;
    this._isStats = data.isStats;
    this._isCount = data.isCount;
    this._count = data.count;
  }

  get template() {
    return `
      <a href="${this._link}" class="main-navigation__item
        ${this._active ? `main-navigation__item--active` : ``}
        ${this._isStats ? `main-navigation__item--additional` : ``}" value="${this._name}">
        ${this._name}
        <span ${this._isCount ? `class="main-navigation__item-count"` : ``}>${this._count}</span>
      </a>
    `.trim();
  }
}

export {filtersData, Filter};
