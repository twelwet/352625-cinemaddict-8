// filter.js

import {createElement} from './utils.js';

class Filter {
  constructor(data) {
    this._name = data.name;
    this._link = data.link;
    this._active = data.active;
    this._isStats = data.isStats;
    this._isCount = data.isCount;
    this._count = data.count;

    this._element = null;
  }

  get template() {
    return `
      <a href="${this._link}" class="main-navigation__item
        ${this._active ? `main-navigation__item--active` : ``}
        ${this._isStats ? `main-navigation__item--additional` : ``}">
        ${this._name}
        <span ${this._isCount ? `class="main-navigation__item-count"` : ``}>${this._count}</span>
      </a>
    `.trim();
  }

  bind() {
    // Добавление обработчиков
  }

  unbind() {
    // Удаление обработчиков
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }
}

export default Filter;
