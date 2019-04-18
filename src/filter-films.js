// filter-films.js

const Filter = {
  ALL: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`,
  STATS: `Stats`
};

const filterFilms = (films, filterName) => {
  switch (filterName) {

    case Filter.ALL: // TODO такое лучше в константы перенести
      return films;

    case Filter.WATCHLIST:
      return films.filter((it) => it.isOnWatchList === true);

    case Filter.HISTORY:
      return films.filter((it) => it.isWatched === true);

    case Filter.FAVORITES:
      return films.filter((it) => it.isFavorite === true);

    case Filter.STATS:
      return [];

    default:
      throw new Error(`Unknown filter name`);
  }
};

export {Filter, filterFilms};
