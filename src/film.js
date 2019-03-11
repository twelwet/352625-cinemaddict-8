// film.js

import Component from './component.js';

class Film extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._description = data.description;
    this._rating = data.rating;
    this._year = data.year;
    this._duration = data.duration;
    this._genre = data.genre;
    this._poster = data.poster;
    this._comments = data.comments;
    this._extra = data.extra;

    this._onComments = null;
    this._onCommentsButtonClick = this._onCommentsButtonClick.bind(this);
  }

  set onComments(fn) {
    this._onComments = fn;
  }

  _onCommentsButtonClick() {
    if (typeof this._onComments === `function`) {
      this._onComments();
    }
  }

  get template() {
    return `
    <article class="film-card ${this._extra ? `film-card--no-controls` : ``}">
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${this._year}</span>
        <span class="film-card__duration">${this._duration.hours}h&nbsp;${this._duration.min}m</span>
        <span class="film-card__genre">${this._genre}</span>
      </p>
      <img src="${this._poster}" alt="" class="film-card__poster">
      <p class="film-card__description ${this._extra ? `visually-hidden` : ``}">${this._description}</p>
      <button class="film-card__comments">${this._comments} comments</button>
      <form class="film-card__controls ${this._extra ? `visually-hidden` : ``}">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
      </form>
    </article>`
    .trim();
  }

  bind() {
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, this._onCommentsButtonClick);
  }

  unbind() {
    this._element.querySelector(`.film-card__comments`).removeEventListener(`click`, this._onCommentsButtonClick);
  }
}

export default Film;
