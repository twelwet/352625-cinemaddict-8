// filters-data.js

import {getRandomInteger} from './utils.js';

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

const film = {
  title: `The Assassination Of Jessie James By The Coward Robert Ford`,
  description: `A priest with a haunted past and a novice on the threshold of her final vows are sent by the Vatican to investigate the death of a young nun in Romania and confront a malevolent force in the form of a demonic nun.`,
  rating: 9.8,
  year: 2018,
  duration: {
    hours: 1,
    min: 13
  },
  genre: `Comedy`,
  poster: `./images/posters/three-friends.jpg`,
  comments: 13
};

const getFilmsList = () => {
  const films = new Array(getRandomInteger(1, 10));
  films.fill(film);
  return films;
};

export {filters, getFilmsList};
