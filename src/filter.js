// filter.js

import Component from './component.js';

class Filter extends Component {
  constructor(data) {
    super();
    this._name = data.name;
    this._link = data.link;
    this._active = data.active;
    this._isStats = data.isStats;
    this._isCount = data.isCount;
    this._count = data.count;
  }

  get template() {
    return `
      <a href="${this._link}" class="main-navigation__item
        ${this._active ? `main-navigation__item--active` : ``}
        ${this._isStats ? `main-navigation__item--additional` : ``}" value="${this._name}">
        ${this._name}
        <span ${this._isCount ? `class="main-navigation__item-count"` : ``}>${this._count}</span>
      </a>
    `.trim();
  }
}

export default Filter;
