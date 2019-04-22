// film.js

import Component from './component.js';
import moment from 'moment';

class Film extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._description = data.description;
    this._rating = data.rating;
    this._date = data.date;
    this._duration = data.duration;
    this._genres = data.genres;
    this._poster = data.poster;
    this._comments = data.comments;

    this._isOnWatchList = data.isOnWatchList;
    this._isWatched = data.isWatched;
    this._isFavorite = data.isFavorite;

    this._onAddToWatchList = null;
    this._onAddToWatchListClick = this._onAddToWatchListClick.bind(this);

    this._onMarkAsWatched = null;
    this._onMarkAsWatchedClick = this._onMarkAsWatchedClick.bind(this);

    this._onMarkAsFavorite = null;
    this._onMarkAsFavoriteClick = this._onMarkAsFavoriteClick.bind(this);

    this._onComments = null;
    this._onCommentsButtonClick = this._onCommentsButtonClick.bind(this);

    this._extra = data.extra;
  }

  _onAddToWatchListClick(evt) {
    evt.preventDefault();

    if (typeof this._onAddToWatchList === `function`) {
      this._onAddToWatchList();
    }
  }

  _onMarkAsWatchedClick(evt) {
    evt.preventDefault();

    if (typeof this._onMarkAsWatched === `function`) {
      this._onMarkAsWatched();
    }
  }

  _onMarkAsFavoriteClick(evt) {
    evt.preventDefault();

    if (typeof this._onMarkAsFavorite === `function`) {
      this._onMarkAsFavorite();
    }
  }

  _onCommentsButtonClick() {
    if (typeof this._onComments === `function`) {
      this._onComments();
    }
  }

  _getHmmFromDuration() {
    const h = moment.duration(this._duration, `minutes`).hours();
    let mm = moment.duration(this._duration, `minutes`).minutes();
    if (mm >= 0 && mm < 10) {
      mm = `0${mm}`;
    }
    return `${h} : ${mm}`;
  }

  set onComments(fn) {
    this._onComments = fn;
  }

  set onAddToWatchList(fn) {
    this._onAddToWatchList = fn;
  }

  set onMarkAsWatched(fn) {
    this._onMarkAsWatched = fn;
  }

  set onMarkAsFavorite(fn) {
    this._onMarkAsFavorite = fn;
  }

  get template() {
    return `
    <article class="film-card ${this._extra ? `film-card--no-controls` : ``}">
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._rating.total.toFixed(1)}</p>
      <p class="film-card__info">
        <span class="film-card__year">${moment(this._date).format(`YYYY`)}</span>
        <span class="film-card__duration">
          ${this._getHmmFromDuration()}
        </span>
        <span class="film-card__genre">${this._genres[0] === undefined ? `Unknown Genre` : this._genres[0]}</span>
      </p>
      <img src="${this._poster}" alt="" class="film-card__poster">
      <p class="film-card__description ${this._extra ? `visually-hidden` : ``}">${this._description}</p>
      <button class="film-card__comments">${this._comments.length} comments</button>
      <form class="film-card__controls ${this._extra ? `visually-hidden` : ``}">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
      </form>
    </article>`
    .trim();
  }

  bind() {
    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._onAddToWatchListClick);
    this._element.querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._onMarkAsWatchedClick);
    this._element.querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._onMarkAsFavoriteClick);
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, this._onCommentsButtonClick);
  }

  unbind() {
    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`).removeEventListener(`click`, this._onAddToWatchListClick);
    this._element.querySelector(`.film-card__controls-item--mark-as-watched`).removeEventListener(`click`, this._onMarkAsWatchedClick);
    this._element.querySelector(`.film-card__controls-item--favorite`).removeEventListener(`click`, this._onMarkAsFavoriteClick);
    this._element.querySelector(`.film-card__comments`).removeEventListener(`click`, this._onCommentsButtonClick);
  }

}

export default Film;
