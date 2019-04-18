// filter-films-by-period.js

import moment from 'moment';

const StatPeriods = {
  ALL: `statistic-all-time`,
  TODAY: `statistic-today`,
  WEEK: `statistic-week`,
  MONTH: `statistic-month`,
  YEAR: `statistic-year`
};

const isToday = (watchingDate) => {
  const now = moment();
  const beginningOfToday = `${now.year()}-${now.month()}-${now.date()} 00:00:00`;
  return moment(watchingDate).isBetween(beginningOfToday, `${now}`);
};

const isWeekAgo = (watchingDate) => {
  const now = moment();
  const weekAgo = moment().date(now.date() - 7);
  return moment(watchingDate).isBetween(weekAgo, now);
};

const isMonthAgo = (watchingDate) => {
  const now = moment();
  const monthAgo = moment().month(now.month() - 1);
  return moment(watchingDate).isBetween(monthAgo, now);
};

const isYearAgo = (watchingDate) => {
  const now = moment();
  const yearAgo = moment().year(now.year() - 1);
  return moment(watchingDate).isBetween(yearAgo, now);
};


const filterFilmsByPeriod = (films, periodName) => {
  const watchedFilms = films.filter((it) => it.isWatched);

  switch (periodName) {
    case StatPeriods.ALL:
      return watchedFilms;

    case StatPeriods.TODAY:
      return watchedFilms.filter((it) => isToday(it.watchingDate));

    case StatPeriods.WEEK:
      return watchedFilms.filter((it) => isWeekAgo(it.watchingDate));

    case StatPeriods.MONTH:
      return watchedFilms.filter((it) => isMonthAgo(it.watchingDate));

    case StatPeriods.YEAR:
      return watchedFilms.filter((it) => isYearAgo(it.watchingDate));

    default:
      throw new Error(`Unknown time period filter name`);
  }
};

export default filterFilmsByPeriod;
