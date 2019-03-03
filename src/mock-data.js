// filters-data.js

import {getRandomFloating, getRandomInteger} from './utils.js';

const filters = [
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
    count: getRandomInteger(1, 100)
  },
  {
    name: `History`,
    link: `#history`,
    active: false,
    isStats: false,
    isCount: true,
    count: getRandomInteger(1, 100)
  },
  {
    name: `Favorites`,
    link: `#favorites`,
    active: false,
    isStats: false,
    isCount: true,
    count: getRandomInteger(1, 100)
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

const TITLES = [
  `Captain Marvel`,
  `Alien`,
  `How to Train Your Dragon: The Hidden World`,
  `Bohemian Rhapsody`,
  `Avengers: Endgame`,
  `Perfetti sconosciuti`,
  `Bad Times at the El Royale`,
  `Isle of Dogs`,
  `Gran Torino`,
  `Ready Player One`,
  `Stranger Things`,
  `Million Dollar Baby`,
  `Snatch.`,
  `12 Years a Slave`,
  `The Grand Budapest Hotel`
];

const DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const GENRES = [`Comedy`, `Fantasy`, `Horror`, `Adventure`, `Action`, `Thriller`, `Drama`, `Mystery`, `Crime`, `Animation`];

const POSTERS = [
  `accused.jpg`,
  `blackmail.jpg`,
  `blue-blazes.jpg`,
  `fuga-da-new-york.jpg`,
  `moonrise.jpg`,
  `three-friends.jpg`,
];

const getRandomIndex = (array) => {
  return getRandomInteger(0, array.length - 1);
};

const getOneRandomValue = (array) => array[getRandomInteger(0, (array.length - 1))];

const getRandomTitle = (titles) => getOneRandomValue(titles);

const getSomePhrases = (text, min, max) => {
  const mockPhrases = text.split(`. `);
  let randomPhrases = [...(new Array(getRandomInteger(min, max)))];
  randomPhrases = randomPhrases.map((it) => {
    it = mockPhrases.splice(getRandomIndex(mockPhrases), 1).toString();
    return it;
  });
  return (randomPhrases.join(`. `) + `.`);
};

const getRandomRating = (min, max) => getRandomFloating(min, max).toFixed(1);

const getRandomYear = (min, max) => getRandomInteger(min, max);

const getRandomGenre = (genres) => getOneRandomValue(genres);

const getRandomPoster = (posters) => getOneRandomValue(posters);

const createFilm = () => {
  const film = {
    title: getRandomTitle(TITLES),
    description: getSomePhrases(DESCRIPTION, 1, 3),
    rating: getRandomRating(1.9, 9.2),
    year: getRandomYear(1901, 2018),
    duration: {
      hours: getRandomInteger(1, 3),
      min: getRandomInteger(0, 59)
    },
    genre: getRandomGenre(GENRES),
    poster: `./images/posters/${getRandomPoster(POSTERS)}`,
    comments: getRandomInteger(1, 1000),
    extra: false
  };
  return film;
};

const createExtraFilm = () => {
  const extraFilm = createFilm();
  extraFilm.extra = true;
  return extraFilm;
};

const createFilms = (cb, min, max) => {
  let films = [...(new Array(getRandomInteger(min, max)))];
  films = films.map(cb);
  return films;
};

// Имитация загрузки данных с сервера
// ---
const films = createFilms(createFilm, 1, 10);
const topRatedFilms = createFilms(createExtraFilm, 1, 3);
const mostCommentedFilms = createFilms(createExtraFilm, 1, 5);
// ---

export {filters, createFilm, createFilms, films, topRatedFilms, mostCommentedFilms};
