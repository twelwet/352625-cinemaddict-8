// films.js

import Component from './component.js';

class Films extends Component {
  constructor() {
    super();
    this._onShowMore = null;
    this._onShowMoreClick = this._onShowMoreClick.bind(this);
  }

  set onShowMore(fn) {
    this._onShowMore = fn;
  }

  get template() {
    return `
      <section class="films">
        ${this._allFilmsTemplate}
        ${this._topRatedTemplate}
        ${this._mostCommentedTemplate}
      </section>
    `.trim();
  }

  get _allFilmsTemplate() {
    return `
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

        <div class="films-list__container">
        </div>

        <button class="films-list__show-more">Show more</button>
      </section>
    `.trim();
  }

  get _topRatedTemplate() {
    return `
      <section class="films-list--extra">
        <h2 class="films-list__title">Top rated</h2>

        <div class="films-list__container">
        </div>
      </section>
    `.trim();
  }

  get _mostCommentedTemplate() {
    return `
      <section class="films-list--extra">
        <h2 class="films-list__title">Most commented</h2>

        <div class="films-list__container">
        </div>
      </section>
    `.trim();
  }

  get _nodes() {
    return [...this._element.querySelectorAll(`.films-list .film-card`)];
  }

  get _shownNodes() {
    return this._nodes.filter((node) => !node.classList.contains(`visually-hidden`));
  }

  get _showMoreButton() {
    return this._element.querySelector(`.films-list__show-more`);
  }

  activateShowMore(num) {
    this._displayShowMoreButton();
    this.unbind();
    this._hideAll();
    this._show(num);
    this.bind();
  }

  showNext(num) {
    this._show(this._shownNodes.length + num);
  }

  _displayShowMoreButton() {
    this._showMoreButton.classList.remove(`visually-hidden`);
  }

  _hideShowMoreButton() {
    this._showMoreButton.classList.add(`visually-hidden`);
  }

  _hideAll() {
    this._nodes.forEach((node) => node.classList.add(`visually-hidden`));
  }

  _show(num) {
    this._nodes.forEach((node, index) => {
      if (index < num) {
        node.classList.remove(`visually-hidden`);
      }
    });

    if (this._shownNodes.length === this._nodes.length) {
      this._hideShowMoreButton();
    }
  }

  bind() {
    this._showMoreButton.addEventListener(`click`, this._onShowMoreClick);
  }

  unbind() {
    this._showMoreButton.removeEventListener(`click`, this._onShowMoreClick);
  }

  _onShowMoreClick() {
    if (typeof this._onShowMore === `function`) {
      this._onShowMore();
    }
  }

}

export default Films;
