// film-extra.js

import Film from './film.js';

class FilmExtra extends Film {
  constructor(data) {
    super(data);
    this._extra = true;
  }
}

const getTopRated = (films, quantity) => {
  const ratings = films.map((it) => it.rating.total);

  const topRatedIds = [];
  for (let i = 0; i < quantity; i++) {
    const max = Math.max(...ratings);
    const maxId = ratings.indexOf(max);
    topRatedIds.push(maxId);
    ratings[maxId] = 0;
  }

  return topRatedIds.map((id) => films[`${id}`]);
};

const getMostCommented = (films, quantity) => {
  const commentsQuantity = films.map((it) => it.comments.length);

  const mostCommentedIds = [];
  for (let i = 0; i < quantity; i++) {
    const max = Math.max(...commentsQuantity);
    const maxId = commentsQuantity.indexOf(max);
    mostCommentedIds.push(maxId);
    commentsQuantity[maxId] = 0;
  }

  return mostCommentedIds.map((id) => films[`${id}`]);
};

export {getTopRated, getMostCommented, FilmExtra};
