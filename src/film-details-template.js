// film-details-template.js

import moment from 'moment';

const EMOJI = new Map([
  [`sleeping`, `😴`],
  [`neutral-face`, `😐`],
  [`grinning`, `😀`]
]);

const filmDetailsTemplate = (data) => `
<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__close">
      <button class="film-details__close-btn" type="button">close</button>
    </div>
    <div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="${data._poster}" alt="${data._title}">

        <p class="film-details__age">${data._rating.age}+</p>
      </div>

      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${data._title}</h3>
            <p class="film-details__title-original">Original: ${data._altTitle}</p>
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">${data._rating.total}</p>
            <p class="film-details__user-rating">Your rate ${data._rating.user}</p>
          </div>
        </div>

        <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${data._director}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">${(Array.from(data._writers).map((writer) => writer.trim())).join(`, `)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">
            ${(Array.from(data._actors).map((actor) => actor.trim())).join(`, `)}
            </td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${moment(data._date).format(`D MMMM YYYY`)} (${data._country})</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">${data._duration} min</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${data._country}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Genres</td>
            <td class="film-details__cell">
            ${data._genres.map((genre) => (`
              <span class="film-details__genre">${genre}</span>`.trim())).join(``)}
          </tr>
        </table>

        <p class="film-details__film-description">${data._description}</p>
      </div>
    </div>

    <section class="film-details__controls">
      <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${data._isOnWatchList ? `checked` : ``}>
      <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${data._isWatched ? `checked` : ``}>
      <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${data._isFavorite ? `checked` : ``}>
      <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
    </section>

    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${data._comments.length}</span></h3>

      <ul class="film-details__comments-list">
        ${(Array.from(data._comments).map((it) => (`
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">${EMOJI.get(it.emotion)}</span>
            <div>
              <p class="film-details__comment-text">${it.comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${it.author}</span>
                <span class="film-details__comment-day">${moment(it.date).fromNow()}</span>
              </p>
            </div>
          </li>
          `.trim()))).join(``)}
      </ul>

      <div class="film-details__new-comment">
        <div>
          <label for="add-emoji" class="film-details__add-emoji-label">${EMOJI.get(`neutral-face`)}</label>
          <input type="checkbox" class="film-details__add-emoji visually-hidden" id="add-emoji">

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">${EMOJI.get(`sleeping`)}</label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-neutral-face" value="neutral-face" checked>
            <label class="film-details__emoji-label" for="emoji-neutral-face">${EMOJI.get(`neutral-face`)}</label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-grinning" value="grinning">
            <label class="film-details__emoji-label" for="emoji-grinning">${EMOJI.get(`grinning`)}</label>
          </div>
        </div>
        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="← Select reaction, add comment here" name="comment">${data._yourComment}</textarea>
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
          <img src="${data._poster}" alt="film-poster" class="film-details__user-rating-img">
        </div>

        <section class="film-details__user-rating-inner">
          <h3 class="film-details__user-rating-title">Incredibles 2</h3>

          <p class="film-details__user-rating-feelings">How you feel it?</p>

          <div class="film-details__user-rating-score">
          ${([...Array(9)].map((_, it) => (`
            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${it + 1}" id="rating-${it + 1}" ${data._rating.user === it + 1 ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-${it + 1}">${it + 1}</label>
            `.trim()))).join(``)}
          </div>
        </section>
      </div>
    </section>
  </form>
</section>`.trim();

export default filmDetailsTemplate;
