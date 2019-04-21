// header.js

import Component from './component.js';
import {getRank} from './stat.js';

class Header extends Component {
  constructor() {
    super();
    this._rank = ``;
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

  updateRank(data) {
    this._element.querySelector(`.profile__rating`).innerHTML = getRank(data);
  }
}

export default Header;
