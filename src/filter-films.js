// filter-films.js

const FILTERS_NAMES = {
  ALL: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`,
  STATS: `Stats`
};

const filterFilms = (films, filterName) => {
  switch (filterName) {

    case FILTERS_NAMES.ALL: // TODO такое лучше в константы перенести
      return films;

    case FILTERS_NAMES.WATCHLIST:
      return films.filter((it) => it.isOnWatchList === true);

    case FILTERS_NAMES.HISTORY:
      return films.filter((it) => it.isWatched === true);

    case FILTERS_NAMES.FAVORITES:
      return films.filter((it) => it.isFavorite === true);

    case FILTERS_NAMES.STATS:
      return [];

    default:
      throw new Error(`Unknown filter name`);
  }
};

export {FILTERS_NAMES, filterFilms};
