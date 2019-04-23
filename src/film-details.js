// film-details.js

import Component from './component.js';
import {filmDetailsTemplate, EMOJI} from './film-details-template.js';
import moment from 'moment';

const userName = `User`;

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
    this._newComment = data.newComment;

    this._isOnWatchList = data.isOnWatchList;
    this._isWatched = data.isWatched;
    this._isFavorite = data.isFavorite;

    this._extra = data.extra;

    this._onClose = null;
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onEscPress = this._onEscPress.bind(this);

    this._onUserRating = null;
    this._onUserRatingClick = this._onUserRatingClick.bind(this);

    this._onCtrlEnter = null;
    this._onCtrlEnterPress = this._onCtrlEnterPress.bind(this);

    this._onUserEmojiClick = this._onUserEmojiClick.bind(this);
    this._onEmojiClick = this._onEmojiClick.bind(this);

    this._onUndo = null;
    this._onUndoClick = this._onUndoClick.bind(this);
  }

  set onClose(fn) {
    this._onClose = fn;
  }

  set onUserRating(fn) {
    this._onUserRating = fn;
  }

  set onCtrlEnter(fn) {
    this._onCtrlEnter = fn;
  }

  get template() {
    return filmDetailsTemplate(this);
  }

  get inputs() {
    return this.element === null
      ? []
      : [...this._element.querySelectorAll(`.film-details__user-rating-input`)];
  }

  get labels() {
    return this.element === null
      ? []
      : [...this._element.querySelectorAll(`.film-details__user-rating-label`)];
  }

  get _ratingControls() {
    return this._element.querySelector(`.film-details__user-rating-controls`);
  }

  get _commentStatus() {
    return this._ratingControls.querySelector(`.film-details__watched-status`);
  }

  get _commentsNodesParent() {
    return this._element.querySelector(`.film-details__comments-list`);
  }

  get _commentsNodes() {
    return [...this._commentsNodesParent.querySelectorAll(`.film-details__comment`)];
  }

  get _yourComments() {
    return this._comments.filter((comment) => comment.author === userName);
  }

  get _yourCommentsNodes() {
    return this._commentsNodes.filter((node) => node.children[1].querySelector(`.film-details__comment-author`).textContent === userName);
  }

  activateRatingControls() {
    switch (this._yourComments.length > 0) {
      case true:
        this._showRatingControls();
        break;
      default:
        this._hideRatingControls();
    }
  }

  update(data) {
    this._rating.user = data.rating.user;
    this._newComment.comment = data.newComment.comment.trim();
    this._isOnWatchList = data.isOnWatchList;
    this._isWatched = data.isWatched;
    this._isFavorite = data.isFavorite;
  }

  shake() {
    this._element.classList.add(`shake`);
  }

  updateUserRating(rating) {
    this.element.querySelector(`.film-details__user-rating`).textContent = `Your rate ${rating}`;
  }

  blockRatingField() {
    this.inputs.forEach((radio) => {
      radio.disabled = true;
      if (radio.checked) {
        const checkedLabel = this.labels.filter((label) => label.htmlFor === radio.id)[0];
        checkedLabel.style.backgroundColor = `#d8d8d8`;
      }
    });

    this.labels.forEach((label) => {
      label.style.opacity = `1.0`;
    });
  }

  unblockRatingField() {
    this.inputs.forEach((radio) => {
      radio.disabled = false;
      if (radio.checked) {
        const checkedLabel = this.labels.filter((label) => label.htmlFor === radio.id)[0];
        checkedLabel.style.backgroundColor = ``;
      }
    });

    this.labels.forEach((label) => {
      label.style.opacity = ``;
    });
  }

  resetLabelsColor() {
    this.labels.forEach((label) => {
      label.style.backgroundColor = ``;
    });
  }

  updateLabelColor(color = `red`) {
    const targetRadio = this.inputs.filter((radio) => radio.checked)[0];
    const targetLabel = this.labels.filter((label) => label.htmlFor === targetRadio.id)[0];
    targetLabel.style.backgroundColor = color;
  }

  blockCommentField() {
    this._element.querySelector(`.film-details__comment-input`).disabled = true;
    this._element.querySelector(`.film-details__add-emoji`).disabled = true;
  }

  unblockCommentField() {
    this._element.querySelector(`.film-details__comment-input`).disabled = false;
    this._element.querySelector(`.film-details__add-emoji`).disabled = false;
  }

  resetCommentColor() {
    this._element.querySelector(`.film-details__comment-input`).style.border = ``;
  }

  updateCommentColor() {
    this._element.querySelector(`.film-details__comment-input`).style.border = `solid 2px red`;
  }

  resetCommentField() {
    this._element.querySelector(`.film-details__comment-input`).value = ``;
    this._element.querySelector(`.film-details__add-emoji-label`).innerHTML = EMOJI.get(`neutral-face`);
  }

  renderComments() {
    this._element.querySelector(`.film-details__comments-count`).innerHTML = this._comments.length;
    this._element.querySelector(`.film-details__comments-list`).innerHTML = this._comments.map((it) => (
      `<li class="film-details__comment">
        <span class="film-details__comment-emoji">${EMOJI.get(it.emotion)}</span>
        <div>
          <p class="film-details__comment-text">${it.comment}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${it.author}</span>
            <span class="film-details__comment-day">${moment(it.date).fromNow()}</span>
          </p>
        </div>
      </li>`
    .trim())).join(``);
  }

  _getFormData() {
    const formData = new FormData(this._element.querySelector(`.film-details__inner`));
    return FilmDetails.processForm(formData);
  }

  _getCommentEmotion() {
    const markUpEmoji = this._element.querySelector(`.film-details__add-emoji-label`).innerHTML;

    let targetEmotion;
    EMOJI.forEach((emoji, emotion) => {
      if (emoji === markUpEmoji) {
        targetEmotion = emotion;
      }
    });

    return targetEmotion;
  }

  _showRatingControls() {
    this._ratingControls.classList.remove(`visually-hidden`);
  }

  _hideRatingControls() {
    this._ratingControls.classList.add(`visually-hidden`);
  }

  bind() {
    this._element.querySelector(`.film-details__close-btn`).addEventListener(`click`, this._onCloseButtonClick);
    document.addEventListener(`keydown`, this._onEscPress);
    document.addEventListener(`keydown`, this._onCtrlEnterPress);
    this._element.querySelector(`.film-details__add-emoji`).addEventListener(`click`, this._onUserEmojiClick);
    this.inputs.forEach((radio) => radio.addEventListener(`change`, this._onUserRatingClick));
    this._element.querySelector(`.film-details__watched-reset`).addEventListener(`click`, this._onUndoClick);
  }

  unbind() {
    this._element.querySelector(`.film-details__close-btn`).removeEventListener(`click`, this._onCloseButtonClick);
    document.removeEventListener(`keydown`, this._onEscPress);
    document.removeEventListener(`keydown`, this._onCtrlEnterPress);
    this._element.querySelector(`.film-details__add-emoji`).removeEventListener(`click`, this._onUserEmojiClick);
    this.inputs.forEach((radio) => radio.removeEventListener(`change`, this._onUserRatingClick));
    this._element.querySelector(`.film-details__watched-reset`).removeEventListener(`click`, this._onUndoClick);
  }

  _onCloseButtonClick() {
    const newData = this._getFormData();

    newData.rating.total = this._rating.total;
    newData.rating.age = this._rating.age;

    if (typeof this._onClose === `function`) {
      this._onClose(newData);
    }

    this.update(newData);
  }

  _onEscPress(evt) {
    if (evt.keyCode === 27) {
      this._onCloseButtonClick();
    }
  }

  _onCtrlEnterPress(evt) {
    if (evt.keyCode === 13 && (evt.ctrlKey || evt.metaKey)) {
      const newData = this._getFormData();

      newData.newComment.emotion = this._getCommentEmotion();
      newData.newComment.author = userName;
      newData.newComment.date = Date.now();

      if (typeof this._onCtrlEnter === `function`) {
        this._onCtrlEnter(newData);
      }

      this.update(newData);

      if (this._yourCommentsNodes.length >= 0) {
        this._commentStatus.textContent = `Comment added`;
      }

      this.activateRatingControls();
    }
  }

  _onUserEmojiClick() {
    const userEmojiInput = this._element.querySelector(`.film-details__add-emoji`);
    const emojiRadios = this._element.querySelectorAll(`.film-details__emoji-item`);

    if (userEmojiInput.checked) {
      emojiRadios.forEach((radio) => radio.addEventListener(`click`, this._onEmojiClick));
    }
  }

  _onUserRatingClick() {
    const newData = this._getFormData();

    if (typeof this._onUserRating === `function`) {
      this._onUserRating(newData);
    }

    this.update(newData);
  }

  _onUndoClick() {
    if (this._yourCommentsNodes.length > 0) {
      const lastComment = this._yourCommentsNodes.pop();
      this._commentsNodesParent.removeChild(lastComment);
      this._comments.pop();
      this._commentStatus.textContent = `Comment deleted`;
    }

    this.activateRatingControls();
  }

  _onEmojiClick(evt) {
    const userEmojiInput = this._element.querySelector(`.film-details__add-emoji`);
    const userEmojiLabel = this._element.querySelector(`.film-details__add-emoji-label`);
    const emojiRadios = this._element.querySelectorAll(`.film-details__emoji-item`);

    let yourEmoji = ``;
    EMOJI.forEach((emoji, emotion) => {
      if (evt.target.id.includes(emotion)) {
        yourEmoji = emoji;
      }
    });

    userEmojiLabel.innerHTML = yourEmoji;
    userEmojiInput.checked = false;
    emojiRadios.forEach((radio) => radio.removeEventListener(`click`, this._onEmojiClick));
  }

  static processForm(formData) {
    const entry = {
      rating: {
        user: -1
      },
      newComment: {
        emotion: null,
        author: null,
        comment: ``,
        date: null
      },
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
        target.newComment.comment = value;
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
