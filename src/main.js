// main.js

import * as mock from './mock-data.js';
import getFilterTemplate from './get-filter-template.js';
import getFilmTemplate from './get-film-template.js';
import {render} from './utils.js';

const filtersContainer = document.querySelector(`.main-navigation`);
const allFilmsContainer = document.querySelector(`.films-list .films-list__container`);
const extraFilmsContainers = document.querySelectorAll(`.films-list--extra`);
const topRatedFilmsContainer = extraFilmsContainers[0].querySelector(`.films-list__container`);
const mostCommentedFilmsContainer = extraFilmsContainers[1].querySelector(`.films-list__container`);

render(mock.filters, getFilterTemplate, filtersContainer);
render(mock.films.all, getFilmTemplate, allFilmsContainer);
render(mock.films.topRated, getFilmTemplate, topRatedFilmsContainer);
render(mock.films.mostCommented, getFilmTemplate, mostCommentedFilmsContainer);

filtersContainer.querySelectorAll(`a`).forEach((item) => {
  item.addEventListener(`click`, () => {
    render(mock.createFilms(mock.createFilm, 1, 10), getFilmTemplate, allFilmsContainer);
  });
});
