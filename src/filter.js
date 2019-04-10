// filter.js

import Component from './component.js';

class Filter extends Component {
  constructor(data, films) {
    super();
    this._name = data.name;
    this._link = data.link;
    this._active = data.active;
    this._count = this.getCount(data, films);
  }

  get template() {
    return `
      <a href="${this._link}" class="main-navigation__item
        ${this._active ? `main-navigation__item--active` : ``}
        ${this._name === `Stats` ? `main-navigation__item--additional` : ``}" value="${this._name}">
        ${this._name}
        <span ${this._count === `` ? `` : `class="main-navigation__item-count"`}>${this._count}</span>
      </a>
    `.trim();
  }

  getCount(data, films) {
    if (data.filmFlag) {
      return films.filter((film) => film[`${data.filmFlag}`]).length;
    } else {
      return ``;
    }
  }
}

export default Filter;
