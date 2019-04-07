// film-details.js

import Component from './component.js';
import filmDetailsTemplate from './film-details-template.js';

class FilmDetails extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._altTitle = data.altTitle;
    this._description = data.description;

    this._director = data.director;
    this._writers = data.writers;
    this._actors = data.actors;

    this._rating = data.rating;

    this._date = data.date;
    this._country = data.country;
    this._duration = data.duration;

    this._genres = data.genres;
    this._poster = data.poster;
    this._comments = data.comments;
    this._yourComment = data.yourComment;

    this._isOnWatchList = data.isOnWatchList;
    this._isWatched = data.isWatched;
    this._isFavorite = data.isFavorite;

    this._extra = data.extra;

    this._onClose = null;
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
  }

  _onCloseButtonClick() {

    const formData = new FormData(this._element.querySelector(`.film-details__inner`));
    const newData = FilmDetails.processForm(formData);

    if (typeof this._onClose === `function`) {
      this._onClose(newData);
    }

    this.update(newData);
  }

  set onClose(fn) {
    this._onClose = fn;
  }

  get template() { // TODO давай шаблон поделим на части
    return filmDetailsTemplate(this);
  }

  bind() {
    this._element.querySelector(`.film-details__close-btn`).addEventListener(`click`, this._onCloseButtonClick);
  }

  unbind() {
    this._element.querySelector(`.film-details__close-btn`).removeEventListener(`click`, this._onCloseButtonClick);
  }

  update(data) {
    this._rating.user = data.rating.user;
    this._yourComment = data.yourComment;
    this._isOnWatchList = data.isOnWatchList;
    this._isWatched = data.isWatched;
    this._isFavorite = data.isFavorite;
  }

  static processForm(formData) {
    const entry = {
      rating: {
        user: -1
      },
      yourComment: ``,
      isOnWatchList: false,
      isWatched: false,
      isFavorite: false
    };

    const filmDetailsMapper = FilmDetails.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;

      if (filmDetailsMapper[property]) {
        filmDetailsMapper[property](value);
      }
    }

    return entry;
  }

  static createMapper(target) {
    return {
      score: (value) => {
        target.rating.user = parseInt(value, 10);
      },
      comment: (value) => {
        target.yourComment = value;
      },
      watchlist: (value) => {
        target.isOnWatchList = value === `on`;
      },
      watched: (value) => {
        target.isWatched = value === `on`;
      },
      favorite: (value) => {
        target.isFavorite = value === `on`;
      }
    };
  }
}

export default FilmDetails;
