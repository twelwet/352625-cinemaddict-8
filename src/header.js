// header.js

import Component from './component.js';
import {getRank} from './stat.js';

class Header extends Component {
  constructor() {
    super();
    this._rank = ``;
    this._onSearchInput = this._onSearchInput.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
  }

  get template() {
    return `
      <header class="header">
        <h1 class="header__logo logo">Moowle</h1>
        <form class="header__search search">
          <input type="text" name="search" class="search__field" placeholder="Search">
          <button type="submit" class="visually-hidden">Search</button>
        </form>
        <section class="header__profile profile">
          <p class="profile__rating">${this._rank}</p>
        </section>
      </header>
    `.trim();
  }

  get _searchField() {
    return this._element.querySelector(`.search__field`);
  }

  set onSearch(fn) {
    this._onSearch = fn;
  }

  _onEscPress(e) {
    if (e.keyCode === 27) {
      this.clearSearch();
    }
    this._onSearchInput(e);
  }

  _onSearchInput(e) {
    if (typeof this._onSearch === `function`) {
      this._onSearch(e.target.value);
    }
  }

  updateRank(data) {
    this._element.querySelector(`.profile__rating`).innerHTML = getRank(data);
  }

  clearSearch() {
    this._searchField.value = ``;
  }

  bind() {
    this._searchField.addEventListener(`input`, this._onSearchInput);
    this._searchField.addEventListener(`keydown`, this._onEscPress);
  }
  unbind() {
    this._searchField.removeEventListener(`input`, this._onSearchInput);
    this._searchField.removeEventListener(`keydown`, this._onEscPress);
  }
}

export default Header;
