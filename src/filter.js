// filter.js

import Component from './component.js';

class Filter extends Component {
  constructor(data, films) {
    super();
    this._name = data.name;
    this._link = data.link;
    this._active = data.active;
    this._count = this.getCount(data, films);
    this._onElementClick = this._onElementClick.bind(this);
  }

  set onClick(fn) {
    this._onClick = fn;
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
    return data.filmFlag
      ? films.filter((film) => film[`${data.filmFlag}`]).length
      : ``;
  }

  _onElementClick(e) {
    if (typeof this._onClick === `function`) {
      e.preventDefault();
      this._onClick(this._name);
    }
  }

  bind() {
    this.element.addEventListener(`click`, this._onElementClick);
  }

  unbind() {
    this.element.removeEventListener(`click`, this._onElementClick);
  }

}

export default Filter;
