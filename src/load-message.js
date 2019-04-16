// load-message.js

import Component from './component.js';

class LoadMessage extends Component {
  constructor() {
    super();
    this._message = `Loading movies...`;
  }

  get template() {
    return `
    <div class="load-message" style="position: absolute">${this._message}</div>
    `.trim();
  }

}

export default LoadMessage;
