// films.js

import Component from './component.js';

class Films extends Component {
  constructor() {
    super();
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

  get template() {
    return `
      <section class="films">
        ${this._allFilmsTemplate}
        ${this._topRatedTemplate}
        ${this._mostCommentedTemplate}
      </section>
    `.trim();
  }

  get _nodes() {
    return [...this._element.querySelectorAll(`.film-card`)];
  }

  get _shownNodes() {
    return this._nodes.filter((node) => !node.classList.contains(`visually-hidden`));
  }

  displayShowMoreButton() {
    this._element.querySelector(`.films-list__show-more`).classList.remove(`visually-hidden`);
  }

  _hideShowMoreButton() {
    this._element.querySelector(`.films-list__show-more`).classList.add(`visually-hidden`);
  }

  hideAll() {
    this._nodes.forEach((node) => node.classList.add(`visually-hidden`));
  }

  show(num) {
    this._nodes.forEach((node, index) => {
      if (index < num) {
        node.classList.remove(`visually-hidden`);
      }
    });

    if (this._shownNodes.length === this._nodes.length) {
      this._hideShowMoreButton();
    }
  }

  showNext(num) {
    this.show(this._shownNodes.length + num);
  }
}

export default Films;
