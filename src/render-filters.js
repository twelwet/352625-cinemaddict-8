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

  get all() {
    return this._inner;
  },

  updateActiveField(filter) {
    this._inner.forEach((item) => {
      item.active = item === filter;
    });
  }

};

export const renderFilters = (films, container, cb) => {
  container.innerHTML = ``;
  const elements = filtersData.all.map((item) => {
    const filter = new Filter(item, films);
    filter.onClick = (name) => {
      filtersData.updateActiveField(item);
      renderFilters(films, container, cb);
      cb(name);
    };
    return filter.element;
  });
  container.append(...elements);
};
