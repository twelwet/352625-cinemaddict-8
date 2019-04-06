// film-details.js

import Component from './component.js';
import moment from 'moment';

class FilmDetails extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._description = data.description;

    this._director = data.director;
    this._writer = data.writer;
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
    return `
    <section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${this._poster}" alt="${this._title}">

            <p class="film-details__age">${this._rating.age}</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${this._title}</h3>
                <p class="film-details__title-original">Original: ${this._title}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${this._rating.total}</p>
                <p class="film-details__user-rating">Your rate ${this._rating.user}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${this._director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${this._writer}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">
                ${(Array.from(this._actors).map((actor) => actor.trim())).join(`, `)}
                </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${moment(this._date).format(`D MMMM YYYY`)} (${this._country})</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${this._duration} min</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${this._country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                ${(Array.from(this._genres.all).map((genre) => (`
                  <span class="film-details__genre">${genre}</span>`.trim()))).join(``)}
              </tr>
            </table>

            <p class="film-details__film-description">${this._description}</p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._isOnWatchList ? `checked` : ``}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this._isWatched ? `checked` : ``}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._isFavorite ? `checked` : ``}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>

        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comments.length}</span></h3>

          <ul class="film-details__comments-list">
            ${(Array.from(this._comments).map((comment) => (`
              <li class="film-details__comment">
                <span class="film-details__comment-emoji">${comment.emoji}</span>
                <div>
                  <p class="film-details__comment-text">${comment.text}</p>
                  <p class="film-details__comment-info">
                    <span class="film-details__comment-author">${comment.author}</span>
                    <span class="film-details__comment-day">${moment(comment.date).fromNow()}</span>
                  </p>
                </div>
              </li>
              `.trim()))).join(``)}
          </ul>

          <div class="film-details__new-comment">
            <div>
              <label for="add-emoji" class="film-details__add-emoji-label">😐</label>
              <input type="checkbox" class="film-details__add-emoji visually-hidden" id="add-emoji">

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">😴</label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-neutral-face" value="neutral-face" checked>
                <label class="film-details__emoji-label" for="emoji-neutral-face">😐</label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-grinning" value="grinning">
                <label class="film-details__emoji-label" for="emoji-grinning">😀</label>
              </div>
            </div>
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="← Select reaction, add comment here" name="comment">${this._yourComment}</textarea>
            </label>
          </div>
        </section>

        <section class="film-details__user-rating-wrap">
          <div class="film-details__user-rating-controls">
            <span class="film-details__watched-status film-details__watched-status--active">Already watched</span>
            <button class="film-details__watched-reset" type="button">undo</button>
          </div>

          <div class="film-details__user-score">
            <div class="film-details__user-rating-poster">
              <img src="${this._poster}" alt="film-poster" class="film-details__user-rating-img">
            </div>

            <section class="film-details__user-rating-inner">
              <h3 class="film-details__user-rating-title">Incredibles 2</h3>

              <p class="film-details__user-rating-feelings">How you feel it?</p>

              <div class="film-details__user-rating-score">
              ${([...Array(9)].map((_, it) => (`
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${it}" id="rating-${it}" ${this._rating.user === it ? `checked` : ``}>
                <label class="film-details__user-rating-label" for="rating-${it}">${it}</label>
                `.trim()))).join(``)}
              </div>
            </section>
          </div>
        </section>
      </form>
    </section>`.trim();
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
