// main.js

import {filters, createFilm, createFilms, films, topRatedFilms, mostCommentedFilms} from './mock-data.js';
import getFilterTemplate from './get-filter-template.js';
import getFilmTemplate from './get-film-template.js';
import {render} from './utils.js';

const filtersContainer = document.querySelector(`.main-navigation`);
const allFilmsContainer = document.querySelector(`.films-list .films-list__container`);
const extraFilmsContainers = document.querySelectorAll(`.films-list--extra`);
const topRatedFilmsContainer = extraFilmsContainers[0].querySelector(`.films-list__container`);
const mostCommentedFilmsContainer = extraFilmsContainers[1].querySelector(`.films-list__container`);

render(filters, getFilterTemplate, filtersContainer);
render(films, getFilmTemplate, allFilmsContainer);
render(topRatedFilms, getFilmTemplate, topRatedFilmsContainer);
render(mostCommentedFilms, getFilmTemplate, mostCommentedFilmsContainer);

filtersContainer.querySelectorAll(`a`).forEach((item) => {
  item.addEventListener(`click`, () => {
    render(createFilms(createFilm, 1, 10), getFilmTemplate, allFilmsContainer);
  });
});
