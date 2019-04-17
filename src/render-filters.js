// render-filters.js

import Filter from './filter.js';

const filtersData = {
  _inner: [
    {
      name: `All movies`,
      link: `#all`,
      active: true,
      isCount: false
    },
    {
      name: `Watchlist`,
      filmFlag: `isOnWatchList`,
      link: `#watchlist`,
      active: false,
      isCount: true
    },
    {
      name: `History`,
      filmFlag: `isWatched`,
      link: `#history`,
      active: false,
      isCount: true
    },
    {
      name: `Favorites`,
      filmFlag: `isFavorite`,
      link: `#favorites`,
      active: false,
      isCount: true
    },
    {
      name: `Stats`,
      link: `#stats`,
      active: false,
      isCount: false
    },
  ],

  get() {
    return this._inner;
  },

  updateActiveField(filterName) {
    this._inner.forEach((item) => {
      item.active = false;
      if (item.name === filterName) {
        item.active = true;
      }
    });
  }
};

const createFilters = (films) => filtersData.get().map((item) => new Filter(item, films));

const renderFilters = (films, container) => {
  container.innerHTML = ``;
  createFilters(films)
    .forEach((item) => container.appendChild(item.render()));
};

export {filtersData, renderFilters};
