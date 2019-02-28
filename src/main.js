// main.js

import {filters, getFilmsList} from './mock-data.js';
import {getFilterTemplate} from './get-filter-template.js';
import {getFilmTemplate} from './get-film-template.js';
import {render} from './utils.js';

const filtersContainer = document.querySelector(`.main-navigation`);
const allFilmsContainer = document.querySelector(`.films-list .films-list__container`);
const topRatedFilmsContainer = document.querySelectorAll(`.films-list--extra`)[0].querySelector(`.films-list__container`);
const mostCommentedFilmsContainer = document.querySelectorAll(`.films-list--extra`)[1].querySelector(`.films-list__container`);

render(filters, getFilterTemplate, filtersContainer);
render(getFilmsList(), getFilmTemplate, allFilmsContainer);
render(getFilmsList(), getFilmTemplate, topRatedFilmsContainer);
render(getFilmsList(), getFilmTemplate, mostCommentedFilmsContainer);

filtersContainer.querySelectorAll(`a`).forEach((item) => {
  item.addEventListener(`click`, () => {
    render(getFilmsList(), getFilmTemplate, allFilmsContainer);
  });
});
