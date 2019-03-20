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

const COUNTRIES = [`USA`, `Canada`, `France`, `Finland`, `Hungary`, `Poland`, `Russia`, `Germany`, `Indonesia`];

const AGE_RATINGS = [8, 10, 12, 14, 16, 17, 18];

const ONE_HUNDRED_YEARS_AGO = -3155692600000; // ms
const ONE_YEAR_AGO = -31556926000; // ms

const POSTERS = [
  `accused.jpg`,
  `blackmail.jpg`,
  `blue-blazes.jpg`,
  `fuga-da-new-york.jpg`,
  `moonrise.jpg`,
  `three-friends.jpg`,
];

const DIRECTORS = [
  `David Lynch`,
  `Martin Scorsese`,
  `Joel and Ethan Coen`,
  `Steven Soderbergh`,
  `Terrence Malick`,
  `Abbas Kiarostami`,
  `Hayao Miyazaki`
];

const WRITERS = [
  `Josh Safdie`,
  `John Trengove`,
  `Guillermo Del Toro`,
  `Mark Boal`,
  `Ildikò Enyedi`,
  `Alejandro G. Iñárritu`,
  `Joanne Rowling`,
];

const ACTORS = [
  `Danny Trejo`,
  `Amy Adams`,
  `Christopher Lee`,
  `Keira Knightley`,
  `David Carradine`,
  `Ellen Page`,
  `Ron Perlman`,
  `Jennifer Lawrence`,
  `Dennis Hopper`,
  `Uma Thurman`,
  `Dolph Lundgren`,
  `Emma Stone`,
  `Russell Crowe`,
  `Naomi Watts`,
  `Wesley Snipes`
];

const COMMENTS = {
  EMOJI: new Map([
    [`sleeping`, `😴`],
    [`neutral-face`, `😐`],
    [`grinning`, `😀`]
  ]),
  AUTHORS: [
    `Roger Smith`,
    `rom mlol`,
    `Nadda Mercernary`,
    `Terrible Gaming`,
    `JohnTheBun`,
    `Megumin Kyushikyushi`,
    `Ruben Haak`,
    `Calico Jack`
  ],
  TEXT: [
    `So long-long story, boring!`,
    `Now would be an excellent time for weed`,
    `But what if my sandwich is a galaxy`,
    `Oh shiz they are becoming self aware`,
    `Should've taken the blue pill...`,
    `This video will kill someone's consciousness one day...`,
    `Why did this video help me more with my depression than actual therapy?`,
    `Our reality has been tricked into thinking that this universe is larger than we think.`
  ]
};

const getRandomIndex = (array) => {
  return getRandomInteger(0, array.length - 1);
};

const getOneRandomValue = (array) => array[getRandomIndex(array)];

const getRandomArr = (array, min, max) => {
  const mySet = new Set();
  const count = getRandomInteger(min, max);

  do {
    mySet.add(array[getRandomIndex(array)]);
  } while (mySet.size < count);

  return [...mySet];
};

const actors = getRandomArr(ACTORS, 3, 6);
const genres = getRandomArr(GENRES, 2, 4);

const getRandomDate = (min, max) => new Date(Date.now() + getRandomInteger(min, max));

const getCommentContent = () => {
  return {
    author: COMMENTS.AUTHORS[getRandomIndex(COMMENTS.AUTHORS)],
    text: COMMENTS.TEXT[getRandomIndex(COMMENTS.TEXT)],
    emoji: COMMENTS.EMOJI.get(
        getOneRandomValue(
            [...COMMENTS.EMOJI.keys()]
        )
    ),
    date: getRandomDate(0, ONE_YEAR_AGO)
  };
};

const getComments = (min = 1, max = 6) => {
  const count = getRandomInteger(min, max);
  const comments = [];
  do {
    comments.push(getCommentContent());
  } while (comments.length < count);
  return comments;
};

const comments = getComments();

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

const createFilm = () => {
  const film = {
    title: getOneRandomValue(TITLES),
    description: getSomePhrases(DESCRIPTION, 1, 3),

    director: getOneRandomValue(DIRECTORS),
    writer: getOneRandomValue(WRITERS),
    actors,

    rating: {
      total: getRandomRating(1.9, 9.2),
      user: getRandomInteger(1, 9),
      age: `${getOneRandomValue(AGE_RATINGS)}+`
    },

    date: getRandomDate(0, ONE_HUNDRED_YEARS_AGO),
    country: getOneRandomValue(COUNTRIES),
    duration: {
      hours: getRandomInteger(1, 3),
      min: getRandomInteger(0, 59)
    },

    genres: {
      all: genres,
      main: genres[0]
    },

    poster: `./images/posters/${getOneRandomValue(POSTERS)}`,
    comments,
    yourComment: ``,
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

const films = {
  all: createFilms(createFilm, 1, 10),
  topRated: createFilms(createExtraFilm, 1, 3),
  mostCommented: createFilms(createExtraFilm, 1, 5)
};

// Имитация загрузки данных с сервера
const downloaded = {filters, films, createFilm, createFilms};

export default downloaded;
