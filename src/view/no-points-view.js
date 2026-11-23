import AbstractView from '../framework/view/abstract-view.js';

const messages = {
  everything: 'Click New Event to create your first point',
  future: 'There are no future events now',
  present: 'There are no present events now',
  past: 'There are no past events now',
};

export default class NoPointsView extends AbstractView {
  constructor(filter = 'everything') {
    super();
    this.filter = filter;
  }

  get template() {
    return `<p class="trip-events__msg">${messages[this.filter]}</p>`;
  }
}
