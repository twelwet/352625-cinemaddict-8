// render-filters.js

import Filter from './filter.js';

const filtersData = [
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
];

const createFilters = (films) => filtersData.map((item) => new Filter(item, films));

const renderFilters = (films, container) => {
  container.innerHTML = ``;
  createFilters(films)
    .forEach((item) => container.appendChild(item.render()));
};

export default renderFilters;
